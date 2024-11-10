import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import HomePage from './Pages/HomePage'
import { UserProvider } from './context/Usercontext';
import { PublicRoute,ProtectedRoute } from './Guards'
import PrayerTimingSet from './Pages/PrayerTimingSet'
import AnalogClockWithPrayerTimings from './Pages/AnalogClock'
function App() {
  return(
    <>
    <UserProvider>
      <BrowserRouter>
      <Routes>
    <Route
        path="/"
        element={
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        }
    />
    <Route
        path="/signup"
        element={
            <PublicRoute>
                <SignUpPage />
            </PublicRoute>
        }
    />
    <Route
        path="/home"
        element={
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        }
    />
    <Route
        path="/setprayertiming"
        element={
            <ProtectedRoute>
                <PrayerTimingSet />
            </ProtectedRoute>
        }
    />
    <Route
        path="/displayclock"
        element={
            <ProtectedRoute>
                <AnalogClockWithPrayerTimings />
            </ProtectedRoute>
        }
    />
</Routes>

      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App
