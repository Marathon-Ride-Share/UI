// MapBoxMap.js
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpZGlpaSIsImEiOiJjbHVpcWY1dGgwNzZpMmpwNW40ZnkydGdhIn0.C24gOW_hYKPR8m8LWXqDsQ';

const MapBoxMap = ({ onOriginSelected, onDestinationSelected }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const originMarker = useRef(null);
    const destinationMarker = useRef(null);

    // Initialize map when component mounts
    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-122.4194, 37.7749], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        // Add navigation controls to the top right of the canvas
        map.current.addControl(new mapboxgl.NavigationControl());

        // Add click handler to allow for the placement of origin and destination markers
        map.current.on('click', (e) => {
            // If there is no origin marker yet, set the origin marker
            if (!originMarker.current) {
                originMarker.current = new mapboxgl.Marker({ color: 'green' })
                    .setLngLat([e.lngLat.lng, e.lngLat.lat])
                    .addTo(map.current);

                onOriginSelected({ lng: e.lngLat.lng, lat: e.lngLat.lat });
            }
            // If there is an origin but no destination marker, set the destination marker
            else if (!destinationMarker.current) {
                destinationMarker.current = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([e.lngLat.lng, e.lngLat.lat])
                    .addTo(map.current);

                onDestinationSelected({ lng: e.lngLat.lng, lat: e.lngLat.lat });
            }
        });

        return () => map.current.remove();
    }, []);

    return <div ref={mapContainer} className="map-container" style={{ height: '400px' }} />;
};

export default MapBoxMap;
