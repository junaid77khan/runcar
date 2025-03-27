import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import NavRoutes from './Pages/NavRoutes';
import Pricing from './Pages/Pricing';
import Offer from './Pages/Offer';
import ContactUs from './Pages/ContactUs';
import FAQ from './Pages/FAQ';
import AboutUs from './Pages/AboutUs';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarBookingCheckout from './Pages/CarBookingCheckout';
const App = () => {
  return (
    <Router>
      <Header />
      
      {/* ToastContainer should be placed here to be globally accessible */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="routes" element={<NavRoutes />} />
        <Route path="routes/pay" element={<CarBookingCheckout />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="offers" element={<Offer />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="faqs" element={<FAQ />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
