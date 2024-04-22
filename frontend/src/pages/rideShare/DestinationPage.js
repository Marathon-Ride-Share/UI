import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpZGlpaSIsImEiOiJjbHVpcWY1dGgwNzZpMmpwNW40ZnkydGdhIn0.C24gOW_hYKPR8m8LWXqDsQ';
const DestinationPage = () => {
    const [destination, setDestination] = useState('');
    const [coords, setCoords] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state)
    const originLocation = location.state.originLocation;
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [destinationLocation, setDestinationLocation] = useState({
        latitude: 0,
        longitude: 0,
        locationName: ''
    });

    useEffect(() => {
        if (!coords) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [coords.lng, coords.lat],
            zoom: 14
        });
        new mapboxgl.Marker()
            .setLngLat([coords.lng, coords.lat])
            .addTo(map.current);
    }, [coords]);

    const handleAddDestination = () => {
        if (!destination) {
            setErrorMessage("Please enter a location name.");
            return;
        }
        const geocoderUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destination)}.json?access_token=${mapboxgl.accessToken}`;
        fetch(geocoderUrl)
            .then(response => response.json())
            .then(data => {
                if (data.features.length > 0) {
                    const newCoords = { lng: data.features[0].center[0], lat: data.features[0].center[1] };
                    setCoords(newCoords);
                    destinationLocation.latitude = newCoords.lat;
                    destinationLocation.longitude = newCoords.lng;
                    destinationLocation.locationName = destination;
                    console.log(originLocation, destinationLocation)
                    setErrorMessage('');
                } else {
                    setErrorMessage("Enter a valid location!");
                    setCoords(null);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage("Failed to geocode location.");
                setCoords(null);
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/>
            <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center p-3">
                <Container>
                    <Row className="align-items-center mb-2">
                        <Col xs={9} md={10} lg={11}>
                            <h1>Enter Destination</h1>
                        </Col>
                        <Col xs={3} md={2} lg={1} className="text-end">
                            <Button variant="secondary" onClick={() => navigate('/ride-share')}>Cancel</Button>
                        </Col>
                    </Row>
                    <Form>
                        <Row className="mb-4">
                            <Col sm={9} className="mb-4">
                                <Form.Control
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Enter destination location"
                                />
                            </Col>
                            <Col sm={3} className="d-flex justify-content-center">
                                <Button onClick={handleAddDestination} className="mx-2">Add Destination</Button>
                            </Col>
                        </Row>
                    </Form>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    {coords && (
                        <>
                            <div ref={mapContainer} className="w-100" style={{height: '300px', marginTop: '20px'}}/>
                            <Button className="mt-3"
                                    onClick={() => navigate('/create-ride', { state: { originLocation, destinationLocation } })}
                                    disabled={!coords}>
                                Next
                            </Button>
                        </>
                    )}
                </Container>
            </main>
            <Footer/>
        </div>
    );
};

export default DestinationPage;
