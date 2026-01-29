import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PropertyImages = () => {
  const properties = [
    {
      id: 1,
      title: "Elegant 3BHK Bungalow in Alkapuri",
      image: "https://source.unsplash.com/featured/?house,bungalow,1",
      price: 42000,
    },
    {
      id: 2,
      title: "Modern 2BHK Flat near Gotri Road",
      image: "https://source.unsplash.com/featured/?apartment,2",
      price: 23000,
    },
    {
      id: 3,
      title: "Cozy 1BHK Tenement in Manjalpur",
      image: "https://source.unsplash.com/featured/?house,3",
      price: 12000,
    },
    {
      id: 4,
      title: "Spacious 4BHK Bungalow in Old Padra Road",
      image: "https://source.unsplash.com/featured/?bungalow,4",
      price: 55000,
    },
    {
      id: 5,
      title: "3BHK Flat with Club Access in Karelibaug",
      image: "https://source.unsplash.com/featured/?apartment,5",
      price: 32000,
    },
    {
      id: 6,
      title: "Affordable 2BHK in Akota",
      image: "https://source.unsplash.com/featured/?tenement,6",
      price: 15000,
    },
    {
      id: 7,
      title: "Luxury Penthouse in Race Course",
      image: "https://source.unsplash.com/featured/?penthouse,7",
      price: 60000,
    },
    {
      id: 8,
      title: "1RK Studio near Ajwa Road",
      image: "https://source.unsplash.com/featured/?studio,8",
      price: 8000,
    },
    {
      id: 9,
      title: "2BHK in Subhanpura with Balcony",
      image: "https://source.unsplash.com/featured/?balcony,9",
      price: 21000,
    },
    {
      id: 10,
      title: "Independent House in Waghodia Road",
      image: "https://source.unsplash.com/featured/?house,10",
      price: 18000,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Property Images Gallery
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <img
                src={
                  (property.images && property.images[0]) ||
                  "https://via.placeholder.com/400x200"
                }
                alt={property.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {property.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">
                    ₹{property.price.toLocaleString()}
                  </span>
                  <Link
                    to={`/property/${property.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <span>Purchase</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyImages;
