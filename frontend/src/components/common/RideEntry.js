import React from 'react';
import '../../css/RideEntry.css'; // Ensure this file is in the same directory and contains styles for RideEntry
import '../../css/RideCard.css'; 
import carLogo from '../../images/car.png';
import { formatDate } from '../../utils/formatDate';
const RideEntry = ({ride}) => {
    return (
        <div className="ride-entry">
            <div className="ride-car">
                <img src={carLogo} alt="Car" className="carLogo"/>
            </div>
            <div className="ride-info-entry">
                <div className="address-entry">{ride.destination.locationName}</div>
                <div className="date-time-entry">{formatDate(ride.endTime)}</div>
                <div className="price-entry">${ride.price}</div>                
            </div>
            <div className="review-action">Review</div>
        </div>
    );
};

export default RideEntry;
