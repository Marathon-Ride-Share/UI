import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import { CreateRideRequest } from "../../models/RideShareModels";
import { createRide } from "../../services/rideShareService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateRidePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originLocation, destinationLocation } = location.state;

  const [startTime, setStartTime] = useState(new Date()); // Initialize with the current date
  const [price, setPrice] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");

  const handleCreateRideSubmit = async () => {
    const rideDetails = new CreateRideRequest(
      localStorage.getItem("username"),
      // 'lakshmeesravya', // for temporary testing
      originLocation,
      destinationLocation,
      startTime.toISOString(),
      parseFloat(price),
      parseInt(availableSeats, 10)
    );

    try {
      const response = await createRide(rideDetails);
      console.log(response);

      navigate("/my-rides", { state: { rideDetails: response.ride } });
    } catch (error) {
      // Show an error message to the user
      alert("Failed to create ride: " + error);
      console.error("Failed to create ride:", error);
      //   navigate("/ride-share");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className="text-center mb-3">Create Your Ride</h1>
            <p>
              <strong>Origin:</strong> {originLocation.locationName}
            </p>
            <p>
              <strong>Destination:</strong> {destinationLocation.locationName}
            </p>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Start Time:
                </Form.Label>
                <Col sm="8">
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    wrapperClassName="datePicker"
                    className="form-control"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Available Seats</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  step="1"
                  value={availableSeats}
                  onChange={(e) => setAvailableSeats(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={handleCreateRideSubmit}
                >
                  Create Ride
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/ride-share")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default CreateRidePage;
