import React from "react";
import { useAuth } from "../contexts/AuthContext";
import PropertySeekerDashboard from "./PropertySeekerDashboard";
import PropertyOwnerDashboard from "./PropertyOwnerDashboard";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.userType === "Property Seeker" ? (
        <PropertySeekerDashboard />
      ) : (
        <PropertyOwnerDashboard />
      )}
    </div>
  );
};

export default Dashboard;
