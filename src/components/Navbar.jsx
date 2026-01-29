import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Menu, X, User, Plus, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/properties", label: "Properties" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                RoomRental
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path) ? "text-blue-600 bg-blue-50" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                {user?.userType === "Property Owner" && (
                  <Link
                    to="/add-property"
                    className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>List Property</span>
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm">
                    Welcome, {user?.name} (
                    {user?.userType === "Property Seeker"
                      ? "Property Seeker"
                      : "Property Owner"}
                    )
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 ${
                    isActive(link.path) ? "text-blue-600 bg-blue-50" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  {user?.userType === "Property Owner" && (
                    <Link
                      to="/add-property"
                      className="block px-3 py-2 rounded-md text-base font-medium bg-teal-600 text-white hover:bg-teal-700 mx-3"
                      onClick={() => setIsOpen(false)}
                    >
                      List Property
                    </Link>
                  )}
                  <div className="px-3 py-2 mx-3">
                    <p className="text-gray-700 text-sm mb-2">
                      Welcome, {user?.name} (
                      {user?.userType === "Property Seeker"
                        ? "Seeker"
                        : "Owner"}
                      )
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 mx-3 mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
