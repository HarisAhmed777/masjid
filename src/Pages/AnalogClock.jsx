import React, { useEffect, useState,useContext } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import axios from 'axios';
import { BaseUrl } from '../../BaseUrl';
import { UserContext } from '../context/Usercontext';
function AnalogClockWithPrayerTimings() {
    const { user } = useContext(UserContext);
    const email = user.email;
  const [time, setTime] = useState(new Date());
  const [todayTimings, setTodayTimings] = useState(null);

  // Get today's date in DD-MM-YYYY format
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
//   console.log(formattedToday);

  // Update clock time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch today's prayer timings from the backend
  useEffect(() => {
    const fetchTodayPrayerTimings = async () => {
      try {
        console.log("trying to get data");
        const response = await axios.post(`${BaseUrl}/v1/prayertimings/today`, {
          email, // Pass the user's email
          today: formattedToday, // Pass today's date in DD-MM-YYYY format
        });
        setTodayTimings(response.data.timings);
      } catch (error) {
        console.error("Error fetching today's prayer timings:", error);
      }
    };

    if (email) {
      fetchTodayPrayerTimings();
    }
  }, [email, formattedToday]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {/* Analog Clock Half */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Clock
          value={time}
          size={200} // Customize the clock size
          hourHandWidth={6} // Customize hour hand width
          minuteHandWidth={4} // Customize minute hand width
          renderNumbers={true} // Show numbers on the clock
        />
      </div>

      {/* Prayer Timings Half */}
      <div style={{ flex: 1, paddingLeft: '20px' }}>
        <h3>Today's Prayer Timings</h3>
        {todayTimings ? (
          <ul>
            {Object.entries(todayTimings).map(([prayer, timing]) => (
              <li key={prayer}>
                <strong>{prayer}</strong>: {timing}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading prayer timings...</p>
        )}
      </div>
    </div>
  );
}

export default AnalogClockWithPrayerTimings;
