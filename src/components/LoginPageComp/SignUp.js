import React,{ useState } from "react";
import "./SignUp.css"; 
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSignUp = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match! Please try again.");
            return; 
        }
        alert("Account Created!");
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
                        <label htmlFor="username">Enter your username or email address</label>
                        <input type="text" id="username" className="input" placeholder="Username or email address" required />
                    </div>
                    
                    <div className="password_input">
                        <label htmlFor="password">Enter your Password</label>
                        <input type="password" id="password" className="input" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="password_input">
                        <label htmlFor="confirmPassword">Confirm your Password</label>
                        <input type="password" id="confirmPassword" className="input" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                </div>
                <button type="submit" className="signin_btn">Create Account</button>
            </form>
        </div>
    );
}

export default SignUp;