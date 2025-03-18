import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I book a cab?",
    answer: "You can book a cab through our website by selecting your route and vehicle.",
  },
  {
    question: "Can I cancel my ride?",
    answer: "Yes, free cancellation is available for Standard, Premium, and Luxury plans.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, Credit/Debit Cards, Net Banking, and Wallet Payments.",
  },
  {
    question: "Are pets allowed in the car?",
    answer: "Pets are allowed only in Premium and Luxury cars with prior notice.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mt-32 py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
            <FaQuestionCircle className="text-blue-500" /> Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Find answers to common questions about our service.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
