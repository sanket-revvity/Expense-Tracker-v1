import React, { useState } from "react";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    } else if (
      !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)
    ) {
      newErrors.password =
        "Password must contain at least one letter, one number, and one special character";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://localhost:44374/api/Auth/login",
        { email, password }
      );

      if (response.data.isSuccessed) {
        setAlert({
          open: true,
          message: "Login successful!",
          severity: "success",
        });
        localStorage.setItem("accessToken", response.data.data.accessToken);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setAlert({
          open: true,
          message: "Invalid credentials!",
          severity: "error",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Login failed! Check your credentials.",
        severity: "error",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="max-w-md w-full bg-white/90 p-8 rounded-2xl shadow-xl border border-gray-300 backdrop-blur-md">
        <h1 className="text-center text-3xl font-semibold text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-600 mt-2">Sign in to continue</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              className="w-full border p-4 rounded-lg focus:outline-none focus:ring-2 bg-gray-100"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateForm}
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              className="w-full border p-4 rounded-lg focus:outline-none focus:ring-2 bg-gray-100"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validateForm}
              required
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-all duration-300 ease-in-out"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-600">
            No account?{" "}
            <Link
              to="/signup"
              className="text-gray-800 font-semibold underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
