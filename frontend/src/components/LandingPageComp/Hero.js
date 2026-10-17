import React, { useState } from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();
    const HandleTrack = (e) => {
        e.preventDefault();
        if(!validate()){
            alert("Enter correct track id. The track ID should be 6 characters");
        }
        else if (TrackerId) {
            navigate("/track", { state: { selectedTrackingId: TrackerId } });
        }
    }
    const [TrackerId, setTrackerId] = useState("");
    const validate=()=>{
        return TrackerId.trim().length === 6;
    }
    return (
        <header className="homepage-header">
            <div className="circle-overlay top-right"></div>
            <div className="circle-overlay bottom-left"></div>
            <h1 className="your-voice-text">
                <span className="word">Your</span>
                <span className="word">Voice.</span>
                <span className="word">Our</span>
                <span className="word">Action.</span>
            </h1>
            <p>Report civic issues and track their resolution in real-time.
                <br />
                See exactly who is responsible and when your complaint will be resolved.</p>
            <br />
            <form className="search-bar" onSubmit={HandleTrack}>
                <div className="search-bar-field">
                    <input type="text" id="trackID" className="trackid-input" placeholder="Enter 6 digit tracking ID" value={TrackerId} onChange={(e) => setTrackerId(e.target.value)} required />
                    <button className="track-btn">Track</button>
                </div>
            </form>
        </header>
    );
};

export default Hero;