import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, User } from "lucide-react";

const AccountMenu = ({ isLoggedIn, userName }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div className="relative hidden md:flex items-center gap-4">
      {/* Account Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`flex items-center gap-2 border ${
            isOpen || isHovered
              ? "bg-yellow-500 text-white border-yellow-500"
              : "border-yellow-500 text-yellow-500"
          } px-4 py-2 text-sm rounded-md transition-all duration-200 font-medium hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <User size={16} />
          <span>Account</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md py-1 z-50 border border-gray-100 transition-all duration-200 animate-fadeIn">
            {/* Common Options */}
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b">
              BOOKING MANAGEMENT
            </div>
            
            <button 
              className="flex w-full text-left px-4 py-2 text-sm hover:bg-gray-200 hover:cursor-pointer transition-colors duration-150"
              onClick={() => {
                navigate("/cancel-booking");
                setIsOpen(false);
              }}
            >
              Cancel Booking
            </button>
            
            <button 
              className="flex w-full text-left px-4 py-2 text-sm hover:bg-gray-200 hover:cursor-pointer transition-colors duration-150"
              onClick={() => {
                navigate("/modify-date");
                setIsOpen(false);
              }}
            >
              Modify Travel Date
            </button>
            
            <button 
              className="flex w-full text-left px-4 py-2 text-sm hover:bg-gray-200 hover:cursor-pointer transition-colors duration-150"
              onClick={() => {
                navigate("/view-ticket");
                setIsOpen(false);
              }}
            >
              View My Ticket
            </button>

            {/* Logged-in Options */}
            {isLoggedIn ? (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-t">
                  MY ACCOUNT
                </div>
                <div className="px-4 py-2 text-sm text-gray-700 bg-gray-50">
                  Welcome, {userName || "User"}
                </div>
                <button 
                  className="flex w-full text-left px-4 py-2 text-sm hover:bg-gray-200 hover:cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                >
                  My Profile
                </button>
                <button 
                  className="flex w-full text-left px-4 py-2 text-sm hover:bg-gray-200 hover:cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    navigate("/bookings");
                    setIsOpen(false);
                  }}
                >
                  My Bookings
                </button>
                <button 
                  className="flex w-full text-left px-4 py-2 text-sm hover:bg-gray-200 hover:cursor-pointer transition-colors duration-150 text-red-600"
                  onClick={() => {
                    // Handle logout logic here
                    navigate("/");
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-t">
                  AUTHENTICATION
                </div>
                <button 
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }} 
                  className="flex w-full text-left px-4 py-2 text-sm hover:bg-gray-200 hover:cursor-pointer transition-colors duration-150"
                >
                  Login/Signup
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Track Booking Button */}
      <button 
        onClick={() => navigate("/track")}
        className="bg-yellow-500 text-white font-semibold px-4 py-2 text-sm rounded-md hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 shadow-sm"
      >
        Track Booking
      </button>
    </div>
  );
};

export default AccountMenu;