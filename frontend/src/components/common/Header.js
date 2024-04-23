import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import carLogo from '../../images/app-logo.png'; // Path to your logo image
import { BsList } from 'react-icons/bs'; // Make sure you've installed `react-icons`

const Header = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid justify-content-between">
                <a className="navbar-brand" href="/">
                    <img src={carLogo} alt="Car Logo" width="30" height="30" />
                </a>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        <BsList /> {/* This uses a list icon from react-icons */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate('/ride-share')}>Ride Share</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/ride-history')}>Ride History</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/user-profile')}>User Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/inride-chat')}>InRide Chat</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/payment-info')}>Payment Info</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
    );
};

export default Header;
