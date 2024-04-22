import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import RideShareLandingPage from "./pages/rideShare/RideShareLandingPage";
import OriginPage from "./pages/rideShare/OriginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const isAuthenticated = () => {
    // You should replace this with actual authentication logic
    return localStorage.getItem("user");
  };

  return (
      <Router>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/*<Route path="/register" element={<RegisterPage />} />*/}
            <Route path="/welcome" element={<WelcomePage />} />
            {/* Add other routes for other pages as needed */}
            <Route path="/register" element={<RegisterPage />} />
            {/* Add other routes for other pages as needed */}
              <Route path="/ride-share" element={<RideShareLandingPage />} />
              <Route path="/origin" element={<OriginPage />} />
                {/*<Route path="/destination" element={<DestinationPage />} />*/}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
