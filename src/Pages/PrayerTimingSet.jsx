import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/Usercontext';
import { BaseUrl } from '../../BaseUrl';
import { useNavigate } from 'react-router-dom';

function PrayerTimingSet() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [prayerTimings, setPrayerTimings] = useState([]);
  const [timeAdjustments, setTimeAdjustments] = useState({
    Fajr: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Check if prayer timings already exist for the user
  useEffect(() => {
    const checkPrayerTimings = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/v1/prayertimings/check`, { email: user.email });
        if (response.data.exists) {
          // If timings exist, redirect to analog clock page
          navigate('/displayclock');
        }
      } catch (error) {
        console.error('Error checking prayer timings:', error);
      }
    };
  
    if (user.email) {
      checkPrayerTimings();
    }
  }, [user.email, navigate]);

  // Handle input changes for prayer time adjustments
  const handleTimeAdjustmentChange = (e) => {
    const { name, value } = e.target;
    setTimeAdjustments((prevAdjustments) => ({
      ...prevAdjustments,
      [name]: parseInt(value) || 0,
    }));
  };

  // Adjust and save the prayer times
  const applyAdjustments = async () => {
    const adjustedTimings = prayerTimings.map((day) => {
      const adjustTime = (time, adjustment) => {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes) + adjustment);
        return date.toTimeString().split(' ')[0].slice(0, 5);
      };

      return {
        ...day,
        timings: {
          ...day.timings,
          Fajr: adjustTime(day.timings.Fajr, timeAdjustments.Fajr),
          Dhuhr: adjustTime(day.timings.Dhuhr, timeAdjustments.Dhuhr),
          Asr: adjustTime(day.timings.Asr, timeAdjustments.Asr),
          Maghrib: adjustTime(day.timings.Maghrib, timeAdjustments.Maghrib),
          Isha: adjustTime(day.timings.Isha, timeAdjustments.Isha),
        },
      };
    });

    setPrayerTimings(adjustedTimings); // Update state to reflect adjusted timings
  };

  return (
    <div>
      <h2>Prayer Timings for the Year</h2>

      <h3>Adjust Prayer Times (in minutes)</h3>
      {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer) => (
        <label key={prayer}>
          {prayer}:
          <input
            type="number"
            name={prayer}
            value={timeAdjustments[prayer]}
            onChange={handleTimeAdjustmentChange}
          />
        </label>
      ))}
      <button onClick={applyAdjustments}>Apply Adjustments</button>

      {/* Display the updated prayer timings in a table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Fajr</th>
            <th>Dhuhr</th>
            <th>Asr</th>
            <th>Maghrib</th>
            <th>Isha</th>
          </tr>
        </thead>
        <tbody>
          {prayerTimings.length > 0 ? (
            prayerTimings.map((day, index) => (
              <tr key={index}>
                <td>{day.date.gregorian.date}</td>
                <td>{day.timings.Fajr}</td>
                <td>{day.timings.Dhuhr}</td>
                <td>{day.timings.Asr}</td>
                <td>{day.timings.Maghrib}</td>
                <td>{day.timings.Isha}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Loading prayer timings...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PrayerTimingSet;
