import React, { useEffect, useState } from "react"; // 导入 React 和 useEffect
import mapboxgl from "mapbox-gl"; // 导入 mapboxgl
import "../css/RideHistory.css";
import RideEntry from "../components/common/RideEntry";
import RideCard from "../components/common/RideCard";

import rides from "../services/mockData";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import DriverRideEntry from "../components/common/DriverRideEntry";
import PassengerRideEntry from "../components/common/PassengerRideEntry";

const MyRidePage = () => {
  const [username, setUsername] = useState("default");
  const [rides, setRides] = useState({ driverRides: [], passengerRides: [] });
  const [rideFilter, setRideFilter] = useState("driver"); // 默认显示 driver rides

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      fetchRideIds(savedUsername); // 直接用更新后的用户名发起请求
    }
  }, []);

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
      (ride) => new Date(ride.startTime) > now
    );
    const filteredPassengerRides = res.data.passengerRides.filter(
      (ride) => new Date(ride.startTime) > now
    );
    setRides({
      driverRides: filteredDriverRides,
      passengerRides: filteredPassengerRides,
    });
    // console.log("response", res.data.driverRides);
    // var driverRides = res.data.driverRides;
    // var passengerRides = res.data.passengerRides;
    // setRides(res.data.driverRides); // 假设response.json()的返回是正确的格式
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
        {rides[rideFilter + "Rides"].map((ride, index) =>
          rideFilter === "passenger" ? (
            <PassengerRideEntry
              key={ride.rideId}
              ride={ride}
              className="ride-entry-card"
            />
          ) : (
            <DriverRideEntry
              key={ride.rideId}
              ride={ride}
              className="ride-entry-card"
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyRidePage;
