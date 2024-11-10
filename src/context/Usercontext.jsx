// src/contexts/UserContext.js
import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        token: '',
    });

    // Function to set user details
    const setUserDetails = (email, token) => {
        setUser({ email, token });
    };

    // Function to set user from token
    // src/contexts/UserContext.js
const setUserFromToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        // Make sure the decodedToken contains an email
        if (decodedToken.email) {
            setUser({ email: decodedToken.email, token });
        } else {
            console.error('Email is missing in the decoded token:', decodedToken);
            clearUserDetails();
        }
    } catch (error) {
        console.error('Invalid token:', error);
        clearUserDetails();
    }
};


    // Function to clear user information
    const clearUserDetails = () => {
        setUser({ email: '', token: '' });
    };

    return (
        <UserContext.Provider value={{ user, setUserDetails, setUserFromToken, clearUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};
