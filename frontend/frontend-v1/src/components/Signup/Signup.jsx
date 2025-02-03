import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:44374/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      
      if (data.isSuccessed) {
        setAlert({ open: true, message: 'Signup successful! Redirecting...', severity: 'success' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setAlert({ open: true, message: data.message || 'Signup failed!', severity: 'error' });
      }
    } catch (error) {
      setAlert({ open: true, message: 'An error occurred!', severity: 'error' });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-gray-300 p-10 rounded-lg shadow-2xl">
        <h1 className="text-center text-3xl font-extrabold text-gray-800">Track Every Penny, Secure Your Future</h1>
        <p className="text-center text-gray-600 mt-2">Create an account to start managing your expenses efficiently</p>

        <form onSubmit={handleSignup} className="mt-6 space-y-6">
          <input
            type="text"
            className="w-full border border-gray-500 bg-white text-gray-900 p-4 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none shadow-sm"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full border border-gray-500 bg-white text-gray-900 p-4 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none shadow-sm"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border border-gray-500 bg-white text-gray-900 p-4 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none shadow-sm"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold p-3 rounded-lg shadow-md transition duration-300">
            Sign Up
          </button>
        </form>
      </div>
      
      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
