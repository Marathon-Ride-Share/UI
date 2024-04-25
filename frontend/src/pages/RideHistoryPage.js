import React, {useEffect, useState} from 'react'; // 导入 React 和 useEffect
import mapboxgl from 'mapbox-gl'; // 导入 mapboxgl
import '../css/RideHistory.css';
import RideEntry from '../components/common/RideEntry';
import RideCard from '../components/common/RideCard';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Modal from 'react-modal'; // Import this only if you installed react-modal


const RideHistory = () => {
    const [username, setUsername] = useState('default');
    const [rides, setRides] = useState({ driverRides: [], passengerRides: [] });
    const [rideFilter, setRideFilter] = useState('driver');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentRide, setCurrentRide] = useState(null);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');


    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
            fetchRideIds(savedUsername);
        }
    }, []);

    const fetchRideIds = async (currentUsername) => {
        const response = await fetch(`http://localhost:8090/reviews/${currentUsername}/rides`, {
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
        const now = new Date();
        const filteredDriverRides = res.data.driverRides.filter(ride => new Date(ride.startTime) < now);
        const filteredPassengerRides = res.data.passengerRides.filter(ride => new Date(ride.startTime) < now);
        setRides({
            driverRides: filteredDriverRides,
            passengerRides: filteredPassengerRides
        });
    }

    const openModal = (ride) => {
        setCurrentRide(ride);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setRating('');
        setComment('');
    };

    const handleReviewSubmit = async () => {
        if (rating === '' || comment.trim() === '') {
            alert('Please select a rating and fill in your comment.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8090/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: username, // Assuming you have a 'username' state variable for userId
                    rideId: currentRide.rideId,
                    comment: comment,
                    rating: parseInt(rating), // Ensure rating is sent as a number if backend expects a number
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log('Review submitted:', data);
            // Handle successful submission, e.g., show a success message
            closeModal();
        } catch (error) {
            console.error('Failed to submit review:', error);
            // Handle errors, e.g., show an error message
        }
    };


    return (
        <>
            <Header />
            <select value={rideFilter} onChange={e => setRideFilter(e.target.value)}>
                <option value="passenger">Passenger Rides</option>
                <option value="driver">Driver Rides</option>
            </select>
            <div className='ride-list'>
                {rides[rideFilter + 'Rides'].map((ride, index) => (
                    <RideCard
                        key={ride.rideId}
                        ride={ride}
                        onReviewClick={() => openModal(ride)}
                        // onDetailClick={() => console.log('Detail ride:', ride.rideId)}
                    />
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Review Ride"
                // Inline styles or define your CSS classes
            >
                <h2>Review Ride</h2>
                <label>
                    Rating:
                    <select value={rating} onChange={e => setRating(e.target.value)}>
                        <option value="">Select a rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    Comment:
                    <textarea value={comment} onChange={e => setComment(e.target.value)} />
                </label>
                <button onClick={handleReviewSubmit}>Submit Review</button>
                <button onClick={closeModal}>Close</button>
            </Modal>
            <Footer />
        </>
    );
};


export default RideHistory;
