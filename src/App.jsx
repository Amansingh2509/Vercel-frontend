import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties.jsx";
import PropertyDetails from "./pages/PropertyBookingEnhanced.jsx";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AddProperty from "./pages/AddProperty";
import PropertyImages from "./pages/PropertyImages";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <Routes>
        {/* 🔓 Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* 🔒 Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property-images"
          element={
            <ProtectedRoute>
              <PropertyImages />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
