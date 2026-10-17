import React from "react";
import Navbar from "../components/GeneralComp/Navbar.js";
import Hero from "../components/LandingPageComp/Hero.js"
import Review from "../components/LandingPageComp/ReviewProgress.js";
import Content from "../components/LandingPageComp/Content.js";
import Footer from "../components/GeneralComp/Footer.js";
import RecentComplaints from "../components/LandingPageComp/RecentComplaints.js";
import ReviewCard from "../components/LandingPageComp/ReviewCards.js";
import Report from "../components/LandingPageComp/ReportCategory.js"
import "./LandingPage.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
 

function LandingPage(){
    const location = useLocation();
    useEffect(() => {
        if (location.state?.message) {
            alert(location.state.message);
        }
    }, [location]);

    return(
        <div className="landing-page-container">
            <Navbar/>
            <Hero/>
            <Report/>
            <Review/>
            <RecentComplaints/>
            <Content/>
            <ReviewCard/>
            <Footer/>
        </div>

    )
}

export default LandingPage;