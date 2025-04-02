import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Contact from "./components/contact";
import Navbar from "./components/navbar";
import Services from "./components/service";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/Authentication";
import About from "./pages/About";
import RequestManagement from "./pages/RequestManagement";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem('token'); // Check for token in localStorage

  useEffect(() => {
    if (!token) { // If no token in localStorage
      alert("Please log in to use this service.");
      navigate('/login'); // Redirect to login
    }
  }, [token, navigate]);

  // If token exists, render the children (Dashboard); otherwise, redirect
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      console.log("Logged-in user name from Redux in App.js:", user.name);
    } else {
      console.log("No user logged in (App.js)");
    }
  }, [user]);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;