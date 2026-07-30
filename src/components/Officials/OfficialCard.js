import React from "react";
import "./OfficialCard.css";

const OfficialCard = ({ name, role, description, contact, email, image, reversed }) => {
  return (
    <div className={`official-card ${reversed ? "reversed" : ""}`}>
      <div className="official-image-container">
        <img src={image} alt={name} className="official-image" />
      </div>
      <div className="official-info">
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <p className="description">{description}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
};

export default OfficialCard;