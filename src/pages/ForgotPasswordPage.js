import React from "react";
import ForgotPassword from "../components/LoginPageComp/ForgotPassword";
import "./LoginPage.css";

function ForgotPasswordPage() {
    return (
        <div className="login_page">
            <span className="title" style={{ fontSize: "150px" }}>
                <span className="clear"> CLEAR</span>
                <span className="path">PATH</span>
            </span>
            <div className="background">
                <ForgotPassword />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;