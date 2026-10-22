import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MoveLeft, MoveRight, CircleCheck } from "lucide-react";
import "./ComplaintRegistered.css";

function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const [trackId, setTrackId] = useState("");

    function handleBack() {
        navigate("/home");
    };

    function handleTracking() {
        navigate("/track", { state: { selectedTrackingId: trackId } });
    };

    useEffect(() => {
        console.log("Location state received:", location.state);
        if (location.state?.trackId) {
            setTrackId(location.state.trackId);
        }
    }, [location.state]);

    return (
        <div className="register_container">
            <div className="btn_container">
                <button className="back_btn" onClick={() => { handleBack() }}><span className="back_btn_span"><MoveLeft /></span>Back</button>
            </div>
            <br />
            <div className="registered_box">
                <div className="icon_circle_container">
                    <div className="icon_circle">
                        <CircleCheck size={60} color="#2D8A4E" fill="#A8D5BA" />
                    </div>
                </div>
                <h2>Your Complaint has been registered!</h2>
                <p className="sub_text">Your Track ID is</p>
                <div className="track_id_badge1">
                    {trackId}
                </div>
                <p className="footer_text">Use this ID to track your complaint anytime</p>
            </div>
            <br />
            <div className="tracking_btn_container">
                <button className="tracking_btn" onClick={() => handleTracking(trackId)}>
                    Tracking <MoveRight size={18} />
                </button>
            </div>
        </div>
    );
}

export default Register;