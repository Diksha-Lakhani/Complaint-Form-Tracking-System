import React,{ useState } from "react";
import "./SignUp.css"; 
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async(event) => {
        event.preventDefault();
        if (phone.length !== 10){
            alert("Phone number should be 10 digits.")
            return;
        }
        try{
            const response = await fetch("http://localhost:4000/signup",{
                method:"POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({ username, password, email, phone, firstName, lastName }),
            });
            const data = await response.json();
            if(response.ok && data.result){
                alert("Account Created!");
                navigate("/");
            }else{
                setPassword("");
                setUsername("");
                setEmail("");
                setFirstName("");
                setLastName("");
                setPhone("");
                alert("Registartion failed, try another username.")
            }
        }catch(err){
            console.log(err)
            alert("Could not connect to backend server. Please try again in some time.")
        }
    };

    return (
        <div className="login_container">
            <div className="signin_container">
                <div className="welcome">
                    <h2> Welcome to 
                        <span className="title" style={{ fontSize: "20px" }}>
                            <span className="clear"> CLEAR</span>
                            <span className="path">PATH</span>
                        </span>
                    </h2>
                    <div className="signin">Sign Up</div>
                </div>
                <p className="signup"> 
                    Have an Account? <br />
                    <span onClick={() => navigate("/")} style={{cursor: 'pointer', color: '#0089EC'}}>Sign In</span>
                </p>
            </div>

            <form onSubmit={handleSignUp}>
                <div className="loginform">
                    <div className="username_input">
                        <label htmlFor="username">Enter your username</label>
                        <input type="text" id="username" className="input" placeholder="Enter username " required value = {username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className="firstName_input">
                        <label htmlFor="firstName">Enter your first name</label>
                        <input type="text" id="firstName" className="input" placeholder="Enter first name" required value = {firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>

                    <div className="lastName_input">
                        <label htmlFor="lastName">Enter your last name</label>
                        <input type="text" id="lastName" className="input" placeholder="Enter last name" required value = {lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>


                    <div className="email_input">
                        <label htmlFor="emailAdd">Enter your Email Address</label>
                        <input type="email" id="emailAdd" className="input" placeholder="Enter email address" required value = {email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="phone_input">
                        <label htmlFor="phoneNum">Enter your Phone Number</label>
                        <input type="number" id="phoneNum" className="input" placeholder="Enter phone number" required value = {phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>

                    <div className="password_input">
                        <label htmlFor="password">Enter your Password</label>
                        <input type="password" id="password" className="input" placeholder="Enter password" required value = {password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                </div>
                <button type="submit" className="signin_btn">Create Account</button>
            </form>
        </div>
    );
}

export default SignUp;