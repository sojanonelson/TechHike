// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import Home from "./pages/Home";
import Contact from "./components/contact";
import Navbar from "./components/navbar";
import Services from "./components/service";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/Authentication";
import About from "./pages/About";
import RequestManagement from "./pages/RequestManagement";


function App() {
  const { user } = useSelector((state) => state.user); // Access user from Redux state

  useEffect(() => {
    if (user) {
      console.log("Logged-in user name from Redux in App.js:", user.name);
    } else {
      console.log("No user logged in (App.js)");
    }
  }, [user]); // Re-run effect when user changes

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;