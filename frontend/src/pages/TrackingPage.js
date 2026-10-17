import React from "react";
import Navbar from "../components/GeneralComp/Navbar.js";
import Footer from "../components/GeneralComp/Footer.js";
import Track from "../components/Tracking/Tracking.js";

function TrackingPage(){
    return(
        <div className="Tracking_Page_container">
            <Navbar/>
            <Track/>
            <Footer/>
        </div>
        );
}

export default TrackingPage;