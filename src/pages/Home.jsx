import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Building,
  Home as HomeIcon,
  Users,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const services = [
    {
      icon: <Building className="h-8 w-8" />,
      title: "Property Management",
      description:
        "Complete property management solutions for landlords and tenants",
    },
    {
      icon: <HomeIcon className="h-8 w-8" />,
      title: "Home Solutions",
      description: "End-to-end home rental assistance",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Tiffin Services",
      description: "Delicious and nutritious home-cooked meals delivered daily",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24 overflow-hidden">
        {/* Background images */}
        <img
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Background"
          className="absolute top-0 left-0 w-1/3 h-full object-cover opacity-20 blur-sm"
        />
        <img
          src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Background"
          className="absolute top-0 right-0 w-1/3 h-full object-cover opacity-20 blur-sm"
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Find Your Perfect{" "}
            <span className="text-yellow-400">Rental Home</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Discover premium rental properties including bungalows, flats, and
            tenements in Vadodara.
          </p>
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by location, property type..."
              className="flex-1 px-4 py-3 rounded border border-black-300  text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <select className="flex-1 px-4 py-3 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option>Property Type</option>
              <option>Bungalow</option>
              <option>Flat</option>
              <option>Tenement</option>
            </select>
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition"
            >
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative images */}
        <img
          src="https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Decorative"
          className="absolute top-10 left-10 w-48 opacity-20 rounded-lg shadow-lg"
        />
        <img
          src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Decorative"
          className="absolute bottom-10 right-10 w-56 opacity-20 rounded-lg shadow-lg"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 animate-fadeInUp">
            About RoomRental
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 animate-fadeInUp">
            RoomRental is your trusted platform for finding and listing rental
            properties in Vadodara. Whether you are a property owner or a
            seeker, we provide comprehensive rental solutions to make your
            rental experience seamless and rewarding.
          </p>
          <div className="flex justify-center space-x-10">
            <div className="bg-white p-8 rounded-xl shadow-lg w-72 transform transition-transform duration-500 hover:rotate-y-12 hover:scale-105 animate-fadeInUp">
              <Building className="h-14 w-14 text-blue-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-3">Wide Selection</h3>
              <p className="text-gray-600">
                Explore a wide range of rental properties including bungalows,
                flats, and tenements.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg w-72 transform transition-transform duration-500 hover:rotate-y-12 hover:scale-105 animate-fadeInUp delay-100">
              <Users className="h-14 w-14 text-teal-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-3">Trusted Community</h3>
              <p className="text-gray-600">
                Connect with verified landlords and tenants for a safe rental
                experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg w-72 transform transition-transform duration-500 hover:rotate-y-12 hover:scale-105 animate-fadeInUp delay-200">
              <HomeIcon className="h-14 w-14 text-purple-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Get professional advice and assistance throughout your rental
                journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-10">
            Comprehensive rental property solutions for all your needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg p-8 text-white flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">
              Looking for a Rental Home?
            </h3>
            <p className="mb-6">
              Find your perfect rental property from our extensive collection of
              bungalows, flats, and tenements.
            </p>
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition w-max"
            >
              Browse Properties
            </Link>
          </div>
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-8 text-white flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">Own a Rental Property?</h3>
            <p className="mb-6">
              List your rental property with us and connect with verified
              tenants. Get maximum returns on your investment.
            </p>
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition w-max"
            >
              {isAuthenticated && user?.userType === "owner"
                ? "List Your Property"
                : "Get Started"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
