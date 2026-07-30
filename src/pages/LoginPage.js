import React from "react";
import LoginForm from "../components/LoginPageComp/LoginForm";
import "./LoginPage.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
    const location = useLocation();
    useEffect(() => {
        if (location.state?.message) {
            alert(location.state.message);
        }
    }, [location]);
    return (
        <div className="login_page">
            <span className="title" style={{ fontSize: "150px" }}>
                <span className="clear"> CLEAR</span>
                <span className="path">PATH</span>
            </span>
            <div className="background">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;