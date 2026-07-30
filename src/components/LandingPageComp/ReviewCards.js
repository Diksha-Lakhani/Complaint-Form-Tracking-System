import React from "react";
import { Star } from 'lucide-react';
import "./ReviewCard.css";

function ReviewCard() {
    return (
        <div className="review_card_container">
            <h1>What our users say</h1>
            <p>Take a look at what our daily users feel about us</p>
            <br />
            <div className="card_container">
                <div className="card">
                    <div className="star_container">
                        <Star color="#FFBB00" fill="#FFBB00" />
                        <Star color="#FFBB00" fill="#FFBB00" />
                        <Star color="#FFBB00" fill="#FFBB00" />
                        <Star color="#FFBB00" />
                        <Star color="#FFBB00" />
                    </div>
                    <h2> Aditya Gosh</h2>
                    <p>A major underground water pipe seems to have burst. Water has been gushing out onto the pavement for the last 24 hours, wasting a significant amount of treated water and making the sidewalk slippery for pedestrians.</p>
                    <div className="resolved"><div className="resolved_fill"></div>Resolved</div>
                </div>
                <div className="card">
                    <div className="star_container">
                        <Star color="#FFBB00" fill="#FFBB00" />
                        <Star color="#FFBB00" />
                        <Star color="#FFBB00" />
                        <Star color="#FFBB00" />
                        <Star color="#FFBB00" />
                    </div>
                    <h2> Rajesh Mitra</h2>
                    <p>The community garbage bins in our lane haven't been cleared for the past 5 days. The waste is now spilling onto the road, causing a foul smell and attracting stray animals. This is becoming a major health concern for the residents.</p>
                    <div className="resolved"><div className="resolved_fill"></div>Resolved</div>
                </div>
                <div className="card">
                    <div className="star_container">
                        <Star color="#FFBB00" fill="#FFBB00" />
                        <Star color="#FFBB00" fill="#FFBB00" />
                        <Star color="#FFBB00" fill="#FFBB00" />
                        <Star color="#FFBB00" />
                        <Star color="#FFBB00" />
                    </div>
                    <h2> Sajni Meheta</h2>
                    <p>None of the street lights are working on the stretch between the Library and the Public Park. The entire road is pitch black after 7 PM, making it unsafe for women and elderly residents to walk home from the bus stop.</p>
                    <div className="resolved"><div className="resolved_fill"></div>Resolved</div>
                </div>
                <div className="card">
                    <div className="star_container">
                        <Star color="#FFBB00" fill="#FFBB00" />
                        <Star color="#FFBB00" fill="#FFBB00" />
                        <Star color="#FFBB00" />
                        <Star color="#FFBB00" />
                        <Star color="#FFBB00" />
                    </div>
                    <h2> Suhana Kumari</h2>
                    <p>There is a very deep pothole located right in the middle of the main road, approximately 50 meters from the City Market entrance. It is particularly dangerous at night as the area is poorly lit.</p>
                    <div className="resolved"><div className="resolved_fill"></div>Resolved</div>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;