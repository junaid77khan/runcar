import React from 'react' 
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
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Blog from "./pages/Blog";
// import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="routes" element={<NavRoutes />} />
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
