import React, { useState, useEffect } from 'react';
import Labelandinput from '../components/labelandinput';
import Button from '../components/Button';
import axios from 'axios';
import { BaseUrl } from '../../BaseUrl';

function SignUpPage() {
    const [formdata, setFormData] = useState({
        masjidname: '',
        email: '',
        password: '',
        latitude: '',
        longitude: '',
    });

    const [locationName, setLocationName] = useState('');

    // Handle change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formdata,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BaseUrl}/v1/signup/newuser`, formdata);
            console.log('User signed up successfully:', response.data);
            alert("SIgnup successful")
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    // Function to fetch location name based on latitude and longitude
    const fetchLocationName = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            setLocationName(response.data.locality || 'Location not found');
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    // UseEffect to fetch location name whenever latitude or longitude changes
    useEffect(() => {
        if (formdata.latitude && formdata.longitude) {
            fetchLocationName(formdata.latitude, formdata.longitude);
        }
    }, [formdata.latitude, formdata.longitude]);

    return (
        <div className='h-[100vh] flex flex-col items-center justify-center'>
            <form
                className='bg-gray-400 p-3 w-96'
                onSubmit={handleSubmit}
            >
                <h2 className='text-3xl text-center'>Sign Up</h2>
                <Labelandinput
                    label='Masjid Name'
                    name='masjidname'
                    type='text'
                    labelclass='text-xl mb-2'
                    value={formdata.masjidname}
                    onChange={handleChange}
                />
                <Labelandinput
                    label='Email'
                    name='email'
                    type='email'
                    labelclass='text-xl mb-2'
                    value={formdata.email}
                    onChange={handleChange}
                />
                <Labelandinput
                    label='Password'
                    name='password'
                    type='password'
                    labelclass='text-xl mb-2'
                    value={formdata.password}
                    onChange={handleChange}
                />
                <p>Enter Location</p>
                <Labelandinput
                    label='Latitude'
                    name='latitude'
                    type='text'
                    labelclass='text-xl mb-2'
                    value={formdata.latitude}
                    onChange={handleChange}
                />
                <Labelandinput
                    label='Longitude'
                    name='longitude'
                    type='text'
                    labelclass='text-xl mb-2'
                    value={formdata.longitude}
                    onChange={handleChange}
                />
                {locationName && <p>Location Name: {locationName}</p>}
                <div className='text-center'>
                    <Button name='Submit' bgcolor='bg-green-500' onclick={handleSubmit} />
                </div>
            </form>
            <p className='mt-3'>
                Already Have an Account: <span className='text-blue-500'>Login</span>
            </p>
        </div>
    );
}

export default SignUpPage;
