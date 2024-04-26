import React, { useEffect, useRef, useState } from "react";
import "../../css/RideCard.css";
import mapboxgl from "mapbox-gl";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

const RideCard = ({
  ride,
  onReviewClick,
  myRidePage,
  handleStartRide,
  handleCompleteRide,
  handleInRideChat,
}) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGVpZGlpaSIsImEiOiJjbHVpcWY1dGgwNzZpMmpwNW40ZnkydGdhIn0.C24gOW_hYKPR8m8LWXqDsQ";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState("default");
  const [isPassenger, setIsPassenger] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername);
    setIsPassenger(savedUsername !== ride.driverInfo.driverName);
    console.log("savedUsername", savedUsername);
    console.log("ride.driverId", ride.driverInfo.driverName);
  }, [ride.driverId]);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [
        (ride.origin.longitude + ride.destination.longitude) / 2,
        (ride.origin.latitude + ride.destination.latitude) / 2,
      ], // 初始中心点为起点和终点的中间位置
      zoom: 12,
    });

    // map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on("load", () => {
      // 添加起点Marker
      new mapboxgl.Marker()
        .setLngLat([ride.origin.longitude, ride.origin.latitude])
        .addTo(map.current);
      // 添加终点Marker
      new mapboxgl.Marker()
        .setLngLat([ride.destination.longitude, ride.destination.latitude])
        .addTo(map.current);

      // 请求路径数据并绘制路径
      const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${ride.origin.longitude},${ride.origin.latitude};${ride.destination.longitude},${ride.destination.latitude}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
      console.log("directionsRequest", directionsRequest);
      fetch(directionsRequest)
        .then((response) => response.json())
        .then((data) => {
          const route = data.routes[0].geometry;
          map.current.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: route,
            },
          });

          map.current.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#1db7dd",
              "line-width": 8,
            },
          });
        });
    });

    return () => map.current.remove();
  }, [ride]); // 依赖于ride的变化

  const onReview = () => {
    console.log("Rating ride:", ride._id); // Example action
    alert(`Rating for ride ID: ${ride._id}`);
  };

  const onDetailClick = () => {
    navigate(`/ride-detail`, { state: { ride } }); // Navigate with state
  };

  return (
    <div className="ride-card">
      <div className="map-container">
        <div
          id="map"
          style={{ width: "100%", height: "100%" }}
          ref={mapContainer}
        ></div>
      </div>
      <div className="ride-info">
        <div className="address">{ride.destination.locationName}</div>
        <div className="date-time">{formatDate(ride.startTime)}</div>
        <div className="price">${ride.price}</div>
      </div>
      {/* Only render the "Review" button if the user is not the driver */}
      {!myRidePage && isPassenger && (
        <div className="review-btn" onClick={onReviewClick}>
          ⭐Review
        </div>
      )}
      {myRidePage && !isPassenger && ride.status === "CREATED" && (
        <div className="start-btn" onClick={handleStartRide}>
          Start
        </div>
      )}
      {myRidePage && !isPassenger && ride.status === "IN_PROGRESS" && (
        <div className="complete-btn" onClick={handleCompleteRide}>
          Complete
        </div>
      )}
      {myRidePage && (
        <div className="chat-btn" onClick={handleInRideChat}>
          Chat
        </div>
      )}
      {!myRidePage && (
        <div className="review-btn" onClick={onDetailClick}>
          Detail
        </div>
      )}
    </div>
  );
};

RideCard.defaultProps = {
  onReviewClick: () => {}, // Default review function that does nothing
  handleStartRide: () => {}, // Default start ride function that does nothing
  handleCompleteRide: () => {}, // Default complete ride function that does nothing
  handleInRideChat: () => {}, // Default chat function that does nothing
  myRidePage: false, // Default value is false
};

export default RideCard;
