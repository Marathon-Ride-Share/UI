import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'; // Ensure this path correctly points to your CSS file

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        // Authentication logic here
        navigate('/welcome'); // Navigate after login
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1 className="mb-4">Marathon Ride Share</h1>
                <form onSubmit={handleLogin} className="w-100 mx-auto" style={{maxWidth: '320px'}}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/register')}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
