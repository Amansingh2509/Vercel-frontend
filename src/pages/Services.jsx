import React from "react";
import {
  Building,
  Home,
  Users,
  Search,
  FileCheck,
  Key,
  Shield,
  Headphones,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Search className="h-12 w-12" />,
      title: "Property Search",
      description:
        "Find your ideal rental property with our advanced search and filtering system",
      features: [
        "Advanced Filters",
        "Location-based Search",
        "Price Range Selection",
        "Property Type Filtering",
      ],
    },
    {
      icon: <Building className="h-12 w-12" />,
      title: "Property Management",
      description:
        "Complete property management solutions for landlords and property owners",
      features: [
        "Tenant Screening",
        "Rent Collection",
        "Maintenance Coordination",
        "Legal Compliance",
      ],
    },
    {
      icon: <FileCheck className="h-12 w-12" />,
      title: "Documentation Support",
      description:
        "Professional assistance with all rental documentation and legal paperwork",
      features: [
        "Rental Agreements",
        "Legal Compliance",
        "Document Verification",
        "Registration Support",
      ],
    },
    {
      icon: <Key className="h-12 w-12" />,
      title: "Move-in Assistance",
      description:
        "Seamless transition to your new home with our comprehensive move-in support",
      features: [
        "Property Inspection",
        "Key Handover",
        "Utility Setup",
        "Move-in Checklist",
      ],
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Verification Services",
      description:
        "Thorough verification of properties and owners for your safety and security",
      features: [
        "Property Verification",
        "Owner Authentication",
        "Legal Documentation",
        "Background Checks",
      ],
    },
    {
      icon: <Home className="h-12 w-12" />,
      title: "Tiffin Services",
      description:
        "Delicious and nutritious home-cooked meals delivered daily to your doorstep",
      features: [
        "Shree Krishna Tiffin Service - 9876543210",
        "Annapurna Food Services - 9123456789",
        "Gujarat Tiffin Express - 9988776655",
        "Home Delight Tiffins - 9876543211",
        "Swadisht Tiffin Service - 9876543212",
      ],
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Search & Filter",
      description:
        "Browse our extensive property database using advanced filters",
    },
    {
      step: "02",
      title: "Schedule Visit",
      description: "Book property visits at your convenient time slots",
    },
    {
      step: "03",
      title: "Documentation",
      description: "Complete all necessary paperwork with our assistance",
    },
    {
      step: "04",
      title: "Move In",
      description: "Get your keys and move into your dream home",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive real estate solutions designed to make your rental
            journey seamless and stress-free
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From property search to move-in support, we provide end-to-end
              services for all your rental needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 4-step process to find and rent your perfect home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking for a home or want to list your property,
            we're here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/properties"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Find Properties
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
