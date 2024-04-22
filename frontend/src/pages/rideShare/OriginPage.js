import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpZGlpaSIsImEiOiJjbHVpcWY1dGgwNzZpMmpwNW40ZnkydGdhIn0.C24gOW_hYKPR8m8LWXqDsQ'; // Replace with your actual token

const OriginPage = () => {
    const [origin, setOrigin] = useState('');
    const [coords, setCoords] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const mapContainer = useRef(null);
    const map = useRef(null);

    // Initialize map once coordinates are available
    useEffect(() => {
        if (!coords) return; // Don't initialize the map until we have coordinates

        // Initialize the map and add a marker at the fetched coordinates
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [coords.lng, coords.lat],
            zoom: 14
        });

        new mapboxgl.Marker()
            .setLngLat([coords.lng, coords.lat])
            .addTo(map.current);

    }, [coords]); // Dependency on coords

    const handleAddOrigin = () => {
        if (!origin) {
            setErrorMessage("Please enter a location name.");
            return;
        }

        const geocoderUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(origin)}.json?access_token=${mapboxgl.accessToken}`;

        fetch(geocoderUrl)
            .then(response => response.json())
            .then(data => {
                if (data.features.length > 0) {
                    const newCoords = { lng: data.features[0].center[0], lat: data.features[0].center[1] };
                    setCoords(newCoords);
                    setErrorMessage('');
                } else {
                    setErrorMessage("Enter a valid location!");
                    setCoords(null); // Ensure no map is shown
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage("Failed to geocode location.");
                setCoords(null);
            });
    };

    const handleNext = () => {
        navigate('/destination', { state: { origin: origin, coords: coords } });
    };

    return (
        <div>
            <h1>Enter Origin</h1>
            <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Enter origin location"
            />
            <button onClick={handleAddOrigin}>Add Origin</button>
            <button onClick={() => navigate('/')}>Cancel</button>
            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
            {coords && (
                <>
                    <div ref={mapContainer} style={{ height: '300px' }} />
                    <button onClick={handleNext} disabled={!coords}>Next</button>
                </>
            )}
        </div>
    );
};

export default OriginPage;
