import React from 'react';
import '../../css/Footer.css'; // Your CSS file path
import homeLogo from '../../images/home.png';
import menuLogo from '../../images/menu.png';
import orderLogo from '../../images/order.png';
import userLogo from '../../images/user.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className="footer-bar">
      <div className="footer-item">
        <img src={homeLogo} alt="home" className="footer-icon" onClick={() => navigate('/ride-share')}/>
        <div className="footer-text">Home</div>
      </div>

      <div className="footer-item">
      <img src={menuLogo} alt="home" className="footer-icon"  onClick={() => navigate('/ride-history')}/>
        <div className="footer-text">Services</div>
      </div>
      <div className="footer-item">
      <img src={orderLogo} alt="home" className="footer-icon" onClick={() => navigate('/ride-share')}/>
        <div className="footer-text">Activity</div>
      </div>
      <div className="footer-item">
      <img src={userLogo} alt="home" className="footer-icon" onClick={() => navigate('/user-profile')}/>
        <div className="footer-text">Account</div>
      </div>
    </div>
  );
};


export default Footer;
