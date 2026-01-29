import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-gray-900/60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold">
                RoomRental & Home Solution
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for finding the perfect rental property. We
              connect renters with quality homes across India.
            </p>
          </motion.div>

          {/* Property Types */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-blue-400 pl-2">
              Property Types
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Bungalows for Rent", to: "/bungalows" },
                { name: "Flats for Rent", to: "/flats" },
                { name: "Tenements for Rent", to: "/tenements" },
                { name: "Furnished Properties", to: "/furnished" },
                { name: "Commercial Spaces", to: "/commercial" },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 6, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.to}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-blue-400 pl-2">
              Contact Us
            </h3>
            <div className="space-y-4 text-gray-300">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+91 7667816204</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <Mail className="h-5 w-5 text-blue-400" />
                <span>info@renthome.com</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-3"
              >
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <span>
                  43, Nand Dham, Parivar <br /> Vadodara, India 110001
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-blue-400 pl-2">
              Follow Us
            </h3>
            <div className="flex space-x-5">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2025 RoomRental & Home Solution. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ color: "#60A5FA", scale: 1.05 }}
                  className="text-gray-400 hover:text-blue-400 text-sm transition"
                >
                  {item}
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
