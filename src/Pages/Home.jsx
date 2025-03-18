import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaCar, FaCheckCircle, FaMapMarkedAlt, FaClock, FaStar, FaGooglePlay, FaApple } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import citiesData from "../utils/cities.json";
import "../App.css";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [startDate, setStartDate] = useState();
  const [pick, setPick] = useState("");
  const [drop, setDrop] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [activeField, setActiveField] = useState(""); 
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const filterCities = (query) => {
    if (!query) return [];
    return citiesData.cities
      .filter((city) => city.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
  };

  const handleInputChange = (value, field) => {
    if (field === "pick") {
      setPick(value);
      setFilteredCities(filterCities(value));
    } else {
      setDrop(value);
      setFilteredCities(filterCities(value));
    }
    setActiveField(field);
    setError(""); 
  };

  const handleSelectCity = (cityName, field) => {
    if (field === "pick") setPick(cityName);
    else setDrop(cityName);
    setFilteredCities([]); 
    setActiveField("");
    setError(""); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setFilteredCities([]);
        setActiveField("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pick || !drop) {
      alert("Please fill all fields before searching rides!");
      return;
    }
    
    navigate(`routes`, { state: { initialPickup: pick, initialDrop: drop, initialDate: startDate } });
  };

  return (
    <main className="pt-32">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-black py-20 px-4"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold sm:text-4xl">
            Seamless Intercity Travel with Run Car!
          </h1>
          <p className="mt-3 text-lg sm:text-base">
            Book scheduled rides at affordable prices.
          </p>
        </div>

        {/* Booking Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative z-10 bg-white shadow-lg rounded-lg p-8 mt-10 max-w-4xl mx-auto w-full"
        >
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" ref={inputRef}>
            
            {/* Pickup Location */}
            <motion.div variants={fadeIn} className="relative">
              <label className="block text-gray-600 font-medium mb-1">
                Pickup Location
              </label>
              <input
                type="text"
                placeholder="Enter Pickup Location"
                className="p-3 border rounded w-full focus:ring-2 focus:ring-yellow-500"
                value={pick}
                onChange={(e) => handleInputChange(e.target.value, "pick")}
              />
              {activeField === "pick" && filteredCities.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50 scrollbar-hide">
                  {filteredCities.map((city) => (
                    <li
                      key={city.id}
                      className="p-3 hover:bg-yellow-500 hover:text-white cursor-pointer transition rounded"
                      onClick={() => handleSelectCity(city.name, "pick")}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Drop-off Location */}
            <motion.div variants={fadeIn} className="relative">
              <label className="block text-gray-600 font-medium mb-1">
                Drop-off Location
              </label>
              <input
                type="text"
                placeholder="Enter Drop-off Location"
                className="p-3 border rounded w-full focus:ring-2 focus:ring-yellow-500"
                value={drop}
                onChange={(e) => handleInputChange(e.target.value, "drop")}
              />
              {activeField === "drop" && filteredCities.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50 scrollbar-hide">
                  {filteredCities.map((city) => (
                    <li
                      key={city.id}
                      className="p-3 hover:bg-yellow-500 hover:text-white cursor-pointer transition rounded"
                      onClick={() => handleSelectCity(city.name, "drop")}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Date of Journey */}
            <motion.div variants={fadeIn} className="relative">
              <label className="block text-gray-600 font-medium mb-1">
                Date of Journey
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="p-3 border rounded w-full focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                placeholderText="Select Date"
                dateFormat="dd/MM/yyyy"
              />
            </motion.div>

            {/* Search Button */}
            <motion.div className="flex items-end" variants={fadeIn}>
              <button
                className={`p-3 rounded w-full font-bold transition ${
                  pick && drop
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={handleSearch}
                disabled={!pick || !drop}
              >
                Search Rides
              </button>
            </motion.div>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </motion.div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" variants={fadeIn} className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold sm:text-2xl">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {[{ icon: FaMapMarkedAlt, title: "Enter Locations", desc: "Choose your pickup & drop-off points." },
            { icon: FaCar, title: "Choose a Schedule", desc: "Select the best departure time for your trip." },
            { icon: FaClock, title: "Enjoy Your Ride", desc: "Sit back and travel comfortably." }].map((item, i) => (
              <motion.div 
              key={i}
              initial={{ opacity: 0, x: -100 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: i * 0.3 }} // Staggered effect
              viewport={{ once: true }}
              className="text-center"
            >
              <item.icon className="text-4xl text-yellow-500 mx-auto" />
              <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* Why Choose Us */}
      <motion.section initial="hidden" whileInView="visible" variants={fadeIn} className="bg-yellow-500 text-black py-16 px-4 text-center">
        <h2 className="text-3xl font-bold sm:text-2xl">Why Choose Run Car?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {[{ icon: FaCheckCircle, title: "Reliable Service", desc: "Timely departures & safe rides." },
            { icon: FaStar, title: "Top-rated Drivers", desc: "Experienced & professional drivers." },
            { icon: FiPhoneCall, title: "24/7 Support", desc: "We're here to assist you anytime." }].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -100 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: i * 0.3 }} // Staggered effect
              viewport={{ once: true }}
              className="text-center"
            >
              <item.icon className="text-4xl mx-auto" />
              <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
              <p className="text-gray-800">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Popular Routes */}
      <motion.section initial="hidden" whileInView="visible" variants={fadeIn} className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold sm:text-2xl">Popular Routes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto">
          {["Gwalior to Bhind", "Indore to Bhopal", "Delhi to Agra"].map((route, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -100 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: i * 0.3 }} // Staggered effect
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold">{route}</h3>
              <p className="text-gray-500">Affordable fares & fixed schedules.</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      className="bg-yellow-500 text-black py-16 px-4 text-center"
    >
      <h2 className="text-3xl font-bold sm:text-2xl">
        Download the Run Car App & Book Your Ride!
      </h2>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <motion.a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeIn}
          className="bg-black text-white px-6 py-3 flex items-center justify-center gap-2 rounded w-full sm:w-auto text-lg font-semibold"
        >
          <FaApple size={24} />
          Download on App Store
        </motion.a>
        
        <motion.a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeIn}
          className="bg-black text-white px-6 py-3 flex items-center justify-center gap-2 rounded w-full sm:w-auto text-lg font-semibold"
        >
          <FaGooglePlay size={24} />
          Get it on Google Play
        </motion.a>
      </div>
    </motion.section>
    </main>
  );
};

export default Home;
