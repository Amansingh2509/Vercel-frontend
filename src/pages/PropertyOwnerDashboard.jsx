import React from "react";
import { Link } from "react-router-dom";
import { useProperty } from "../contexts/PropertyContext";
import { MapPin, Bed, Bath, Square, Star } from "lucide-react";

const PropertyOwnerDashboard = () => {
  const { properties } = useProperty();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Property Owner Dashboard
        </h1>

        <div className="mb-8">
          <Link
            to="/add-property"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <p>No properties added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={
                    (property.images && property.images[0]) ||
                    "https://via.placeholder.com/400x200"
                  }
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {property.title}
                  </h2>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      <Bed size={16} />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath size={16} />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Square size={16} />
                      <span>{property.area} sq ft</span>
                    </div>
                  </div>
                  <p className="text-gray-800 font-semibold mb-2">
                    Rent: ₹{property.price}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400" />
                    <span>{property.rating || "No rating"}</span>
                  </div>
                  <p className="mt-2 font-medium">
                    Booking Status:{" "}
                    <span className="text-green-600">Not Booked</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyOwnerDashboard;
