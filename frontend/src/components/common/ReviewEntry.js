import React from 'react';
import '../../css/ReviewEntry.css';
import passengerImg from '../../images/passenger.png';
import driverImg from '../../images/driver.png';
import { formatDate } from '../../utils/formatDate';

const ReviewEntry = ({ review }) => {
    // Determine if the user is the driver or a passenger
    const isDriver = review.userId === review.driverId;
    const imageToShow = isDriver ? driverImg : passengerImg;
    const userRole = isDriver ? "Driver" : "Passenger";

    return (
        <div className="ride-entry">
            <div className="msgHeader">
                <div className="citizen_info">
                    <img src={imageToShow} alt={userRole} className="passengerImg"/>
                    {/* Display "Driver" or "Passenger" based on the role */}
                    <span className="username">{userRole}: {review.userId}</span>
                </div>
                <div className="msgTime">{formatDate(review.createdAt)}</div>
            </div>
            <div className="msgContent">
                <div className="review-text">review: {review.comment}</div>
                <div className="rating">rating: {review.rating}</div>
            </div>
        </div>
    );
};

export default ReviewEntry;
