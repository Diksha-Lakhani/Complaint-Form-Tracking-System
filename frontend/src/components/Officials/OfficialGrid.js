import React from "react";
import "./OfficialGrid.css";
import OfficialCard from "./OfficialCard.js";

const OfficialGrid = ({ name, role, designation, contact, email, image, reversed }) => {
  return (
    // <div className={`official-card ${reversed ? "reversed" : ""}`}>
    //   <div className="official-image-container">
    //     <img src={image} alt={name} className="official-image" />
    //   </div>
    //   <div className="official-info">
    //     <h3>{name}</h3>
    //     <p className="role">{role}</p>
    //     <p className="description">{description}</p>
    //     <p><strong>Contact:</strong> {contact}</p>
    //     <p><strong>Email:</strong> {email}</p>
    //   </div>
    // </div>

    <div className="official_grid">
      <OfficialCard />
      <OfficialCard />
      <OfficialCard />
      <OfficialCard />
      <OfficialCard />
      <OfficialCard />
      <OfficialCard />
    </div>
  );
};

export default OfficialGrid;