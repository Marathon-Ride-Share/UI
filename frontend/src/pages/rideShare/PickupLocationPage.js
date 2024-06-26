import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { findRidesNearby } from "../../services/rideShareService";
import DatePicker from "react-datepicker";
import { SearchRidesRequest } from "../../models/RideShareModels";
import { Modal, ListGroup } from "react-bootstrap";
import OfferEntry from "../../components/common/OfferEntry";
import RideCard from "../../components/common/RideCard";
const RidesModal = ({
  showModal,
  setShowModal,
  navigateToRide,
  rides,
  locationDetails,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Rides Nearby</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ride-history">
          <div className='ride-list'>
            {rides?.length > 0 ?
                rides.map((ride, index) => (
                        <OfferEntry
                            key={ride.rideId}
                            ride={ride}
                            location={locationDetails}
                            className="ride-entry-card"
                        />
                    )
                ) : (
                    <p>No Rides!</p>
                )}
          </div>
        </div>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

mapboxgl.accessToken =
    "pk.eyJ1IjoiaGVpZGlpaSIsImEiOiJjbHVpcWY1dGgwNzZpMmpwNW40ZnkydGdhIn0.C24gOW_hYKPR8m8LWXqDsQ";

const PickupLocationPage = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [pickupTime, setPickupTime] = useState(new Date());
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [locationDetails, setLocationDetails] = useState({
    latitude: 0,
    longitude: 0,
    locationName: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    if (!coords) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coords.lng, coords.lat],
      zoom: 14,
    });
    new mapboxgl.Marker()
      .setLngLat([coords.lng, coords.lat])
      .addTo(map.current);
  }, [coords]);

  const handleAddPickupLocation = () => {
    if (!pickupLocation) {
      setErrorMessage("Please enter a pickup location.");
      return;
    }
    const geocoderUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      pickupLocation
    )}.json?access_token=${mapboxgl.accessToken}`;
    fetch(geocoderUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length > 0) {
          const newCoords = {
            lng: data.features[0].center[0],
            lat: data.features[0].center[1],
          };
          console.log("NEW PICKUP")
          setCoords(newCoords);
          setLocationDetails({
            latitude: newCoords.lat,
            longitude: newCoords.lng,
            locationName: pickupLocation,
          });
          setErrorMessage("");
        } else {
          setErrorMessage("Enter a valid pickup location!");
          setCoords(null);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Failed to geocode location.");
        setCoords(null);
      });
  };

  const handleGetRidesNearby = async () => {
    try {
      console.log("in");
      const searchRequest = new SearchRidesRequest(
        locationDetails,
        pickupTime.toISOString()
      );
      const response = await findRidesNearby(searchRequest);

      const username = localStorage.getItem("username");
      const filteredRides = response.rides.filter(
          (ride) => ride.driverInfo.driverName !== username &&
              !ride.passengers.some(passenger => passenger.passengerName === username)
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

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center p-3">
        <Container>
          <RidesModal
            rides={rides}
            showModal={showModal}
            setShowModal={setShowModal}
            locationDetails={locationDetails}
            navigateToRide={(rideId) => {
              // navigation logic to ride details page
              console.log("Navigate to ride with ID:", rideId);
              // navigate(`/ride-details/${rideId}`);
            }}
          />
          <Row className="align-items-center mb-2">
            <Col xs={9} md={10} lg={11}>
              <h1>Enter Pickup Location</h1>
            </Col>
            <Col xs={3} md={2} lg={1} className="text-end">
              <Button
                variant="secondary"
                onClick={() => navigate("/ride-share")}
              >
                Cancel
              </Button>
            </Col>
          </Row>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Pickup Time:
              </Form.Label>
              <Col sm="8">
                <DatePicker
                    selected={pickupTime}
                    onChange={(date) => setPickupTime(date)}
                    showTimeSelect
                    onChange={(date) => setPickupTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    wrapperClassName="datePicker"
                    timeIntervals={15}
                    timeCaption="time"
                    className="form-control"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    wrapperClassName="datePicker"
                    className="form-control"
                    minDate={new Date()} // This line ensures that only future dates can be selected
                />
              </Col>
            </Form.Group>
            <Row className="mb-4">
              <Col sm={9} className="mb-4">
                <Form.Control
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Enter pickup location"
                />
              </Col>
              <Col sm={3} className="d-flex justify-content-center">
                <Button onClick={handleAddPickupLocation} className="mx-2">
                  Add Location
                </Button>
              </Col>
            </Row>
          </Form>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {coords && (
            <>
              <div
                ref={mapContainer}
                className="w-100"
                style={{ height: "300px", marginTop: "20px" }}
              />
              <Button
                className="m-3"
                onClick={handleGetRidesNearby}
                disabled={!coords}
              >
                Get Rides Nearby
              </Button>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default PickupLocationPage;
