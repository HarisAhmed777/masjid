// src/pages/LoginPage.js
import React, { useState, useContext, useEffect } from 'react';
import Labelandinput from '../components/labelandinput';
import Button from '../components/Button';
import axios from 'axios';
import { BaseUrl } from '../../BaseUrl';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { UserContext } from '../context/Usercontext';

function LoginPage() {
    const [formdata, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setUserDetails, setUserFromToken } = useContext(UserContext);

    // Check if token is present in localStorage on component mount
    
                // Check token expiration
                    // If token is valid, set user details from token

    // Handle change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formdata,
            [name]: value,
        });
    };

    // Function to handle form submission
    // In LoginPage.js, handleSubmit function
const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message
    try {
        const response = await axios.post(`${BaseUrl}/v1/user/login`, formdata);
        const { token } = response.data;
        const decodedToken = jwtDecode(token);

        // Set user email and token in context
        setUserDetails(decodedToken.email, token);
        
        // Save the token in localStorage
        localStorage.setItem('authToken', token);

        console.log('User logged in successfully:', response.data);
        navigate('/home'); // Redirect to home page
    } catch (error) {
        console.error('Error logging in:', error);
        setErrorMessage('Invalid email or password');
    }
};


    return (
        <div className='h-[100vh] flex flex-col items-center justify-center'>
            <div className='bg-gray-400 p-3 w-96'>
                <h2 className='text-3xl mb-2 text-center'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <Labelandinput
                        type='text'
                        label='Email'
                        name='email'
                        value={formdata.email}
                        labelclass='text-xl mb-2'
                        onChange={handleChange}
                    />
                    <Labelandinput
                        type='password'
                        label='Password'
                        name='password'
                        value={formdata.password}
                        labelclass='text-xl mb-2'
                        onChange={handleChange}
                    />
                    <div className='flex items-center justify-between'>
                        <Button name='Login' bgcolor='bg-green-400' />
                        <p className='text-blue-600'>Forgot Password?</p>
                    </div>
                    {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
                </form>
            </div>
            <p className='mt-3'>
                Don't have an account? <span className='text-blue-800'>Sign Up</span>
            </p>
        </div>
    );
}

export default LoginPage;
