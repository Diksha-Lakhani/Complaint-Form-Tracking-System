import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleReset = async (event) => {
        event.preventDefault();
        try{

            const response = await fetch("http://localhost:4000/forgotPassword", {
                method: 'POST',
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ email }),

            })
            const data = await response.json();
            if (response.ok && data.success) {
                alert(data.message);
                navigate("/");
            } else {
                alert("Could not connect to backend server. Please try again in some time.")

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
                    <div className="signin">Reset Password</div>
                </div>
                <p className="signup">
                    Remember it?
                    <br />
                    <span className="sign_in_link" onClick={() => navigate("/")}>Sign In</span>
                </p>
            </div>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: "30px", textAlign: "left" }}>
                Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleReset}>
                <div className="loginform">
                    <div className="username_input">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" className="input" placeholder="Enter your email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                </div>
                <button type="submit" className="signin_btn">Send Reset Link</button>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <span className="sign_in_link" style={{ fontSize: '14px' }} onClick={() => navigate("/")}>
                        Back to Login
                    </span>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;