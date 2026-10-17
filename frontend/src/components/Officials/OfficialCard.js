import React, { useState, useEffect } from "react";
import "./OfficialCard.css";

function OfficialCard() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleCard = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="official_card_container">
            <div className="official_card_info">
                <p className="Official_name">Jitendra Das</p>
                <p className="Official_position">Head of Road department</p>
            </div>
        </div>
    );
}

export default OfficialCard;