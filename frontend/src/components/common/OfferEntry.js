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
    const searchRequest = new BookRideRequest(
      localStorage.getItem("username"),
      rideId,
      location
    );
    const response = await findRidesNearby(searchRequest);

    const userId = localStorage.getItem("userId");
    const filteredRides = response.rides.filter(
      (ride) => ride.driverInfo.driverName !== userId
    );
    console.log(filteredRides);
    setRides(filteredRides);
    setShowModal(true);
    // create a scrollable popup that displays all the rides and once user selects one ride, navigate to the ride details page and allow them to book it
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
      <button>Book</button>
    </div>
  );
};

export default OfferEntry;
