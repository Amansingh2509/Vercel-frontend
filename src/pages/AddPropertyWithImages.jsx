import React, { useState } from "react";
import { Upload, X, Camera, Star } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useProperty } from "../contexts/PropertyContext";

const AddPropertyWithImages = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    amenities: [],
    images: [],
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
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
    if (formData.images.length + files.length > 10) {
      setError("Maximum 10 images allowed");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    if (currentImageIndex >= index) {
      setCurrentImageIndex(Math.max(0, currentImageIndex - 1));
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % formData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + formData.images.length) % formData.images.length
    );
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
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

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
        amenities: [],
        images: [],
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
      });
      setCurrentStep(1);
      setCurrentImageIndex(0);
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
              <h3 className="text-2xl font-bold text-gray-800">
                Basic Property Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Property Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Flat">Flat/Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Room Type *
                </label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="1BHK">1 BHK</option>
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="4BHK">4 BHK</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Property Title *
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

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange极速赛车开奖结果={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                rows="4"
                placeholder="Describe your property..."
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Location & Contact
              </h3>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Complete Address *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                placeholder="Full address including street, area, city, state, and PIN code"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Owner Name *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4极速赛车开奖结果 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  placeholder="+91 9876543210"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Email *
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  placeholder="owner@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Monthly Rent (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  placeholder="25000"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Specifications
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Bedrooms *
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  min="0"
                  placeholder="2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Bathrooms *
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  min="0"
                  placeholder="2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Carpet Area *
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                    placeholder="1000"
                    required
                  />
                  <select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleInputChange}
                    className="w-24 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  >
                    <option value="sqft">sqft</option>
                    <option value="sqm">sqm</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Furnishing Status *
                </label>
                <select
                  name="furnished"
                  value={formData.furnished}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Furnishing</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi Furnished">Semi Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center mb-6">
              <Star className="w-8 h-8 text-yellow-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">
                Amenities & Property Images
              </h3>
            </div>

            {/* Amenities Section */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl mb-8">
              <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                ⭐ Amenities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto custom-scrollbar p-2">
                {amenityOptions.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      formData.amenities.includes(amenity)
                        ? "bg-purple-200 border-2 border-purple-400 shadow-md"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="mr-3 w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Property Images Section */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                📸 Property Images
              </h4>

              {/* Image Upload Area */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-blue-700">
                  Upload Multiple Images (Max 10 images)
                </label>
                <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-300">
                  <Camera className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag & drop images here or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="property-images"
                  />
                  <label
                    htmlFor="property-images"
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-300 cursor-pointer inline-block"
                  >
                    Choose Images
                  </label>
                  <p className="text-xs text-gray-500 mt-3">
                    Supported formats: JPG, PNG, WEBP
                  </p>
                </div>
              </div>

              {/* Image Preview Gallery */}
              {formData.images.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-sm font-semib极速赛车开奖结果old text-gray-700 mb-4">
                    Uploaded Images ({formData.images.length}/10)
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group transform transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Property image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Image Carousel Preview */}
                  <div className="mt-6 bg-white p-4 rounded-xl shadow-inner">
                    <h6 className="text-sm font-semibold text-gray-700 mb-3">
                      Slideshow Preview
                    </h6>
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      {formData.images.length > 0 ? (
                        <div className="relative w-full h-full">
                          <img
                            src={URL.createObjectURL(
                              formData.images[currentImageIndex]
                            )}
                            alt={`Slide ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover transition-opacity duration-500"
                          />
                          {formData.images.length > 1 && (
                            <>
                              <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors duration-300"
                              >
                                ←
                              </button>
                              <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors duration-300"
                              >
                                →
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <Camera className="w-8 h-8 mr-2" />
                          No images uploaded yet
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center mt-3 space-x-2">
                      {formData.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-blue-500 scale-125"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Property
          </h1>
          <p className="text-gray-600">
            Complete all steps to list your property
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs">Basic Info</span>
              <span className="text-xs">Location</span>
              <span className="text-xs">Details</span>
              <span className="text-xs">Images</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Property"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyWithImages;
