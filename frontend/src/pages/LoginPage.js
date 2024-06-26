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
            const res = await fetch('http://localhost:8090/users/login', {
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

            const token = res.headers.get('Authorization');
            // Access headers from response
            const headers = res.headers;

            // Iterate over headers
            headers.forEach((value, name) => {
                console.log(`${name}: ${value}`);
            });

            // localStorage.setItem('token', token);
            localStorage.setItem('username', data.username);

            localStorage.setItem('isDriver', data.isDriver);
            navigate('/ride-share');
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
                        <button
                            type="button" // 更改为button以防止默认的表单提交行为
                            className="btn btn-primary"
                            onClick={handleLogin} // 直接设置onClick事件处理器
                        >Log In
                        </button>
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
