import React from "react";
import { Eye,Bell,User,Shield} from 'lucide-react';
import "./Content.css";

function Content()
{
    return(
        <div className="content1_container">
            <h1>Transparent & Accountable</h1>
            <p>Every complaint is tracked, every official is accountable</p>
            <br/>
            <div className="content_container">
                <div className="content_box">
                    <Eye color="#FFBB00" size={52}  strokeWidth={1.5}/>
                    <br/>
                    <span>Real-time Tracking</span>
                </div>
                <div className="content_box">
                    <Bell color="#FFBB00" size={52} strokeWidth={1.5}/>
                    <br/>
                    <span>Progress Updates</span>
                </div>
                <div className="content_box">
                    <User color="#FFBB00" size={52} strokeWidth={1.5}/>
                    <br/>
                    <span>Assigned Officials</span>
                </div>
                <div className="content_box">
                    <Shield color="#FFBB00" size={52} strokeWidth={1.5}/>
                    <br/>
                    <span>TransparentProcess</span>
                </div>
            </div>
        </div>
    );
};

export default Content;