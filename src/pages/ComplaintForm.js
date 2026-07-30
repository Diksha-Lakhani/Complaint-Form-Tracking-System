import React from "react";
import "./ComplaintForm.css";
import CompForm from "../components/ComplaintFormComp/CompForm.js";
import Navbar from "../components/GeneralComp/Navbar.js";
import Footer from "../components/GeneralComp/Footer.js";

function ComplaintForm(){
    return(
        <div className="complaint_form_page">
            <Navbar/>
            <CompForm/>
            <Footer/>
        </div>
    );
}

export default ComplaintForm;