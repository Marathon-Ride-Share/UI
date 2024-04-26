import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "../css/RideHistory.css";
import RideCard from "../components/common/RideCard";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { startRide, completeRide } from "../services/rideShareService";
import { useNavigate } from "react-router-dom";

const MyRidePage = () => {
  const [username, setUsername] = useState("default");
  const [rides, setRides] = useState({ driverRides: [], passengerRides: [] });
  const [rideFilter, setRideFilter] = useState("driver");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      fetchRideIds(savedUsername);
    }
  }, []);

  const handleStartRide = async (rideId) => {
    try {
      const response = await startRide(rideId, new Date().toISOString);
      console.log(response);

      navigate("/my-rides", { state: { key: Date.now() } });
    } catch (error) {
      // Show an error message to the user
      alert("Failed to start ride: " + error);
      console.error("Failed to start ride:", error);
    }
  };

  const handleCompleteRide = async (rideId) => {
    try {
      const response = await completeRide(rideId, new Date().toISOString);
      console.log(response);

      navigate("/ride-history");
    } catch (error) {
      // Show an error message to the user
      alert("Failed to complete ride: " + error);
      console.error("Failed to complete ride:", error);
    }
  };

  const handleInRideChat = async (rideId) => {
    navigate("/chat", { state: { rideId: rideId } });
  };

  const fetchRideIds = async (currentUsername) => {
    const response = await fetch(
      `http://localhost:8090/reviews/${currentUsername}/rides`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} message: ${response.statusText}`
      );
    }

    const res = await response.json();
    const now = new Date();
    const filteredDriverRides = res.data.driverRides.filter(
      (ride) => ride.status === "CREATED" || ride.status === "IN_PROGRESS"
    );
    const filteredPassengerRides = res.data.passengerRides.filter(
      (ride) => new Date(ride.startTime) >= now
    );
    console.log(res.data);
    setRides({
      driverRides: filteredDriverRides,
      passengerRides: filteredPassengerRides,
    });
  };

  return (
    <>
      <Header />
      <select
        value={rideFilter}
        onChange={(e) => setRideFilter(e.target.value)}
      >
        <option value="passenger">Passenger Rides</option>
        <option value="driver">Driver Rides</option>
      </select>
      <div className="ride-list">
        {rides[rideFilter + "Rides"].map((ride, index) => (
          <RideCard
            key={ride.rideId}
            ride={ride}
            myRidePage={true}
            handleStartRide={() => handleStartRide(ride.rideId)}
            handleCompleteRide={() => handleCompleteRide(ride.rideId)}
            handleInRideChat={() => handleInRideChat(ride.rideId)}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MyRidePage;
