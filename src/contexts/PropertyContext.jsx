import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "./AuthContext";

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const { user, getValidToken, refreshToken } = useAuth();
  const [properties, setProperties] = useState([]);

  const fetchAllProperties = async () => {
    try {
      const response = await api.get("/properties");
      setProperties(response.data);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    }
  };

  const fetchOwnerProperties = async (ownerId) => {
    try {
      const response = await api.get(`/properties/owner/${ownerId}`);
      setProperties(response.data);
    } catch (error) {
      console.error("Failed to fetch owner properties", error);
    }
  };

  useEffect(() => {
    if (user?.userType === "Property Owner") {
      fetchOwnerProperties(user.id);
    } else {
      fetchAllProperties();
    }
  }, [user]);

  const addProperty = async (propertyData) => {
    try {
      // Get a valid token (check expiration and refresh if needed)
      const token = await getValidToken();

      if (!token) {
        throw new Error("No valid authentication token available");
      }

      const response = await api.post("/properties", propertyData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setProperties((prevProperties) => [...prevProperties, response.data]);
      return response.data;
    } catch (error) {
      console.error("Failed to add property", error);

      // If it's an authentication error, try to refresh token and retry once
      if (error.response?.status === 401) {
        try {
          const newToken = await refreshToken();
          if (newToken) {
            const retryResponse = await api.post("/properties", propertyData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${newToken}`,
              },
              withCredentials: true,
            });
            setProperties((prevProperties) => [
              ...prevProperties,
              retryResponse.data,
            ]);
            return retryResponse.data;
          }
        } catch (retryError) {
          console.error("Retry failed after token refresh:", retryError);
        }
      }

      throw error;
    }
  };

  const value = {
    properties,
    addProperty,
    fetchAllProperties,
    fetchOwnerProperties,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
