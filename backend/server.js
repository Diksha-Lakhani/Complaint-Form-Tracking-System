import "dotenv/config"
import express from "express"
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import nodemailer from 'nodemailer';
import multer from "multer";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");        //tells where to save the files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);        //generates a file name with timestamp and unique a random number so that people with same file anmes are not overwritten
        cb(null, uniqueSuffix + path.extname(file.originalname));       //gets the extension of the original file and joins all of them together
    }
});
const upload = multer({ storage: storage });

app.post("/signup", async (req, res) => {
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const phone = req.body.phone.trim();
    const password = req.body.password.trim();
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();

    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await db.query(
            "INSERT INTO users (username, password, email, phone, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6)",
            [username, hashedPassword, email, phone, firstName, lastName]
        );
        res.json({ 'result': true })
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'result': false })
    }
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const result = await db.query("select * from users where username = $1", [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.json({ 'success': true, 'firstName': user.first_name, 'lastName': user.last_name, 'phone': user.phone, 'email': user.email })
            } else {
                res.status(401).json({ 'success': false })
            }
        }
    } catch (err) {
        console.log("databse connection error: ", err)
        res.status(500).json({ 'success': false });
    }
});

app.post("/forgotPassword", async (req, res) => {
    const email = req.body.email;
    try {
        const result = await db.query("select * from users where email = $1", [email]);

        if (result.rows.length === 0) {
            return res.json({ 'success': true, 'message': 'Link for changing password has been sent to the registered email address.' })
        }

        await transporter.sendMail({
            from: `"Complaint Registeration System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Notification",
            html: `
                <h3>Password Reset Request</h3>
                <p>We received a request to reset the password for your account.</p>
                <p>You can now proceed to reset your password on the website.</p>
            `
        })
        return res.json({ 'success': true, 'message': 'Link for changing password has been sent to the registered email address.' })

    } catch (err) {
        console.log("Databse connection error: ", err)
        res.status(500).json({ 'success': false });
    }

})

app.post("/setComplaint", upload.array("photo", 10), async (req, res) => {      //passing the request of photo label to upload function with max files 10 which send the result to req.files
    try {
        const formData = JSON.parse(req.body.formData);
        const photoPaths = req.files ? req.files.map(file => `./uploads/${file.filename}`).join(",") : null;
        const result = await db.query(
            "insert into complaints(type, title, description, loc, pincode, photo_path) values($1, $2, $3, $4, $5, $6) RETURNING id",
            [formData.issueType, formData.title, formData.description, formData.location, formData.pinCode, photoPaths]
        );

        const newId = result.rows[0].id;
        const trackId = `CMP${String(newId).padStart(3, '0')}`;

        const officials = await db.query("select id from officials where department = $1", [formData.issueType])
        const random = Math.floor(Math.random() * officials.rows.length)

        await db.query("update complaints set officials_id = $1, trackid = $2 where id = $3", [officials.rows[random].id, trackId, newId]);

        res.json({ 'success': true, 'trackid': trackId });
    } catch (err) {
        console.log("Database connection error: ", err)
        res.status(500).json({ 'success': false });
    }
});

app.post("/trackComplaint", async (req, res) => {
    try {
        const trackid = req.body.trackid;
        const complaint = await db.query(`
            select c.title, c.type, c.description, c.loc, c.pincode, c.photo_path, c.created_at, c.status ,u.first_name, u.last_name, u.phone, u.email, o.designation 
            from complaints c 
            join officials o on o.id = c.officials_id 
            join users u on u.id = o.user_id
            where trackid = $1`, [trackid])
        console.log(complaint.rows[0]);
        res.json({ 'success': true, 'complaint': complaint.rows[0] })
    } catch (err) {
        console.log("Database connection error: ", err)
        res.status(500).json({ 'success': false });
    }
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});