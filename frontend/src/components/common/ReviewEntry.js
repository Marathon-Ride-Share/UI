import React, { useEffect, useState } from 'react';
import '../../css/ReviewEntry.css';
import passengerImg from '../../images/passenger.png';
import driverImg from '../../images/driver.png';
import { formatDate } from '../../utils/formatDate';

const ReviewEntry = ({ review , onDelete}) => {
    const [username, setUsername] = useState('default');

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            console.log("review", review);
            console.log("review.reviewId", review.reviewId);
            onDelete(review.reviewId,username);
        }
    };



    const isDriver = review.userId === review.driverId;
    const imageToShow = isDriver ? driverImg : passengerImg;
    const userRole = isDriver ? "Driver" : "Passenger";
    const canDelete = username === review.userId;
    const canUpdate = username === review.userId;

    return (
        <div className="ride-entry">
            <div className="msgHeader">
                <div className="citizen_info">
                    <img src={imageToShow} alt={userRole} className="passengerImg"/>
                    <span className="username">{userRole}: {review.userId}</span>
                </div>
                <div className="msgTime">{formatDate(review.createdAt)}</div>
            </div>
            <div className="msgContent">
                <div className="review-text">review: {review.comment}</div>
                <div className="rating">rating: {review.rating}</div>
            </div>
            {canDelete && (
                <button className="delete-button" onClick={handleDelete}>X</button>
            )}
        </div>
    );
};

export default ReviewEntry;
