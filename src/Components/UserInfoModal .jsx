// UserInfoModal.jsx
import React, { useEffect, useState } from 'react';
import { X, MapPin, User, Phone, Mail, Calendar } from 'lucide-react';
import AuthModal from './AuthModal';
import { toast } from "react-toastify";
import axios from "axios";
import useBookingStore from '../store';

const UserInfoModal = ({ isOpen, onClose, onSubmit, loading, setLoading, selectedSeat, route }) => {
  const { holdSeats, fetchHoldSeats } = useBookingStore();   
  const [bookedSeatsSet, setBookedSeatsSet] = useState(new Set());
  const [passengers, setPassengers] = useState([]);
  const [contactDetails, setContactDetails] = useState({
    mobile: "",
    email: "",
    freeCancellation: false
  });

  useEffect(() => {
    // Ensure passengers array matches selected seats
    setPassengers(
      selectedSeat.map((seat, index) => 
        passengers[index] || { name: "", age: "", gender: "", seat } 
      )
    );
  }, [selectedSeat]);

  const updateBookedSeats = () => {
    // Create a set of booked/held seats for the specific route
    const newBookedSeats = new Set(
      (holdSeats || [])
        .filter(seat => seat.r_id === route.r_id && seat.v_id === route.v_id)
        .map(seat => Number(seat.seat_no))
    );
    setBookedSeatsSet(newBookedSeats);
  };

  const handlePassengerChange = (index, field, value) => {
    setPassengers((prevPassengers) =>
      prevPassengers.map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
      )
    );
  };

  const handleContactDetailsChange = (field, value) => {
    setContactDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
  
    if (!authToken || !tokenExpiry || Date.now() > Number(tokenExpiry) * 1000) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combine passenger details and contact details
    const formData = {
      passengers,
      contactDetails
    };

    // Proceed with submission if seats are available
    onSubmit(formData);
  };

  const [isRegister, setIsRegister] = useState(false);
  const handleRegister = () => {
    setIsRegister(!isRegister);
  }

  const handleUserAuthSubmit = async (userData) => {
    if (isRegister && userData.password !== userData.confirm_password) {
        toast.error('Passwords do not match. Please re-enter the same password.');
        return;
    }

    let data = new FormData();
    for (let key in userData) {
        data.append(key, userData[key]);
    }
    
    const op = isRegister ? 'register' : 'login';
    let url = `${import.meta.env.VITE_API_URL}/users.php?op=${op}`;
    
    try {
        setLoading(true);
        const response = await axios.post(url, data);
        
        if (response.data.success) {
            const msg = isRegister ? 'Registration' : 'Login';
            toast.success(`${msg} Successful`);
            setIsLoggedIn(true);

            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("tokenExpiry", response.data.expiry);
            localStorage.setItem("u_id", response.data.u_id);
        } else {
            toast.error(response.data.message || 'Something went wrong. Please try again later');
        }
    } catch (err) {
        console.error("Error submitting form:", err);
        toast.error('Something went wrong. Please try again later');
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    isLoggedIn ? (
    <div 
      className="fixed inset-0 flex justify-end z-50"
      onClick={onClose} 
    >
      <div 
        className="w-full md:w-1/2 bg-white shadow-2xl transform transition-transform 
          duration-300 ease-in-out translate-x-0 z-50 overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Passenger Information</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {passengers.map((passenger, index) => (
            <div key={passenger.seat} className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4">Passenger {index + 1} Details (Seat {passenger.seat})</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center">
                    <User className="mr-2 text-gray-500" />
                    <span>Full Name</span>
                  </label>
                  <input 
                    type="text" 
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                    required 
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter passenger's full name"
                  />
                </div>
      
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Calendar className="mr-2 text-gray-500" />
                    <span>Gender</span>
                  </label>
                  <select 
                    value={passenger.gender}
                    onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                    required 
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
      
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Calendar className="mr-2 text-gray-500" />
                    <span>Age</span>
                  </label>
                  <input 
                    type="number" 
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                    required 
                    min="1"
                    max="120"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter passenger's age"
                  />
                </div>
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center">
                  <Phone className="mr-2 text-gray-500" />
                  <span>Mobile Number</span>
                </label>
                <input 
                  type="tel" 
                  value={contactDetails.mobile}
                  onChange={(e) => handleContactDetailsChange('mobile', e.target.value)}
                  required 
                  pattern="[0-9]{10}"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
      
              <div className="space-y-2">
                <label className="flex items-center">
                  <Mail className="mr-2 text-gray-500" />
                  <span>Email (Optional)</span>
                </label>
                <input 
                  type="email" 
                  value={contactDetails.email}
                  onChange={(e) => handleContactDetailsChange('email', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={contactDetails.freeCancellation}
              onChange={(e) => handleContactDetailsChange('freeCancellation', e.target.checked)}
              className="h-4 w-4"
            />
            <span>Add Free Cancellation</span>
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            {loading ? 
              <div className="py-10 text-center">
                <div className="inline-block w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
             : "Proceed"}
          </button>
        </form>
      </div>
    </div>
    ) : (
      <AuthModal loading={loading} isRegister={isRegister} onClose={onClose} onSubmit={handleUserAuthSubmit} handleRegister={handleRegister} />
    )
  );
};

export default UserInfoModal;