// src/RouteGuards.js
import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './context/Usercontext';
import { jwtDecode }from 'jwt-decode';

// Function to validate the token expiration
const isTokenValid = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
};

// PublicRoute component for non-protected routes (login, signup)
export const PublicRoute = ({ children }) => {
    const { user, setUserFromToken, clearUserDetails } = useContext(UserContext);
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && isTokenValid(token)) {
            setUserFromToken(token);
        } else {
            clearUserDetails();
        }
    }, []); // Removed dependencies to avoid continuous updates

    if (user.token && isTokenValid(user.token)) {
        return <Navigate to="/home" />;
    }

    return children;
};

// ProtectedRoute component for protected routes (home, dashboard)
export const ProtectedRoute = ({ children }) => {
    const { user, setUserFromToken, clearUserDetails } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && isTokenValid(token)) {
            setUserFromToken(token);
        } else {
            clearUserDetails();
        }
    }, []); // Removed dependencies to avoid continuous updates

    if (!user.token || !isTokenValid(user.token)) {
        return <Navigate to="/" />;
    }

    return children;
};

