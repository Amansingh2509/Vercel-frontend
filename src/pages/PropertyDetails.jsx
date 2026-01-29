import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PropertyDetails = () => {
  const [platformCharge, setPlatformCharge] = useState(0);
  const [paymentProofImage, setPaymentProofImage] = useState(null);

  // QR Code Image Path
  const qrCodeImagePath =
    "/uploads/qrPaymentScreenshot-1756044515366-703758379.png"; // Update with actual path
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError("Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="property-details">
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price: ₹{property.price}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <img src={property.images[0]} alt={property.title} />
      {/* Add more property details as needed */}
    </div>
  );
};

export default PropertyDetails;
