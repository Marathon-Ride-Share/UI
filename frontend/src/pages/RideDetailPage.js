import mapboxgl from "mapbox-gl";
import {useEffect, useRef} from "react";

const RideDetail = () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpZGlpaSIsImEiOiJjbHVpcWY1dGgwNzZpMmpwNW40ZnkydGdhIn0.C24gOW_hYKPR8m8LWXqDsQ';

    const mapContainer = useRef(null);
    const map = useRef(null);


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
                    console.log("他们的 什么东西",data.routes[0].geometry)
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


    return (
        <div className="ride-detail">
            <div className="ride-map" ref={mapContainer} />
            <div className="ride-info">
                <div className="ride-info-entry">
                    <div className="address-entry">{ride.destination.locationName}</div>
                    <div className="date-time-entry">{formatDate(ride.endTime)}</div>
                    <div className="price-entry">${ride.price}</div>
                </div>
                <div className="review-action">
                    <button>Review</button>
                </div>
            </div>
        </div>
    );

}

export default RideDetail;