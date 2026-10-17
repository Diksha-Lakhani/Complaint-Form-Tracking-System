import React from "react";
import Navbar from "../components/GeneralComp/Navbar.js";
import Footer from "../components/GeneralComp/Footer.js";
import OfficialHead from "../components/Officials/OfficialHead.js";
import OfficialGrid from "../components/Officials/OfficialGrid.js";

function Official(){
    return(
        <div className="offical_page_container">
            <Navbar/>
            <OfficialHead/>
            <OfficialGrid/>
            <Footer/>
        </div>
    );
};

export default Official;