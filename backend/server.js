import "dotenv/config"
import express from "express"
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import nodemailer from 'nodemailer';

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
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

app.post("/signup", async (req, res) => {
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await db.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
            [username, hashedPassword, email]
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
                res.json({ 'success': true })
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
        console.log("databse connection error: ", err)
        res.status(500).json({ 'success': false });
    }

})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});