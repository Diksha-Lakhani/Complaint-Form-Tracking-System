import React, { useState, useEffect } from "react";
import "./Tracking.css";
import { Road, Pin, Calendar, User, MoveLeft, Phone, Mail, MessageCircle, CheckCircle2, Clock, Circle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Track() {
    const navigate = useNavigate();
    const location = useLocation();
    const [TrackId, setTrackId] = useState("");
    const [DisplayID, setDisplayID] = useState("");
    const [complaint, setComplaint] = useState({});

    const handleBack = () => {
        navigate("/home");
    };

    useEffect(() => {
        if (location.state?.selectedTrackingId) {
            setTrackId(location.state.selectedTrackingId);
            setDisplayID(location.state.selectedTrackingId)
            handleTrack(location.state.selectedTrackingId);
        }
    }, [location.state]);

    const handleTrack = async (trackid) => {
        if (trackid.trim().length !== 6) {
            alert("Enter correct track id. The track ID should be 6 characters");
        }
        else if (trackid) {
            const response = await fetch("http://localhost:4000/trackComplaint", {
                method: 'POST',
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ trackid }),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                console.log(data)
                setComplaint(data.complaint);
                setDisplayID(trackid);
            } else {
                alert("Couldn't connect to database. Please try again in some time.");
            }
        }
    }
    const statusOrder = ['submitted', 'under review', 'assigned', 'in progress', 'resolved']
    const currentStatusIndex = statusOrder.indexOf(complaint?.status)

    const stepsConfig = [
        { title: "Submitted", desc: "Complaint registered", key: "submitted" },
        { title: "Under Review", desc: "Being Assessed", key: "under review" },
        { title: "Assigned", desc: "Official Notified", key: "assigned" },
        { title: "In Progress", desc: "Work Underway", key: "in progress" },
        { title: "Resolved and Closed", desc: "Issue Resolved and closed", key: "resolved" },
    ];

    const timelineSteps = stepsConfig.map((step, index)=>{
        let stepStatus = 'pending';
        if(currentStatusIndex !== -1){
            if(index < currentStatusIndex){
                stepStatus  = 'complete';
            } else if(index == currentStatusIndex){
                stepStatus = 'current';
            }
        }
        return{...step, status: stepStatus}
    });

    return (
        <div className="track_container">
            <div className="btn_container">
                <button className="back_btn" onClick={() => { handleBack() }}><span className="back_btn_span"><MoveLeft /></span>Back</button>
            </div>
            <div className="heading_container">
                <h1 style={{ textAlign: 'center' }}>Track Your Complaint</h1>
                <p>Track your complaint from submission to resolution.
                    <br />
                    Stay informed with real-time updates and direct access to assigned officials.</p>
            </div>
            <div className="complaint_box">
                <h3>Tracking Your Complaint</h3>
                <p className="left_align">Enter your tracking ID</p>
                <div className="track_search_row">
                    <input type="text" placeholder="Example #CMP002" value={TrackId} onChange={(e) => setTrackId(e.target.value)} required />
                    <button className="tp_track_btn" onClick={() => { handleTrack(TrackId) }}>Track</button>
                </div>
            </div>
            {DisplayID && ({/*we want that when the DisplayID is empty, the div is hidden and when it has any value, it is visible The && (AND) operator in JavaScript works from left to right.If the first part is true, it moves to the second part and returns it.If the first part is false, it stops immediately and returns nothing.*/ },
                <div className="hidden_container">
                    <div className="track_grid">
                        <div className="complaint_track_container">
                            <div className="track_id_badge"><Road color="#F23D3D" size={35} strokeWidth={1.5} />Tracking ID: <br />#{DisplayID}</div>
                            <div className="track_card">
                                <h4>{complaint?.title}</h4>
                                <p className="left_align">{complaint?.description}</p>
                                <div className="track_info">
                                    <span><Pin size={13} /> {complaint?.loc} </span>
                                    <span><Calendar size={13} /> {complaint?.created_at ? new Date(complaint.created_at).toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    }) : ''} </span>
                                    <span><User size={13} /> {`${complaint?.first_name} ${complaint?.last_name}`} </span>
                                </div>
                            </div>
                        </div>
                        <div className="track_card official">
                            <h4>Official Assigned</h4>
                            <br />
                            <p className="left_align">{`${complaint?.first_name} ${complaint?.last_name}`}<br />
                                {complaint?.designation}</p>
                            <div className="track_contact_btns">
                                <button onClick={() => window.location.href = `tel:${complaint.phone}`}><Phone size={16} /> Call</button>
                                <button onClick={() => window.location.href = `mailto:${complaint.email}?subject=Complaint Tracking: ${TrackId}`}><Mail size={16} /> Mail</button>
                                <button onClick={() => window.open(`https://wa.me/${complaint.phone}?text=Hello, I am inquiring about my complaint ID: ${TrackId}`, "_blank")}><MessageCircle size={16} /> WhatsApp</button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="track_timeline_box">
                        <h1>Progress Timeline</h1>
                        <br />
                        <div className="track_timeline_list">           {/*.map() iterates over each element og the array */}
                            {timelineSteps.map((step, index) => {
                                {/*step gives the object of each iteration and index holds the index of each iteration of the array*/ }
                                const sideclass = index % 2 == 0 ? "left" : "right";
                                return (
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