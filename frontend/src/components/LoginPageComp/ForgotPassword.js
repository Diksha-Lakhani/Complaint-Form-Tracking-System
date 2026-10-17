import React from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();

    const handleReset = (event) => {
        event.preventDefault();
        alert("Reset link sent to your email!");
        navigate("/"); 
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
            <p style={{ fontSize: '14px', color: '#666', marginBottom:"30px", textAlign:"left"}}>
                Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleReset}>
                <div className="loginform">
                    <div className="username_input">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" className="input" placeholder="Enter your email" required />
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