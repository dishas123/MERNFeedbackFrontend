import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/feedback"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <Feedback />
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <Profile />
            </>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
