import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import "./Official.css";

function OfficialGrid() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/home");
    };
    return (
        <div className="official_container">
            <div className="btn_container">
                <button className="back_btn" onClick={() => { handleBack() }}><span className="back_btn_span"><MoveLeft /></span>Back</button>
            </div>
            <div className="heading_container">
                <h1>Contact Your Officials</h1>
                <p> Reach out directly to the right department head for faster resolution of your concerns.</p>
            </div>
        </div>
    );
};

export default OfficialGrid;