import React from "react";
import {useNavigate,Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate=useNavigate();
    const handleLogout=(event)=>{
        event.preventDefault();
            navigate("/",{ state: { message: "Logged out!" } });
    }
        return (
        <nav className="navbar">
            <h1 className="title">
                <span className="clear">CLEAR</span>
                <span className="path">PATH</span>
            </h1>
            <ul>
                <li><Link to="/home"> Home </Link></li>
                <li><Link to="/track"> Tracking </Link></li>
                <li><Link to="/complaint_form"> Complaints </Link></li>
                {/* <li><Link to="/official">Officials </Link></li> */}
                <li> <button className="logout" onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;