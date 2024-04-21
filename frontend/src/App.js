import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Header from "./components/common/Header";
// import Footer from "./components/common/Footer";
import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"; // Assuming you have some global styles

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
          </Routes>
        </div>
      </Router>
  );
}

export default App;
