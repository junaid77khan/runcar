import { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const expiry = localStorage.getItem("tokenExpiry");

    if (!token || !expiry || Date.now() > Number(expiry) * 1000) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
    setIsLoggedIn(false);
  };

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top Bar */}
      <div className="bg-yellow-500 text-black text-xs sm:text-sm py-1 sm:py-2 px-4 sm:px-6 md:px-10 flex justify-between items-center">
        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs sm:text-sm">
            <FaPhoneAlt size={12} /> +91 98765 43210
          </span>
          <span className="flex items-center gap-1 text-xs sm:text-sm">
            <FaEnvelope size={12} /> support@runcar.com
          </span>
          <span className="flex items-center gap-1 text-xs sm:text-sm">
            <FaMapMarkerAlt size={12} /> India
          </span>
        </div>
        {/* <button className="px-3 sm:px-4 py-1 border rounded text-black border-black text-xs sm:text-sm">
          Driver Login
        </button> */}
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-2 sm:py-3 px-4 sm:px-6 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src="./logo.jpg" 
            alt="Logo" 
            className="max-w-[80px] sm:max-w-[100px] h-auto object-contain" 
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-black font-semibold text-lg">
          {NavbarLinks.map((link, index) => (
            <li key={index} className="cursor-pointer hover:text-yellow-500">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Dropdown for Login/Signup & Logout */}
        <div className="hidden md:flex items-center gap-3">
          <AccountMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl z-999 p-1 rounded focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
};

export default Header;
