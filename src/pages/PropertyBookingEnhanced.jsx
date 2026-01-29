import React, { useState, useEffect } from "react";
import { FileText, CheckCircle, CreditCard, Scan } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PropertyBookingEnhanced = () => {
  const { id } = useParams();
  const { getValidToken } = useAuth();
  const [agreed, setAgreed] = useState(false);

  // New state for booking form
  const [renterName, setRenterName] = useState("");
  const [renterEmail, setRenterEmail] = useState("");
  const [renterPhone, setRenterPhone] = useState("");
  const [renterDocumentType, setRenterDocumentType] = useState("");
  const [renterDocumentNumber, setRenterDocumentNumber] = useState("");
  const [renterDocumentImage, setRenterDocumentImage] = useState(null);
  const [propertyId, setPropertyId] = useState("");

  React.useEffect(() => {
    console.log("propertyId state changed:", propertyId);
  }, [propertyId]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [properties, setProperties] = useState([]);

  // New state to hold submitted booking details
  const [submittedBooking, setSubmittedBooking] = useState(null);

  // New state for payment
  const [paymentProofImage, setPaymentProofImage] = useState(null);
  const [platformCharge, setPlatformCharge] = useState(0);

  useEffect(() => {
    // Fetch properties to populate dropdown
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        setProperties(response.data);

        // Validate id param and set propertyId only if it exists in fetched properties
        if (id && response.data.some((p) => p._id === id)) {
          setPropertyId(id);
          // Calculate platform charge for the selected property
          const selectedProperty = response.data.find((p) => p._id === id);
          if (selectedProperty && selectedProperty.price) {
            setPlatformCharge(selectedProperty.price * 0.3);
          }
        } else if (response.data.length > 0) {
          // Fallback: set propertyId to first property if id param invalid
          setPropertyId(response.data[0]._id);
          // Calculate platform charge for the first property
          if (response.data[0].price) {
            setPlatformCharge(response.data[0].price * 0.3);
          }
        }
        console.log("Properties fetched:", response.data);
        console.log("PropertyId set to:", propertyId);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      }
    };
    fetchProperties();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError("");

    console.log("Submitting booking with propertyId:", propertyId);
    if (!propertyId) {
      setBookingError("Please select a property.");
      return;
    }
    console.log({
      renterName,
      renterEmail,
      renterPhone,
      renterDocumentType,
      renterDocumentNumber,
      propertyId,
      additionalDetails,
      renterDocumentImage,
    });

    try {
      const formData = new FormData();
      formData.append("renterName", renterName);
      formData.append("renterEmail", renterEmail);
      formData.append("renterPhone", renterPhone);
      formData.append("renterDocumentType", renterDocumentType);
      formData.append("renterDocumentNumber", renterDocumentNumber);
      console.log("Appending propertyId to formData:", propertyId);
      formData.append("propertyId", propertyId ? propertyId.trim() : "");
      formData.append("additionalDetails", additionalDetails);
      if (renterDocumentImage) {
        formData.append("renterDocumentImage", renterDocumentImage);
      }
      if (paymentProofImage) {
        formData.append("paymentProofImage", paymentProofImage);
      }

      const token = await getValidToken();
      const response = await axios.post("/api/bookings/booking", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        setBookingSuccess(true);
        // Save submitted booking details for display
        setSubmittedBooking({
          renterName,
          renterEmail,
          renterPhone,
          renterDocumentType,
          renterDocumentNumber,
          propertyId,
          additionalDetails,
        });
      }
    } catch (error) {
      // Show backend error message if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setBookingError(error.response.data.message);
      } else {
        setBookingError("Failed to submit booking. Please try again.");
      }
    }
  };

  const handlePropertyChange = (e) => {
    const newPropertyId = e.target.value;
    setPropertyId(newPropertyId);
    console.log("PropertyId changed to:", newPropertyId);

    // Calculate platform charge for the selected property
    const selectedProperty = properties.find((p) => p._id === newPropertyId);
    if (selectedProperty && selectedProperty.price) {
      setPlatformCharge(selectedProperty.price * 0.3);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-2xl p-8 rounded-2xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center text-gray-800">
          <FileText className="mr-3 text-blue-600" size={32} />
          Rental Agreement
        </h1>

        <p className="text-gray-700 mb-6 text-center text-lg">
          This rental agreement outlines the terms and conditions for staying at
          the listed property. By proceeding, you agree to follow these rules
          during your tenancy.
        </p>

        <div className="space-y-4 text-sm text-gray-800 bg-green-50 p-6 rounded-xl border border-green-200">
          <p className="flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              1
            </span>
            A valid government ID proof is mandatory at the time of check-in.
          </p>
          <p className="flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              2
            </span>
            A security deposit (30% of rent) is required for our platform
            charge..
          </p>
          <p className="flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              3
            </span>
            No illegal activities or subletting is permitted on the property.
          </p>
          <p className="flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              4
            </span>
            Rent must be paid by the 5th of every month without delay.
          </p>
          <p className="flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              5
            </span>
            Property should be returned in good condition. Damages will be
            chargeable.
          </p>
          <p className="flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              6
            </span>
            Pets are not allowed on the property.
          </p>
          <p className="flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              7
            </span>
            Tenants must adhere to all community rules and regulations.
          </p>
          <p className="flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              8
            </span>
            Any damages caused by tenants will be deducted from the security
            deposit.
          </p>
        </div>

        {/* Platform Charge Payment Section */}
        <div className="mt-8 p-8 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500">
          <h2 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center justify-center">
            <span className="bg-yellow-400 p-3 rounded-full mr-4 shadow-lg">
              <CreditCard size={24} />
            </span>
            Platform Charge Payment
          </h2>

          <p className="text-yellow-700 mb-6 text-center text-xl font-semibold">
            A platform charge of{" "}
            <span className="text-yellow-800 font-bold">30%</span> of the rent
            is required to proceed with your booking
          </p>

          {/* Payment Amount Display */}
          <div className="bg-white p-6 rounded-2xl border-2 border-yellow-300 mb-6 shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="font-bold text-yellow-800 mb-4 text-center text-xl flex items-center justify-center">
              <span className="bg-yellow-100 p-2 rounded-full mr-3">💰</span>
              Payment Details
            </h3>
            <div className="space-y-3">
              <p className="text-yellow-700 flex justify-between items-center text-lg">
                <span className="font-semibold">Platform Charge:</span>
                <span className="bg-yellow-100 px-4 py-2 rounded-full text-yellow-800 font-bold">
                  30% of rent
                </span>
              </p>
              <p className="text-yellow-700 flex justify-between items-center text-lg">
                <span className="font-semibold">Amount to Pay:</span>
                <span className="bg-green-100 px-4 py-2 rounded-full text-green-800 font-bold text-xl">
                  ₹{platformCharge.toFixed(2)}
                </span>
              </p>
            </div>
            <p className="text-sm text-yellow-600 mt-4 text-center italic">
              Scan the QR code below to pay exactly ₹{platformCharge.toFixed(2)}
            </p>
          </div>

          {/* QR Code Display */}
          <div className="mb-6">
            <label className="block font-bold text-yellow-800 mb-4 text-xl flex items-center justify-center">
              <Scan className="mr-3" size={24} />
              Payment QR Code
            </label>
            <div className="bg-white p-6 border-2 border-yellow-300 rounded-2xl mb-4 shadow-xl hover:shadow-2xl transition-all duration-300">
              <p className="text-lg text-yellow-600 mb-4 text-center font-semibold">
                Scan this QR code to pay ₹{platformCharge.toFixed(2)}
              </p>
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src="/qr/PHOTO-2025-08-27-12-35-30.jpg"
                    alt="Payment QR Code - Scan to pay platform charge"
                    className="w-64 h-64 object-contain border-4 border-yellow-300 rounded-2xl mx-auto shadow-2xl hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <div className="absolute inset-0 border-4 border-yellow-400 rounded-2xl pointer-events-none animate-pulse"></div>
                </div>
                <div
                  className="bg-gray-100 p-6 rounded-2xl border-4 border-dashed border-gray-300 text-center mt-4"
                  style={{ display: "none" }}
                >
                  <p className="text-gray-500 text-lg">
                    QR code image not found. Please add your QR code image at
                    '/qr/images-1754677903803-643454743.png'
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-100 rounded-xl">
                <p className="text-lg text-yellow-700 text-center font-bold">
                  Amount to pay: ₹{platformCharge.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Proof Upload */}
          <div className="mb-4">
            <label className="block font-bold text-yellow-800 mb-4 text-xl">
              Upload Payment Proof Screenshot
            </label>
            <div className="bg-white p-6 border-2 border-yellow-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-lg text-yellow-600 mb-4 text-center">
                After making the payment, upload a screenshot of the successful
                transaction
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPaymentProofImage(e.target.files[0])}
                className="w-full border-2 border-yellow-300 rounded-xl px-4 py-3 bg-white text-lg hover:border-yellow-400 transition-colors duration-300"
              />
              {paymentProofImage && (
                <div className="mt-6 text-center">
                  <img
                    src={URL.createObjectURL(paymentProofImage)}
                    alt="Payment Proof"
                    className="max-h-60 object-contain border-2 border-yellow-300 rounded-xl mx-auto shadow-md"
                  />
                  <p className="text-lg text-green-600 mt-3 font-semibold">
                    ✅ Payment proof uploaded successfully
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {!agreed ? (
          <button
            onClick={() => setAgreed(true)}
            className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
          >
            📋 I Agree & Proceed to Booking
          </button>
        ) : bookingSuccess ? (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-2xl border-2 border-green-300">
            <p className="flex items-center text-green-700 font-bold text-xl mb-4 justify-center">
              <CheckCircle className="mr-3" size={28} />
              Booking submitted successfully!
            </p>
            <p className="text-gray-700 text-lg text-center">
              The property owner will contact you soon at your provided contact
              details.
            </p>
          </div>
        ) : submittedBooking ? (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-2xl border-2 border-green-300">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-800">
              Booking Details
            </h2>
            <div className="space-y-3 text-lg">
              <p>
                <strong>Name:</strong> {submittedBooking.renterName}
              </p>
              <p>
                <strong>Email:</strong> {submittedBooking.renterEmail}
              </p>
              <p>
                <strong>Phone:</strong> {submittedBooking.renterPhone}
              </p>
              <p>
                <strong>Document Type:</strong>{" "}
                {submittedBooking.renterDocumentType}
              </p>
              <p>
                <strong>Document Number:</strong>{" "}
                {submittedBooking.renterDocumentNumber}
              </p>
              <p>
                <strong>Additional Details:</strong>{" "}
                {submittedBooking.additionalDetails || "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="mt-8 space-y-6">
            {/* Form fields remain the same as original */}
            <div>
              <label
                className="block font-semibold mb-2 text-lg"
                htmlFor="renterName"
              >
                Full Name
              </label>
              <input
                id="renterName"
                type="text"
                value={renterName}
                onChange={(e) => setRenterName(e.target.value)}
                required
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg hover:border-blue-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 text-lg"
                htmlFor="renterEmail"
              >
                Email
              </label>
              <input
                id="renterEmail"
                type="email"
                value={renterEmail}
                onChange={(e) => setRenterEmail(e.target.value)}
                required
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg hover:border-blue-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 text-lg"
                htmlFor="renterPhone"
              >
                Phone Number
              </label>
              <input
                id="renterPhone"
                type="tel"
                value={renterPhone}
                onChange={(e) => setRenterPhone(e.target.value)}
                required
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg hover:border-blue-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 text-lg"
                htmlFor="renterDocumentType"
              >
                Document Type
              </label>
              <select
                id="renterDocumentType"
                value={renterDocumentType}
                onChange={(e) => setRenterDocumentType(e.target.value)}
                required
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg hover:border-blue-400 transition-colors duration-300"
              >
                <option value="">Select Document Type</option>
                <option value="Aadhar">Aadhar</option>
                <option value="PAN">PAN</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>

            <div>
              <label
                className="block font-semibold mb-2 text-lg"
                htmlFor="renterDocumentNumber"
              >
                Document Number
              </label>
              <input
                id="renterDocumentNumber"
                type="text"
                value={renterDocumentNumber}
                onChange={(e) => setRenterDocumentNumber(e.target.value)}
                required
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg hover:border-blue-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 text-lg"
                htmlFor="renterDocumentImage"
              >
                Document Image
              </label>
              <input
                id="renterDocumentImage"
                type="file"
                accept="image/*"
                onChange={(e) => setRenterDocumentImage(e.target.files[0])}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg hover:border-blue-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 text-lg"
                htmlFor="propertyId"
              >
                Property / Flat ID
              </label>
              <select
                id="propertyId"
                value={propertyId}
                onChange={handlePropertyChange}
                required
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg hover:border-blue-400 transition-colors duration-300"
              >
                <option value="">Select Property</option>
                {properties.map((property) => (
                  <option key={property._id} value={property._id}>
                    {property.title} ({property._id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block font-semibold mb-2 text-lg"
                htmlFor="additionalDetails"
              >
                Additional Details
              </label>
              <textarea
                id="additionalDetails"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg hover:border-blue-400 transition-colors duration-300 h-32"
              />
            </div>

            {bookingError && (
              <p className="text-red-600 font-bold text-lg text-center">
                {bookingError}
              </p>
            )}

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
            >
              🚀 Submit Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PropertyBookingEnhanced;
