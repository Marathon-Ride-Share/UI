import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

const RegistrationForm = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    make: '',
    model: '',
    color: '',
    plate_number: '',
    dl_info: '',
    rating: 0.0,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form values on submit:", formValues);
    try {
      const res = await fetch('http://localhost:8090/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) {
        const errorRes = await res.json();
        console.error("Failed to register:", errorRes);
        throw new Error('Failed to register user');
      }

      navigate('/');
      console.log("Registered successfully with:", formValues);
    } catch (error) {
      console.error("Error during the registration process:", error);
    }
  };

  return (
      <div>
        <h2>Register</h2>
        <h4>If you are a user, don't input license number, or you will become a driver</h4>
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
                name="make"
                value={formValues.make}
                onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Car Model</label>
            <input
                type="text"
                name="model"
                value={formValues.model}
                onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Car Color</label>
            <input
                type="text"
                name="color"
                value={formValues.color}
                onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Driver's License Number</label>
            <input
                type="text"
                name="dl_info"
                value={formValues.dl_info}
                onChange={handleInputChange}
            />
          </div>
          <div>
            <label>License Plate Number</label>
            <input
                type="text"
                name="plate_number"
                value={formValues.plate_number}
                onChange={handleInputChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
  );
};

export default RegistrationForm;
