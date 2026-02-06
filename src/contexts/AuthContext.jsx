import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

// Use environment variable for API base URL in production
const getApiBaseUrl = () => {
  // Check for environment variable (set in Vercel)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, use relative URL (proxy handles it)
  if (import.meta.env.DEV) {
    return "";
  }
  // Default to your Vercel backend URL
  return "https://vercel-backend-dgf8.vercel.app";
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    console.log("Loading state set to false");
    console.log("User authenticated:", !!user);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Attempting login with:", { email, password });
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        console.log("Login response data:", data);
        const userData = {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          userType: data.user.userType,
          token: data.token,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Function to refresh token
  const refreshToken = async () => {
    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          const updatedUser = { ...user, token: data.token };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          localStorage.setItem("token", data.token);
          return data.token;
        }
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
    return null;
  };

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  // Function to get valid token (checks expiration and refreshes if needed)
  const getValidToken = async () => {
    const currentToken = user?.token || localStorage.getItem("token");
    if (!currentToken || isTokenExpired(currentToken)) {
      const newToken = await refreshToken();
      return newToken || currentToken;
    }
    return currentToken;
  };

  const register = async (name, email, password, userType) => {
    try {
      console.log("Attempting registration with:", { name, email, userType });
      const apiBaseUrl = getApiBaseUrl();

      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, userType }),
      });

      console.log("Registration response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        return {
          success: true,
          message: data.message || "Registration successful",
        };
      } else {
        let errorMessage = "Registration failed";
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message || `Registration failed: ${response.status}`;
        } catch (jsonError) {
          console.error("Failed to parse error response:", jsonError);
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }

        console.error("Registration failed:", errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("Registration network error:", error);

      // Handle different types of network errors
      let errorMessage = "Network error - please check your connection";

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage =
          "Cannot connect to server - please ensure the backend is running on port 5002";
      } else if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        errorMessage =
          "Connection failed - please check if the server is running";
      } else if (error.message.includes("NetworkError")) {
        errorMessage = "Network error - please check your internet connection";
      }

      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    register,
    logout,
    refreshToken,
    getValidToken,
    isTokenExpired,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
