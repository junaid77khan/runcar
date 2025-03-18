import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="mt-32 py-16 px-6 md:px-12 lg:px-32 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Have questions? Reach out to us! Our team is ready to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-gray-700 bg-gray-100 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900">Get in Touch</h3>
            <motion.div
              className="flex items-center gap-4"
            >
              <FaPhoneAlt className="text-green-500 text-2xl" />
              <span className="text-lg">+91 98765 43210</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-4"
            >
              <FaEnvelope className="text-blue-500 text-2xl" />
              <span className="text-lg">support@runcar.com</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-4"
            >
              <FaMapMarkerAlt className="text-red-500 text-2xl" />
              <span className="text-lg">123, City Center, New Delhi, India</span>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-yellow-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-yellow-500"
              rows="4"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-yellow-500 text-white font-medium py-3 rounded-lg hover:bg-yellow-600 transition-all"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
