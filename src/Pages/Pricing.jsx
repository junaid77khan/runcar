import React from "react";
import { motion } from "framer-motion";
import { FaCar, FaCheckCircle, FaTimesCircle, FaRupeeSign, FaRegSnowflake, FaSuitcaseRolling } from "react-icons/fa";

const pricingPlans = [
  {
    name: "Economy",
    car: "Hatchback",
    price: "₹199/km",
    features: [
      { text: "Basic Comfort", available: true },
      { text: "Air Conditioning", available: true },
      { text: "2 Bags Allowed", available: true },
      { text: "Free Cancellation", available: false },
      { text: "Luxury Interiors", available: false },
    ],
  },
  {
    name: "Standard",
    car: "Sedan",
    price: "₹299/km",
    features: [
      { text: "Premium Comfort", available: true },
      { text: "Air Conditioning", available: true },
      { text: "3 Bags Allowed", available: true },
      { text: "Free Cancellation", available: true },
      { text: "Luxury Interiors", available: false },
    ],
  },
  {
    name: "Premium",
    car: "SUV",
    price: "₹399/km",
    features: [
      { text: "Spacious & Comfortable", available: true },
      { text: "Air Conditioning", available: true },
      { text: "4 Bags Allowed", available: true },
      { text: "Free Cancellation", available: true },
      { text: "Luxury Interiors", available: true },
    ],
  },
  {
    name: "Luxury",
    car: "Luxury Car",
    price: "₹599/km",
    features: [
      { text: "Luxury Seating", available: true },
      { text: "Advanced Air Conditioning", available: true },
      { text: "Unlimited Luggage", available: true },
      { text: "Free Cancellation", available: true },
      { text: "Luxury Interiors", available: true },
    ],
  },
];

const Pricing = () => {
  return (
    <section className="mt-32 py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
            <FaCar className="text-yellow-500" /> Pricing Plans
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Choose from a variety of cars to suit your budget and comfort level.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              {/* Plan Header */}
              <div className="bg-yellow-500 text-white py-4 px-6 text-center">
                <h3 className="text-lg font-bold">{plan.name}</h3>
              </div>

              {/* Plan Content */}
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                  <FaCar className="text-yellow-500" /> {plan.car}
                </h4>

                {/* Price */}
                <p className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-1">
                  <FaRupeeSign className="text-yellow-500" /> {plan.price}
                </p>

                {/* Features */}
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-center justify-center gap-2 ${
                        feature.available ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {feature.available ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaTimesCircle className="text-red-500" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {/* Book Now Button */}
                <button className="mt-5 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-all duration-300">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
