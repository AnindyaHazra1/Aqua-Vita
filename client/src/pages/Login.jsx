import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated, loading } = authContext;
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        if (isAuthenticated) {
            navigate('/profile'); // Redirect to profile on login
        }
        if (error) {
            // Error stays until cleared or new submission
        }
    }, [error, isAuthenticated, navigate]);

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            // Handle specific validation if needed
        } else {
            login({
                email,
                password
            });
        }
    };

    return (
        <div className="auth-container">
            <div className={`auth-card reveal-up ${isVisible ? 'active' : ''}`}>
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your premium account</p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center', border: '1px solid #c62828' }}>
                        <strong>Login Failed:</strong> {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <div className="auth-footer">
                    Don't have an account?
                    <Link to="/register" className="auth-link" onClick={() => clearErrors()}>Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
