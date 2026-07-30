import React,{useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Pin, Calendar, User, MoveRight,SearchCheck } from "lucide-react";
import "./RecentComplaints.css";
import { useNavigate } from "react-router-dom";

function RecentComplaints() {
    const navigate = useNavigate();
    const HandleTrack=(TrackerId)=>{
        if (TrackerId) {
            navigate("/track", {state: { selectedTrackingId: TrackerId }}); 
        }
    }
    const Track={
        1:"23dc1y",
        2:"r7Crqa",
        3:"9aQR4X",
        4:"y6XW34"
    };
    return (
        <div className="recent_complaints_container">
            <div className="title_container">
                <h1>Recent Complaints</h1>
                <p>Latest issues reported by citizens</p>
            </div>
            <br />
            <div className="complaints_container">
                <div className="complaints_box">
                    <h2>PotHole on Main road</h2>
                    <p>Large pothole causing accidents near the market area. Has been there for 2 weeks.</p>
                    <h3>Progress</h3>
                    <div className="progress_bar">
                        <div className="step completed"></div>
                        <div className="step completed"></div>
                        <div className="step"></div>
                        <div className="step"></div>
                        <div className="step"></div>
                    </div>
                    <p><span><Pin size={13} /></span>    Main Street, Near City Market</p>
                    <div className="date_name">
                        <p><span><Calendar size={13} /></span>    Feb 14, 2026</p>
                        <p><span><SearchCheck size={15} /></span>    {Track[1]}</p>
                        <p><span><User size={13} /></span>    Rajashekar</p>
                    </div>
                    <div className="track_btn_container">
                        <button onClick={()=>HandleTrack(Track[1])}>Track progress  <span className="right_arrow"><MoveRight size={20} /></span></button>
                    </div>
                </div>
                <div className="complaints_box">
                    <h2>Water supply isn't regular</h2>
                    <p>No water supply for the past 3 days in our area. Tankers are also not available.</p>
                    <h3>Progress</h3>
                    <div className="progress_bar">
                        <div className="step completed"></div>
                        <div className="step completed"></div>
                        <div className="step completed"></div>
                        <div className="step completed"></div>
                        <div className="step"></div>
                    </div>
                    <p><span><Pin size={13} /></span>    Green Park Colony</p>
                    <div className="date_name">
                        <p><span><Calendar size={13} /></span>    Feb 14, 2026</p>
                        <p><span><SearchCheck size={15} /></span>    {Track[2]}</p>
                        <p><span><User size={13} /></span>    Priya Sharma</p>
                    </div>
                    <div className="track_btn_container">
                        <button onClick={()=>HandleTrack(Track[2])}>Track progress  <span className="right_arrow"><MoveRight size={20} /></span></button>
                    </div>
                </div>
                <div className="complaints_box">
                    <h2>Garbage not cleaned yet</h2>
                    <p>Garbage has been piling up in our street for over a week. Causing health hazard</p>
                    <h3>Progress</h3>
                    <div className="progress_bar">
                        <div className="step completed"></div>
                        <div className="step completed"></div>
                        <div className="step completed"></div>
                        <div className="step"></div>
                        <div className="step"></div>
                    </div>
                    <p><span><Pin size={13} /></span>    Gandhi Road, Block B</p>
                    <div className="date_name">
                        <p><span><Calendar size={13} /></span>    Feb 14, 2026</p>
                        <p><span><SearchCheck size={15} /></span>    {Track[3]}</p>
                        <p><span><User size={13} /></span>    Ananya Joshi</p>
                    </div>
                    <div className="track_btn_container">
                        <button onClick={()=>HandleTrack(Track[3])}>Track progress  <span className="right_arrow"><MoveRight size={20} /></span></button>
                    </div>

                </div>
                <div className="complaints_box">
                    <h2>Street lights are not working</h2>
                    <p>Street light at the corner has been non-functional for over a month creating safety</p>
                    <h3>Progress</h3>
                    <div className="progress_bar">
                        <div className="step completed"></div>
                        <div className="step "></div>
                        <div className="step"></div>
                        <div className="step"></div>
                        <div className="step"></div>
                    </div>
                    <p><span><Pin size={13} /></span>    Nehru Nagar, Corner of 4th Cross</p>
                    
                    <div className="date_name">
                        <p><span><Calendar size={13} /></span>    Feb 14, 2026</p>
                        <p><span><SearchCheck size={15} /></span>    {Track[4]}</p>
                        <p><span><User size={13} /></span>    Amit Singh</p>
                    </div>
                    <div className="track_btn_container">
                        <button onClick={()=>HandleTrack(Track[4])}>Track progress  <span className="right_arrow"><MoveRight size={20} /></span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentComplaints;