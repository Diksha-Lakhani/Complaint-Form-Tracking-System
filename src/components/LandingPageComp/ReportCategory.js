import React from "react";
import { Road,Droplet,Trash2,Zap,BadgeAlert} from 'lucide-react';
import "./ReportCategory.css";
import {useNavigate} from "react-router-dom";

function Report()
{
    const navigate=useNavigate();
    const handleCategory = (category) => {
        navigate("/complaint_form", { state: { selectedCategory: category } });
    };
    return(
        <div className="report_container">
            <h1>Report Issues by Category</h1>
            <p>Choose the type of issue you want to report</p>
            <br/>
            <div className="issue_container">
                <div className="issue_box" onClick={() => handleCategory("Road")}>
                    <Road color="#F23D3D" size={52}  strokeWidth={1.5}/>
                    <br/>
                    <span>Road Issue</span>
                </div>
                <div className="issue_box" onClick={() => handleCategory("Water")}>
                    <Droplet color="#33C7CC" size={52} strokeWidth={1.5}/>
                    <br/>
                    <span>Water Issue</span>
                </div>
                <div className="issue_box" onClick={() => handleCategory("Garbage")}>
                    <Trash2 color="#6FE63C" size={52} strokeWidth={1.5}/>
                    <br/>
                    <span>Garbage Issue</span>
                </div>
                <div className="issue_box" onClick={() => handleCategory("Electricity")}>
                    <Zap color="#E0D231" size={52} strokeWidth={1.5}/>
                    <br/>
                    <span>Electricity Issue</span>
                </div>
                <div className="issue_box" onClick={() => handleCategory("Others")}>
                    <BadgeAlert color="#7e13d0" size={52} strokeWidth={1.5}/>
                    <br/>
                    <span>Others</span>
                </div>
            </div>
        </div>
    );
};

export default Report;