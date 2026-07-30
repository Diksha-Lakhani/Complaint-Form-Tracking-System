import React from "react";
import SignUp from "../components/LoginPageComp/SignUp";
import "./SignUpPage.css";

function SignUpPage(){
    return(
        <div className="signup_page">
            <span className="title" style={{ fontSize: "150px" }}>
                <span className="clear"> CLEAR</span>
                <span className="path">PATH</span>
            </span>
            <div className="background">
                <SignUp/>
            </div>
        </div>
    );
};

export default SignUpPage;