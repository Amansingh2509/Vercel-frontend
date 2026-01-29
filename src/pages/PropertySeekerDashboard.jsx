import React from "react";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, Bed, Bath, Square } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useProperty } from "../contexts/PropertyContext";

const PropertySeekerDashboard = () => {
  const { user } = useAuth();
  const { properties } = useProperty();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState({
    type: "",
    location: "",
    maxPrice: "",
    bedrooms: "",
  });

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type ? property.type === filters.type : true;
    const matchesLocation = filters.location
      ? property.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesPrice = filters.maxPrice
      ? property.price <= parseInt(filters.maxPrice)
      : true;
    const matchesBedrooms = filters.bedrooms
      ? property.bedrooms === parseInt(filters.bedrooms)
      : true;
    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesPrice &&
      matchesBedrooms
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Find your perfect home from our latest listings
        </p>
      </div>

      {/* Quick Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Property Type</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Flat">Flat</option>
            <option value="Tenement">Tenement</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Bedrooms"
            value={filters.bedrooms}
            onChange={(e) =>
              setFilters({ ...filters, bedrooms: e.target.value })
            }
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Link
            to="/properties"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recommended Properties */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Recommended for You
              </h2>
              <Link
                to="/properties"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.length === 0 ? (
                <p>No properties found.</p>
              ) : (
                filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={
                          (property.images && property.images[0]) ||
                          "https://via.placeholder.com/400x200"
                        }
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        {property.type}
                      </div>
                      <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-medium">
                          {property.rating}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex justify-between items-center mb-3 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Bed className="h-3 w-3" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bath className="h-3 w-3" />
                          <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Square className="h-3 w-3" />
                          <span>{property.area} sq ft</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-600">
                          ₹{property.price.toLocaleString()}/mo
                        </span>
                        <Link
                          to={`/property/${property.id}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/properties"
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Browse All Properties
              </Link>
              <Link
                to="/services"
                className="block w-full bg-teal-600 text-white text-center py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors text-sm"
              >
                Our Services
              </Link>
              <Link
                to="/contact"
                className="block w-full border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Search Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Search Tips
            </h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Use specific location names for better results</li>
              <li>• Set your budget range to filter properties</li>
              <li>• Save properties you like for easy access</li>
              <li>• Contact owners directly through our platform</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySeekerDashboard;
