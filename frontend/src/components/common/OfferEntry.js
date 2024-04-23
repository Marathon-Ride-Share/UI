import React from "react";
import "../../css/RideEntry.css";
import "../../css/RideCard.css";
import carLogo from "../../images/car.png";
import { formatDate } from "../../utils/formatDate";
import { bookRide } from "../../services/rideShareService";
import { BookRideRequest } from "../../models/RideShareModels";

const handleBookRide = async (rideId, location) => {
  try {
    console.log("booking ride");
    const bookRideRequest = new BookRideRequest(
      localStorage.getItem("username"),
      rideId,
      location
    );
    const response = await bookRide(bookRideRequest);
    console.log(response);
  } catch (error) {
    console.error("Failed to fetch rides:", error);
    // Show an error message to the user
    alert("Failed to fetch rides: " + error);
  }
};

const OfferEntry = ({ ride, location }) => {
  return (
    <div className="ride-entry">
      <div className="ride-car">
        <img src={carLogo} alt="Car" className="carLogo" />
      </div>
      <div className="ride-info-entry">
        <div className="address-entry">{ride.destination.locationName}</div>
        <div className="price-entry">${ride.price}</div>
      </div>
        <button onClick={() => handleBookRide(ride.id, location)}>Book</button>
    </div>
  );
};

export default OfferEntry;
