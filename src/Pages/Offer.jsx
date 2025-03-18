import React from "react";
import { motion } from "framer-motion";
import { FaTag, FaGift, FaClock, FaCheckCircle } from "react-icons/fa";

const offers = [
  {
    title: "Flat 10% Off",
    description: "Get a 10% discount on your first booking. Use code: FIRST10",
    icon: <FaGift className="text-green-500 text-3xl" />,
    validTill: "Limited Time Offer",
  },
  {
    title: "Weekend Special",
    description: "Enjoy 15% off on rides every weekend. Book now!",
    icon: <FaClock className="text-blue-500 text-3xl" />,
    validTill: "Valid on Saturday & Sunday",
  },
  {
    title: "Refer & Earn",
    description: "Refer a friend and earn ₹200 wallet credit for each referral.",
    icon: <FaCheckCircle className="text-purple-500 text-3xl" />,
    validTill: "No expiry, refer unlimited friends!",
  },
];

const Offer = () => {
  return (
    <section className="mt-32 py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-gray-900 flex justify-center items-center gap-2"
        >
          <FaTag className="text-green-500" /> Special Offers
        </motion.h2>
        <p className="text-gray-600 max-w-lg mx-auto mt-2">
          Grab exciting deals and discounts on your rides!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-gray-200"
            >
              {offer.icon}
              <h3 className="text-lg font-bold text-gray-800 mt-3">
                {offer.title}
              </h3>
              <p className="text-gray-600 mt-2">{offer.description}</p>
              <span className="mt-3 text-sm text-gray-500">{offer.validTill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offer;
