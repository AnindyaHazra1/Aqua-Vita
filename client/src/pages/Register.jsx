import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated, loading } = authContext;
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = user;
    const [localError, setLocalError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        setLocalError('');
        if (password !== confirmPassword) {
            setLocalError('Passwords do not match');
        } else {
            register({
                name,
                email,
                password
            });
        }
    };

    return (
        <div className="auth-container">
            <div className={`auth-card reveal-up ${isVisible ? 'active' : ''}`}>
                <div className="auth-header">
                    <h2>Join Aqua Vita</h2>
                    <p>Create your account for exclusive access</p>
                </div>

                {(error || localError) && (
                    <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center', border: '1px solid #c62828' }}>
                        <strong>Registration Failed:</strong> {localError || error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </div>
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
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                            minLength="6"
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div className="auth-footer">
                    Already have an account?
                    <Link to="/login" className="auth-link" onClick={() => clearErrors()}>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
