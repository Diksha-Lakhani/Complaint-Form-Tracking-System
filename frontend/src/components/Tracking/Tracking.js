import React, { useState, useEffect } from "react";
import "./Tracking.css";
import { Road, Pin, Calendar, User, MoveLeft, Phone, Mail, MessageCircle, CheckCircle2, Clock, Circle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Track() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleBack = () => {
        navigate("/home");
    };
    const [TrackId, setTrackId] = useState("");
    const [DisplayID, setDisplayID] = useState("");
    useEffect(() => {
        if (location.state?.selectedTrackingId) {
            setTrackId(location.state.selectedTrackingId);
            setDisplayID(location.state.selectedTrackingId)
        }
    }, [location.state]);
    const handleTrack = () => {
        if (!validate()) {
            alert("Enter correct track id. The track ID should be 6 characters");
        }
        else if (TrackId) {
            setDisplayID(TrackId);
            navigate("/track", { state: { selectedTrackingId: TrackId } });
        }
    }
    const validate = () => {
        return TrackId.trim().length === 6;
    }
    const timelineSteps = [
        { title: "Submitted", desc: "Complaint registered", status: "complete" },
        { title: "Under Review", desc: "Being Assessed", status: "complete" },
        { title: "Assigned", desc: "Official Assigned", status: "current" },
        { title: "In Progress", desc: "Work Underway", status: "pending" },
        { title: "Resolved", desc: "Issue Resolved", status: "pending" },
        { title: "Closed", desc: "Complaint Resolved", status: "pending" },
    ];
    const officialPhone = "919876543210";
    const officialEmail = "rajeshwari.s@authority.gov";
    const complaintId = TrackId;
    return (
        <div className="track_container">
            <div className="btn_container">
                <button className="back_btn" onClick={() => { handleBack() }}><span className="back_btn_span"><MoveLeft /></span>Back</button>
            </div>
            <div className="heading_container">
                <h1 style={{textAlign:'center'}}>Track Your Complaint</h1>
                <p>Track your complaint from submission to resolution.
                    <br />
                    Stay informed with real-time updates and direct access to assigned officials.</p>
            </div>
            <div className="complaint_box">
                <h3>Tracking Your Complaint</h3>
                <p className="left_align">Enter your tracking ID</p>
                <div className="track_search_row">
                    <input type="text" placeholder="Example #4123abc" value={TrackId} onChange={(e) => setTrackId(e.target.value)} required />
                    <button className="tp_track_btn" onClick={() => { handleTrack() }}>Track</button>
                </div>
            </div>
            {DisplayID && (                     {/*we want that when the DisplayID is empty, the div is hidden and when it has any value, it is visible The && (AND) operator in JavaScript works from left to right.If the first part is true, it moves to the second part and returns it.If the first part is false, it stops immediately and returns nothing.*/ },
                <div className="hidden_container">
                    <div className="track_grid">
                        <div className="complaint_track_container">
                            <div className="track_id_badge"><Road color="#F23D3D" size={35} strokeWidth={1.5} />Tracking ID: <br />#{DisplayID}</div>
                            <div className="track_card">
                                <h4>Pothole on Main Road</h4>
                                <p className="left_align">Large pothole causing accidents near the market area. Has been there for 2 weeks.</p>
                                <div className="track_info">
                                    <span><Pin size={13} /> Main Street, Near City</span>
                                    <span><Calendar size={13} />Feb 14, 2026</span>
                                    <span><User size={13} />Rajashekar</span>
                                </div>
                            </div>
                        </div>
                        <div className="track_card official">
                            <h4>Official Assigned</h4>
                            <p className="left_align">Mrs Rajeshwari Sinha</p>
                            <div className="track_contact_btns">
                                <button onClick={() => window.location.href = `tel:${officialPhone}`}><Phone size={16} /> Call</button>
                                <button onClick={() => window.location.href = `mailto:${officialEmail}?subject=Complaint Tracking: ${complaintId}`}><Mail size={16} /> Mail</button>
                                <button onClick={() => window.open(`https://wa.me/${officialPhone}?text=Hello, I am inquiring about my complaint ID: ${complaintId}`, "_blank")}><MessageCircle size={16} /> WhatsApp</button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="track_timeline_box">
                        <h1>Progress Timeline</h1>
                        <br />
                        <div className="track_timeline_list">           {/*.map() iterates over each element og the array */}
                            {timelineSteps.map((step, index) => { {/*step gives the object of each iteration and index holds the index of each iteration of the array*/ }
                                const sideclass=index%2==0?"left":"right";
                            return(
                            <div key={index} className={`tp_timeline_item ${step.status}`}>  {/* key={index} helps react to keep a track of the timelineSteps array so that when any element changes, it can track the change and update the page accordingly and not have the need to re-render the page*/}
                                <div className={`tp_step_content ${sideclass}`} border>
                                    <strong>{step.title}</strong>
                                    <p>{step.desc}</p>
                                </div>
                                <div className="tp_step_indicator">
                                    {step.status === "complete" && (<div className="icon_container_done"><CheckCircle2 size={40} className="icon_done" /></div>)}            {/*tells that when status is completed, it should display checkCircle icon */}
                                    {step.status === "current" && (<div className="icon_container_current"><Clock size={40} className="icon_current" /></div>)}                 {/*&& is used as => when the condiiton is true, it renders the statements after it but if the condition is false it ignores the statements after it and renders nothing */}
                                    {step.status === "pending" && (<div className="icon_container_pending"><Circle size={40} className="icon_pending" /></div>)}
                                </div>
                            </div>
                            );
                        })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Track;