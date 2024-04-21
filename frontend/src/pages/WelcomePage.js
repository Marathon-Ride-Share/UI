import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../css/WelcomePage.css';

const WelcomePage = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main role="main" className="flex-shrink-0 mt-5">
                <div className="container text-center">
                    <h1 className="display-4">Welcome to Marathon Ride Share App!</h1>
                    <p className="lead">Your journey starts here.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default WelcomePage;

