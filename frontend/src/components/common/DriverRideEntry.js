import React from "react";
import "../../css/RideEntry.css";
import "../../css/RideCard.css";
import carLogo from "../../images/car.png";
import { formatDate } from "../../utils/formatDate";

const DriverRideEntry = ({ ride }) => {
    // Handler for starting the ride
    const handleStartRequest = () => {
        console.log("Start ride request initiated for:", ride.id);
        // Add your logic for starting the ride
    };

    // Handler for completing the ride
    const handleCompleteRequest = () => {
        console.log("Complete ride request initiated for:", ride.id);
        // Add your logic for completing the ride
    };

    return (
        <div className="ride-entry">
            <div className="ride-car">
                <img src={carLogo} alt="Car" className="carLogo" />
            </div>
            <div className="ride-info-entry">
                <div className="address-entry">{ride.destination.locationName}</div>
                <div className="date-time-entry">{formatDate(ride.startTime)}</div>
                <div className="price-entry">${ride.price}</div>
            </div>
            <div className="review-action">
                {ride.status === "CREATED" && (
                    <button onClick={handleStartRequest}>Start</button>
                )}
                {ride.status === "STARTED" && (
                    <button onClick={handleCompleteRequest}>Complete</button>
                )}
            </div>
        </div>
    );
};

export default DriverRideEntry;