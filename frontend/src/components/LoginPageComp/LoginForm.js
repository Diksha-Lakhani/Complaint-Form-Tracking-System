import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/login", {
                method: 'POST',
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("firstName", data.firstName);
                sessionStorage.setItem("lastName", data.lastName);
                sessionStorage.setItem("phone", data.phone);
                sessionStorage.setItem("email", data.email);

                navigate("/home", { state: { message: "Logged in!" } });
            } else {
                setPassword("");
                setUsername("");
                alert("Login failed. Ensure your password and username are correct.")
            }
        } catch (err) {
            console.log(err)
            alert("Could not connect to backend server. Please try again in some time.")
        }
    }
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
                    <div className="signin"> Sign in</div>
                </div>
                <p className="signup"> No Account? <br /><span className="sign_in_link" onClick={() => navigate("/signup")}>Sign Up</span></p>
            </div>

            <form onSubmit={handleSignIn}>
                <div className="loginform">
                    <div className="username_input">
                        <label htmlFor="username" >Enter your username</label>
                        <input type="text" id="username" name="username" className="input" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <br />
                    <div className="password_input">
                        <label htmlFor="password">Enter your Password</label>

                        <input type="password" id="password" name="password" className="input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <div className="forgotPassword">
                            <span className="sign_in_link" onClick={() => navigate("/forgot_pass")}>Forgot Password?</span>
                        </div>
                        <br />
                    </div>
                </div>
                <button type="submit" className="signin_btn">Sign In</button>
            </form>
        </div>
    );
};

export default LoginForm;