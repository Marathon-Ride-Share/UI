import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-2">
            <div>
                © {new Date().getFullYear()} Marathon Ride Share App. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
