import React,{ useState } from "react";
import "./SignUp.css"; 
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async(event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match! Please try again.");
            return; 
        }
        try{
            const response = await fetch("http://localhost:4000/signup",{
                method:"POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if(response.ok && data.result){
                alert("Account Created!");
                navigate("/");
            }else{
                setPassword("");
                setUsername("");
                setConfirmPassword("");
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
                    
                    <div className="password_input">
                        <label htmlFor="password">Enter your Password</label>
                        <input type="password" id="password" className="input" placeholder="Enter password" required value = {password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="password_input">
                        <label htmlFor="confirmPassword">Confirm your Password</label>
                        <input type="password" id="confirmPassword" className="input" placeholder="Confirm Password" value = {confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                </div>
                <button type="submit" className="signin_btn">Create Account</button>
            </form>
        </div>
    );
}

export default SignUp;