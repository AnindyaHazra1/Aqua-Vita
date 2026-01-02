import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            try {
                const res = await fetch('http://localhost:5000/api/auth/me', {
                    headers: {
                        'x-auth-token': localStorage.token
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    dispatch({ type: 'USER_LOADED', payload: data });
                } else {
                    dispatch({ type: 'AUTH_ERROR' });
                }
            } catch (err) {
                dispatch({ type: 'AUTH_ERROR' });
            }
        } else {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    // Register User
    const register = async (formData) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                dispatch({ type: 'REGISTER_SUCCESS', payload: data });
                loadUser(); // Load user immediately after token is set
            } else {
                localStorage.removeItem('token');
                dispatch({ type: 'REGISTER_FAIL', payload: data.msg });
            }
        } catch (err) {
            dispatch({ type: 'REGISTER_FAIL', payload: err.message });
        }
    };

    // Login User
    const login = async (formData) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                dispatch({ type: 'LOGIN_SUCCESS', payload: data });
                loadUser();
            } else {
                localStorage.removeItem('token');
                dispatch({ type: 'LOGIN_FAIL', payload: data.msg });
            }
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.message });
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    // Clear Errors
    const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
