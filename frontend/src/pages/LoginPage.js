import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!res.ok) {
                throw await res.json(); // Assumes server sends an error object
            }

            const data = await res.json();

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('expiresIn', data.expiresIn);
            localStorage.setItem()
        navigate('/welcome'); 
        } catch (e) {
            console.log(e);
        };
    }

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
                            id="passwo`rd"
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
