import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "../css/RideHistory.css";
import RideEntry from "../components/common/RideEntry";
import RideCard from "../components/common/RideCard";

import rides from "../services/mockData";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const BookRidePage = () => {
  return (
    <>
      <Header />
      <div className="ride-history">
        <div className="ride-list">
          {rides.map((ride, index) =>
            index === 0 ? (
              <RideCard
                key={ride.rideId}
                ride={ride}
                className="ride-history-card"
              />
            ) : (
              <RideEntry
                key={ride.rideId}
                ride={ride}
                className="ride-entry-card"
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookRidePage;
