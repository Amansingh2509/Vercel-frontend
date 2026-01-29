import React, { useState } from "react";
import axios from "axios";

const PurchaseRentalAgreement = () => {
  const [renterName, setRenterName] = useState("");
  const [renterEmail, setRenterEmail] = useState("");
  const [renterPhone, setRenterPhone] = useState("");
  const [agreementTermsAgreed, setAgreementTermsAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreementTermsAgreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("/api/properties/rental-agreement", {
        renterName,
        renterEmail,
        renterPhone,
      });
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      setError("Failed to submit the rental agreement. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Rental Agreement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="renterName" className="block font-medium mb-1">
            Full Name
          </label>
          <input
            id="renterName"
            type="text"
            value={renterName}
            onChange={(e) => setRenterName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="renterEmail" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="renterEmail"
            type="email"
            value={renterEmail}
            onChange={(e) => setRenterEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="renterPhone" className="block font-medium mb-1">
            Phone Number
          </label>
          <input
            id="renterPhone"
            type="tel"
            value={renterPhone}
            onChange={(e) => setRenterPhone(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="agreementTerms"
            checked={agreementTermsAgreed}
            onChange={() => setAgreementTermsAgreed(!agreementTermsAgreed)}
          />
          <label htmlFor="agreementTerms" className="ml-2">
            I agree to the terms and conditions
          </label>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {success && (
          <p className="text-green-600">Agreement submitted successfully!</p>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Agreement
        </button>
      </form>
    </div>
  );
};

export default PurchaseRentalAgreement;
