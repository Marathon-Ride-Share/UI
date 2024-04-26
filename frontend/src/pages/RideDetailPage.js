import mapboxgl from "mapbox-gl";
import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {formatDate} from "../utils/formatDate";
import '../css/RideDetail.css';
import driverImg from '../images/driver.png';
import ReviewEntry from "../components/common/ReviewEntry";



const RideDetail = () => {

  const location = useLocation(); // To access the passed state
  const [username, setUsername] = useState('default');
  const ride = location.state.ride; // Accessing the ride object passed as state
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [reviews, setReviewss] = useState({reviews: []});
  const navigate = useNavigate(); // Using useNavigate instead of useHistory


  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpZGlpaSIsImEiOiJjbHVpcWY1dGgwNzZpMmpwNW40ZnkydGdhIn0.C24gOW_hYKPR8m8LWXqDsQ';


  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        (ride.origin.longitude + ride.destination.longitude) / 2,
        (ride.origin.latitude + ride.destination.latitude) / 2,
      ], // 初始中心点为起点和终点的中间位置
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl());


    map.current.on('load', () => {
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
      fetch(directionsRequest)
          .then(response => response.json())
          .then(data => {
            const route = data.routes[0].geometry;
            map.current.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: route
              }
            });

            map.current.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#1db7dd',
                'line-width': 8
              }
            });
          });
    });

    return () => map.current.remove();
  }, [ride]); // 依赖于ride的变化

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      fetchReviews(ride.rideId);
    }
  }, []);


  const fetchReviews = async (rideId) => {
    const response = await fetch(`http://localhost:8090/reviews/${rideId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
          `HTTP error! status: ${response.status} message: ${response.statusText}`
      );
    }

    const res = await response.json();
    setReviewss(res.data.reviews);
    console.log("response", res.data.reviews);
  }

  const onCloseClick = () => {
    navigate(`/ride-history`); // Navigate with state
  };

  const onDelete = async (reviewId,userId) => {
    const response = await fetch(`http://localhost:8090/reviews/${reviewId}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
          `HTTP error! status: ${response.status} message: ${response.statusText}`
      );
    }

    console.log("delete review response", response);

    window.location.reload();
  };


  return (
      <div className="ride-detail-container">
        <div className="ride-detail-header">
          <button onClick={() => {onCloseClick()}}>X
          </button>
          <h1>Ride Details</h1>
        </div>
        <div className="ride-map" ref={mapContainer}></div>
        <div className="ride-info">
          <img src={driverImg} alt="Driver" className="driver-img"/>
          <div className="ride-meta">
            <div className="ride-with">Ride with {ride.driverInfo.driverName}</div>
            <div className="ride-time">{formatDate(ride.startTime)}</div>
            <div className="ride-price">{`$${ride.price}`}</div>
          </div>
        </div>
        <div className="ride-address">
          <span>Origin: {ride.origin.locationName}</span>
          <span>Destination: {ride.destination.locationName}</span>
        </div>
        <div className="review-list">
          {reviews.length > 0 ? reviews.map((review) => (
              <ReviewEntry key={review.reviewId} review={review} onDelete={onDelete}/>
          )) : <p>No reviews available.</p>}
        </div>
      </div>
  );

};


export default RideDetail;