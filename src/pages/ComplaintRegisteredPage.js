import React from "react";
import Register from "../components/ComplaintRegistered/ComplaintRegistered";
import Navbar from "../components/GeneralComp/Navbar.js";
import Footer from "../components/GeneralComp/Footer.js";

function ComplaintRegistered(){
    return(
        <div className="complaint_registered">
            <Navbar/>
            <Register/>
            <Footer/>
        </div>
    );
}

export default ComplaintRegistered;