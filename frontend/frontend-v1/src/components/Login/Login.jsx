import React, { useState } from "react";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material"; // Import MUI Alert & Snackbar
import { Link } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:44374/api/Auth/login", {
        email,
        password,
      });

      console.log("API Response:", response);

      if (response.data.isSuccessed) {
        console.log("Access Token:", response.data.data.accessToken); 

        setAlert({ open: true, message: "Login successful!", severity: "success" });

        localStorage.setItem("accessToken", response.data.data.accessToken);

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      } else {
        setAlert({ open: true, message: "Invalid credentials!", severity: "error" });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setAlert({ open: true, message: "Login failed! Check your credentials.", severity: "error" });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-600">Get started today</h1>
        <p className="text-center text-gray-500 mt-2">Sign in to your account</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            className="w-full border p-4 rounded-lg"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border p-4 rounded-lg"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="w-full bg-gray-600 text-white p-3 rounded-lg">
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
        No account?
        <Link to='/signup' className="underline">Sign up</Link>
        </p>
        </form>
      </div>

      <Snackbar
        open={alert.open}
        autoHideDuration={2000} 
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
