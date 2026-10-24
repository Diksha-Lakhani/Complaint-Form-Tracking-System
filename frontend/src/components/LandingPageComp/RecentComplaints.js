import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Road, Droplet, Trash2, Zap, BadgeAlert } from "lucide-react";
import { Pin, Calendar, User, MoveRight, SearchCheck } from "lucide-react";
import "./RecentComplaints.css";
import { useNavigate } from "react-router-dom";

function RecentComplaints() {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const cat = {
        road: Road,
        water: Droplet,
        garbage: Trash2,
        electricity: Zap,
        others: BadgeAlert
    }
    const progressSteps = { "submitted": 1, "under review": 2, "assigned": 3, "in progress": 4, "resolved": 5, };

    const HandleTrack = (TrackerId) => {
        if (TrackerId) {
            navigate("/track", { state: { selectedTrackingId: TrackerId } });
        }
    }

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch('http://localhost:4000/getComplaint');
                const data = await response.json();

                if (response.ok && data.success) {
                    setComplaints(data.complaints);
                } else {
                    alert("Couldn't connect to database. Please try again in some time.");
                }
            } catch (err) {
                console.error("Error fetching complaints:", err);
            }
        };
        fetchComplaints();
    }, [])

    return (
        <div className="recent_complaints_container">
            <div className="title_container">
                <h1>Recent Complaints</h1>
                <p>Latest issues reported by citizens</p>
            </div>
            <br />
            <div className="complaints_container">
                {complaints.map((complaint, index) => {
                    const CurrentCat = cat[complaint.type] || Road;
                    const progress = progressSteps[complaint.status];
                    const status = []
                    for (let i = 0; i < 5; i++) {
                        if (i < progress) {
                            status.push(<div className="step completed"></div>)
                        } else {
                            status.push(<div className="step"></div>)
                        }
                    }

                    return (
                        <div className="complaints_box" key={index}>
                            <h2>{complaint.title}</h2>
                            <p>{complaint.description}</p>
                            <h3>Progress</h3>
                            <div className="progress_bar">
                                {status}
                            </div>
                            <p><span><Pin size={13} /></span>{complaint.loc}</p>
                            <div className="date_name">
                                <p><span><Calendar size={13} /></span>{complaint?.created_at ? new Date(complaint.created_at).toLocaleString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                }) : ''}</p>
                                <p><span><SearchCheck size={15} /></span>    {complaint.trackid}</p>
                                <p style={{ textTransform: "capitalize" }}><span><CurrentCat size={15} /></span> {complaint.type}</p>
                            </div>
                            <div className="track_btn_container">
                                <button onClick={() => HandleTrack(complaint.trackid)}>Track progress  <span className="right_arrow"><MoveRight size={20} /></span></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default RecentComplaints;