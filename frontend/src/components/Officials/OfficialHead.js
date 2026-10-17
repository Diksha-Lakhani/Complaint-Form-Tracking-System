import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import "./OfficialHead.css";

function OfficialHead() {
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
            <div className="official_nav">
                <ul className="nav_links">
                    <li><Link to="/">Road</Link></li>
                    <li><Link to="/">Water</Link></li>
                    <li><Link to="/">Garbage</Link></li>
                    <li><Link to="/">Electrical</Link></li>
                    <li><Link to="/">Other</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default OfficialHead;