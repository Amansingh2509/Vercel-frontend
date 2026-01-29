import React, { useState } from "react";
import {
  Upload,
  X,
  Home,
  MapPin,
  DollarSign,
  Shield,
  Star,
  Camera,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useProperty } from "../contexts/PropertyContext";

const AddPropertyEnhanced = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    areaUnit: "sqft",
    furnished: "",
    securityDeposit: "",
    maintenanceCharges: "",
    amenities: [],
    parking: "",
    parkingType: "",
    images: [],
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    ownerAlternatePhone: "",
    ownerAddress: "",
    propertyAge: "",
    floorNumber: "",
    totalFloors: "",
    facingDirection: "",
    waterSupply: "",
    electricity: "",
    roomType: "",
    availableFrom: "",
    qrPaymentScreenshot: null,
    securityDepositPaid: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuth();
  const { addProperty } = useProperty();

  const amenityOptions = [
    "WiFi",
    "Parking",
    "Swimming Pool",
    "Gym",
    "Security",
    "Garden",
    "Balcony",
    "Air Conditioning",
    "Heating",
    "Furnished",
    "Pet Friendly",
    "Elevator",
    "Power Backup",
    "Water Purifier",
    "Modular Kitchen",
    "Intercom",
    "Club House",
    "Play Area",
    "Park",
    "Shopping Center",
    "Hospital",
    "School",
    "Public Transport",
  ];

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleQRUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        qrPaymentScreenshot: file,
        securityDepositPaid: true,
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeQRImage = () => {
    setFormData((prev) => ({
      ...prev,
      qrPaymentScreenshot: null,
      securityDepositPaid: false,
    }));
  };

  const calculateSecurityDeposit = (price) => {
    if (!price) return 0;
    const rent = parseInt(price);
    return Math.round(rent * 0.3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      setError("You must be logged in to add a property.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((image) => {
            formDataToSend.append("images", image);
          });
        } else if (key === "amenities") {
          formDataToSend.append(
            "amenities",
            JSON.stringify(formData.amenities)
          );
        } else if (
          key === "qrPaymentScreenshot" &&
          formData.qrPaymentScreenshot
        ) {
          formDataToSend.append(
            "qrPaymentScreenshot",
            formData.qrPaymentScreenshot
          );
        } else if (
          key !== "qrPaymentScreenshot" &&
          key !== "securityDepositPaid"
        ) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const securityAmount = calculateSecurityDeposit(formData.price);
      formDataToSend.append(
        "securityDepositPaid",
        formData.securityDepositPaid
      );
      formDataToSend.append("securityDepositAmount", securityAmount);

      await addProperty(formDataToSend);
      setSuccess(true);

      // Reset form
      setFormData({
        type: "",
        title: "",
        description: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        areaUnit: "sqft",
        furnished: "",
        securityDeposit: "",
        maintenanceCharges: "",
        amenities: [],
        parking: "",
        parkingType: "",
        images: [],
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
        ownerAlternatePhone: "",
        ownerAddress: "",
        propertyAge: "",
        floorNumber: "",
        totalFloors: "",
        facingDirection: "",
        waterSupply: "",
        electricity: "",
        roomType: "",
        availableFrom: "",
        qrPaymentScreenshot: null,
        securityDepositPaid: false,
      });
      setCurrentStep(1);
    } catch (err) {
      setError(err.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center mb-6">
              <Home className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">
                Basic Property Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <label className="block text-sm font-semibold mb-3 text-blue-800">
                  <Home className="w-4 h-4 inline mr-2" />
                  Property Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="Bungalow">🏠 Bungalow</option>
                  <option value="Flat">🏢 Flat/Apartment</option>
                  <option value="Tenement">🏘️ Tenement</option>
                  <option value="Villa">🏡 Villa</option>
                  <option value="Studio">🎨 Studio</option>
                  <option value="Penthouse">🏙️ Penthouse</option>
                </select>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <label className="block text-sm font-semibold mb-3 text-purple-800">
                  🛏️ Room Type *
                </label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="1BHK">1 BHK</option>
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="4BHK">4 BHK</option>
                  <option value="Studio">Studio</option>
                  <option value="Single Room">Single Room</option>
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                ✨ Property Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                placeholder="e.g., Luxurious 3BHK Apartment with City View"
                required
              />
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <label className="block text-sm font-semibold mb-3 text-green-800">
                📝 Detailed Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-transparent transition-all duration-300"
                rows="6"
                placeholder="Describe your property's features, amenities, nearby facilities, transportation access, and unique selling points..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <label className="block text-sm font-semibold mb-3 text-orange-800">
                  🏗️ Property Age
                </label>
                <select
                  name="propertyAge"
                  value={formData.propertyAge}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select Property Age</option>
                  <option value="New Construction">New Construction</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-5 years">1-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
                <label className="block text-sm font-semibold mb-3 text-pink-800">
                  📅 Available From
                </label>
                <input
                  type="date"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">
                Location & Contact Details
              </h3>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl mb-6">
              <h4 className="font-bold text-blue-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                📍 Property Location
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-blue-700">
                    Complete Address *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                    placeholder="Full address including street, area, city, state, and PIN code"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <h4 className="font-bold text-green-800 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2" />
                👤 Owner Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-green-700">
                    👑 Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-transparent transition-all duration-300"
                    placeholder="Full Name as per ID proof"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-green-700">
                    📞 Primary Phone *
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-transparent transition-all duration-300"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-green-700">
                    📱 Alternate Phone
                  </label>
                  <input
                    type="tel"
                    name="ownerAlternatePhone"
                    value={formData.ownerAlternatePhone}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-transparent transition-all duration-300"
                    placeholder="+91 9876543211"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-green-700">
                    📧 Email Address *
                  </label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-transparent transition-all duration-300"
                    placeholder="owner@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-green-700">
                  🏠 Owner Permanent Address
                </label>
                <textarea
                  name="ownerAddress"
                  value={formData.ownerAddress}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-transparent transition-all duration-300"
                  rows="4"
                  placeholder="Permanent residential address of the property owner..."
                />
              </div>
            </div>
          </div>
        );

      // Other steps would follow similar enhanced patterns...

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            🏠 Add Your Property
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            List your property with detailed information and attract quality
            tenants
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">
          {/* Progress steps and form rendering */}
          <div className="mb-10">
            <div className="flex justify-between items-center relative">
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 -translate-y-1/2 -z-10 rounded-full"></div>
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-14 h-14 rounded-full border-4 border-white shadow-xl transform transition-all duration-500 ${
                    currentStep >= step
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110 shadow-blue-200"
                      : "bg-gray-100 text-gray-400"
                  } ${
                    currentStep === step
                      ? "ring-4 ring-blue-300 ring-opacity-60 animate-pulse"
                      : ""
                  }`}
                >
                  <span className="font-bold text-lg">{step}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              {[
                "Basic Info",
                "Location & Contact",
                "Specifications",
                "Security",
                "Amenities",
              ].map((label, index) => (
                <span
                  key={index}
                  className={`text-sm font-semibold ${
                    currentStep >= index + 1 ? "text-blue-600" : "text-gray-400"
                  } transition-all duration-300`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}

            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span>←</span>
                <span>Previous</span>
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-teal-600 disabled:opacity-50 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Adding Property...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>Publish Property</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md text-center transform animate-bounceIn">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">
              Your property has been listed successfully!
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPropertyEnhanced;
