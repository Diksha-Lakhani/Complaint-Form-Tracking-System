import React from "react";
import { BookOpen, MoveUpRight, Check, Clock } from 'lucide-react';
import "./ReviewProgress.css";

function Review() {
    return (
        <div className="review_container">
            <h1>Review your Progress</h1>
            <br />
            <div className="progress_container">
                <div className="progress_box">
                    <div className="inside_progress_box">
                        <span>Total Complaints</span>
                        <span>5</span>
                    </div>
                    <BookOpen size={32} className="yellow"/>
                </div>

                <div className="progress_box">
                    <div className="inside_progress_box">
                        <span>Resolved</span>
                        <span>1</span>
                    </div>
                    <MoveUpRight size={32} className="yellow"/>
                </div>

                <div className="progress_box">
                    <div className="inside_progress_box">
                        <span>In Progress</span>
                        <span >2</span>
                    </div>
                    <Check size={32} className="yellow"/>
                </div>

                <div className="progress_box">
                    <div className="inside_progress_box">
                        <span >Pending Review</span>
                        <span >2</span>
                    </div>
                    <Clock size={32} className="yellow"/>
                </div>
                
            </div>
        </div>
    );
}

export default Review;