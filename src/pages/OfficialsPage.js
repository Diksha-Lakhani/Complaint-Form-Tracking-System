import React from "react";
import Navbar from "../components/GeneralComp/Navbar.js";
import Footer from "../components/GeneralComp/Footer.js";
import OfficialGrid from "../components/Officials/Official.js";
import OfficialCard from "../components/Officials/OfficialCard.js";

function Official(){
    return(
        <div className="offical_page_container">
            <Navbar/>
            <OfficialGrid/>
            <OfficialCard/>
            <Footer/>
        </div>
    );
};

export default Official;