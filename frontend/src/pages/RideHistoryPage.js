import React, { useEffect } from 'react'; // 导入 React 和 useEffect
import mapboxgl from 'mapbox-gl'; // 导入 mapboxgl
import '../css/RideHistory.css';
import RideEntry from '../components/common/RideEntry';
import RideCard from '../components/common/RideCard';

import rides  from '../services/mockData';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const RideHistory = () => {
    return (
        <>
            <Header />
            <div className="ride-history">
                <div className='ride-list'>
                {rides.map((ride, index) => (
                    index === 0 ? (
                        <RideCard
                            key={ride.rideId}
                            ride={ride}
                            className = "ride-history-card"
                        />
                    ) : (
                        <RideEntry
                            key={ride.rideId}
                            ride={ride}
                            className = "ride-entry-card"
                        />
                    )
                ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RideHistory;
