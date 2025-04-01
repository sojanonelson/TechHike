import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./components/contact";
import Navbar from "./components/navbar";
import Services from "./components/service";
import Dashboard from "./pages/Dashboard";

import AuthPage from "./pages/Authentication";


function App() {
  return (
    <Router>
      <div className="min-h-screen">
       <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
