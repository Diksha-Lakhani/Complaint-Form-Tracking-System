import React from "react";
import "./LoginForm.css";
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const navigate=useNavigate();
    const handleSignIn=(event)=>{
        event.preventDefault();
        navigate("/home", { state: { message: "Logged in!" } });
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
                        <label htmlFor="username">Enter your username or email address</label>
                        <input type="text" id="username" className="input" placeholder="Username or email address" required />
                    </div>
                    <br />
                    <div className="password_input">
                        <label htmlFor="password">Enter your Password</label>
                        
                        <input type="password" id="password" className="input" placeholder="Password" required />
                        
                        <div className="forgotPassword">
                        <span className="sign_in_link" onClick={() => navigate("/forgot_pass")}>Forgot Password?</span>
                        </div>
                        <br/>
                    </div>
                </div>
                <button type="submit" className="signin_btn">Sign In</button>
            </form>
        </div>
    );
};

export default LoginForm;