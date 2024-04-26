import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

const RideShareLandingPage = () => {
  const navigate = useNavigate();

  // Retrieve isDriver from localStorage and parse it to a boolean
  const isDriver = localStorage.getItem("isDriver") === "true";

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center p-3">
          <div className="w-100" style={{maxWidth: "320px"}}>
              {" "}
              {/* Constrain the width for better aesthetics */}
              {/* Render the "Share Your Ride" button if isDriver is true */}
              <div className=" text-center">
                  <h1 className="display-4">Welcome to Marathon Ride Share App!</h1>
                  <p className="lead">Your journey starts here.</p>
              </div>
              {isDriver && (
                  <button
                      onClick={() => navigate("/origin")}
                      className="btn btn-primary btn-lg mb-2 w-100" // w-100 for full width, btn-lg for larger size
                  >
                      Share Your Ride
                  </button>
              )}
              <button
                  onClick={() => navigate("/pickup")}
                  className="btn btn-secondary btn-lg mb-2 w-100" // w-100 for full width, btn-lg for larger size
              >
                  Browse Rides
              </button>
              <button
                  onClick={() => navigate("/my-rides")}
                  className="btn btn-info btn-lg w-100" // w-100 for full width, btn-lg for larger size
              >
                  My Rides
              </button>
          </div>
      </main>
        <Footer/>
    </div>
  );
};

export default RideShareLandingPage;
