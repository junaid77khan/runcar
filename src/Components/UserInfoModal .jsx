import React, { useState } from 'react';
import { X, MapPin, User, Phone, Mail, Calendar } from 'lucide-react';

const UserInfoModal = ({ isOpen, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
      name: '',
      gender: '',
      age: '',
      mobile: '',
      email: '',
      freeCancellation: false
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    if (!isOpen) return null;
  
    return (
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
  
          <h2 className="text-2xl font-bold mb-6">Passenger Details</h2>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center">
                <User className="mr-2 text-gray-500" />
                <span>Full Name</span>
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your full name"
              />
            </div>
    
            <div className="space-y-2">
              <label className="flex items-center">
                <Calendar className="mr-2 text-gray-500" />
                <span>Gender</span>
              </label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
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
                name="age"
                value={formData.age}
                onChange={handleChange}
                required 
                min="1"
                max="120"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your age"
              />
            </div>
    
            <div className="space-y-2">
              <label className="flex items-center">
                <Phone className="mr-2 text-gray-500" />
                <span>Mobile Number</span>
              </label>
              <input 
                type="tel" 
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>
    
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="freeCancellation"
                checked={formData.freeCancellation}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span>Add Free Cancellation</span>
            </div>
    
            <button 
              type="submit" 
              className="w-full bg-black text-white p-3 rounded-lg "
            >
              {loading ? 
                <div className="py-10 text-center">
                  <div className="inline-block w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
               : "Proceed to Pay"}
            </button>
          </form>
        </div>
      </div>
    );
  };

export default UserInfoModal;
