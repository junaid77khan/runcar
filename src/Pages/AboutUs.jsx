import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, DollarSign, ShieldCheck, Target, Eye } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="mt-32 py-16 px-6 md:px-12 lg:px-32 bg-gray-50">
      <div className="container mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-gray-900"
        >
          About Run Car
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 max-w-3xl mx-auto mt-4 text-lg leading-relaxed"
        >
          Founded with the vision of making intercity travel smooth, affordable, and reliable,
          Run Car is your trusted partner for seamless transportation. We connect cities with
          a network of comfortable vehicles, ensuring that every journey is a pleasant
          experience. Whether you're traveling for work or leisure, Run Car ensures
          a punctual, safe, and enjoyable ride.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <Briefcase className="text-yellow-500 w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
          <p className="text-gray-700 leading-relaxed">
            Run Car started with a simple mission: to offer a better alternative to
            traditional travel options. Understanding the challenges of intercity
            commuting, we built a platform that prioritizes passenger convenience,
            affordability, and safety. Over the years, we have expanded our
            services, ensuring that thousands of passengers reach their destinations comfortably every day.
          </p>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Run Car?</h3>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700">
              <ShieldCheck className="text-yellow-500 w-6 h-6 mr-3" />
              A vast network of routes and well-maintained vehicles
            </li>
            <li className="flex items-center text-gray-700">
              <Clock className="text-yellow-500 w-6 h-6 mr-3" />
              Punctual departures & live tracking for peace of mind
            </li>
            <li className="flex items-center text-gray-700">
              <DollarSign className="text-yellow-500 w-6 h-6 mr-3" />
              Affordable fares with transparent pricing
            </li>
            <li className="flex items-center text-gray-700">
              <ShieldCheck className="text-yellow-500 w-6 h-6 mr-3" />
              Verified professional drivers ensuring safety
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Our Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <Target className="text-yellow-500 w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to redefine intercity travel by offering a safe, efficient,
            and hassle-free transportation service. We aim to make travel more
            accessible and convenient for everyone by leveraging technology
            and innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <Eye className="text-yellow-500 w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
          <p className="text-gray-700 leading-relaxed">
            We envision a future where travel is stress-free, comfortable, and
            environmentally responsible. Run Car is committed to enhancing the
            way people commute between cities, ensuring safety, convenience,
            and affordability every step of the way.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
