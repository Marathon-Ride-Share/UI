import React from "react";
import "../../css/RideEntry.css";
import "../../css/RideCard.css";
import carLogo from "../../images/car.png";
import { formatDate } from "../../utils/formatDate";
import { bookRide } from "../../services/rideShareService";
import { BookRideRequest } from "../../models/RideShareModels";
import { useNavigate } from "react-router-dom";

const handleBookRide = async (rideId, location, navigate) => {
  try {
    console.log("booking ride");
    const bookRideRequest = new BookRideRequest(
      localStorage.getItem("username"),
      rideId,
      location
    );
    // console.log(bookRideRequest);
    const response = await bookRide(bookRideRequest);
    navigate("/my-rides", { state: { ride: response } });
  } catch (error) {
    console.error("Failed to fetch rides:", error);
    // Show an error message to the user
    alert("Failed to fetch rides: " + error);
  }
};

const OfferEntry = ({ ride, location }) => {
  const navigate = useNavigate();
  return (
    <div className="ride-entry">
      <div className="ride-car">
        <img src={carLogo} alt="Car" className="carLogo" />
      </div>
      <div className="ride-info-entry">
        <div className="address-entry">{ride.destination.locationName}</div>
        <div className="price-entry">${ride.price}</div>
      </div>
      <button onClick={() => handleBookRide(ride.rideId, location, navigate)}>
        Book
      </button>
    </div>
  );
};

export default OfferEntry;
