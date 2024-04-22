import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'; 

const RegistrationForm = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    carMake: '',
    carModel: '',
    carColor: '',
    driversLicenseNumber: '',
    licensePlateNumber: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process formValues here, like sending to an API
    navigate('/login'); 
    console.log(formValues);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Car Make</label>
          <input
            type="text"
            name="carMake"
            value={formValues.carMake}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Car Model</label>
          <input
            type="text"
            name="carModel"
            value={formValues.carModel}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Car Color</label>
          <input
            type="text"
            name="carColor"
            value={formValues.carColor}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Driver's License Number</label>
          <input
            type="text"
            name="driversLicenseNumber"
            value={formValues.driversLicenseNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>License Plate Number</label>
          <input
            type="text"
            name="licensePlateNumber"
            value={formValues.licensePlateNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
