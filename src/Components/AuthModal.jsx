import React, { useState } from "react";
import { X, User, Mail, Lock, Phone, Calendar } from "lucide-react";
import { PiCity } from "react-icons/pi";

const AuthModal = ({ loading, isRegister, onClose, onSubmit, handleRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    emailOrMobile: "",
    password: "",
    confirm_password: "",
    gender: "",
    age: "",
    mobile: "",
    email: "",
    state: "",
    city: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50" onClick={onClose}>
      <div
        className="w-full md:w-1/2 bg-white shadow-2xl transform transition-transform 
          duration-300 ease-in-out translate-x-0 z-50 overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing on inside click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Register Only: Name Field */}
          {isRegister && (
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
          )}

          {/* Login: Email or Mobile | Register: Mobile */}
          <div className="space-y-2">
            <label className="flex items-center">
              <Phone className="mr-2 text-gray-500" />
              <span>{isRegister ? "Mobile Number" : "Email or Mobile"}</span>
            </label>
            <input
              type={isRegister ? "tel" : "text"}
              name={isRegister ? "mobile" : "emailOrMobile"}
              value={isRegister ? formData.mobile : formData.emailOrMobile}
              onChange={handleChange}
              required
              pattern={isRegister ? "[0-9]{10}" : undefined}
              className="w-full p-2 border rounded-lg"
              placeholder={
                isRegister ? "Enter 10-digit mobile number" : "Enter email or mobile"
              }
            />
          </div>

          {/* Register Only: Email (Optional) */}
          {isRegister && (
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
          )}

          <div className="space-y-2">
              <label className="flex items-center">
                <Lock className="mr-2 text-gray-500" />
                <span>Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your password"
              />
          </div>

          
          {isRegister && (
            <div className="space-y-2">
              <label className="flex items-center">
                <Lock className="mr-2 text-gray-500" />
                <span>Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your password"
              />
            </div>
          )}

          {/* Register Only: Gender */}
          {isRegister && (
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
          )}

          {/* Register Only: Age */}
          {isRegister && (
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
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isRegister ? (
              "Register"
            ) : (
              "Login"
            )}
          </button>

          {/* Toggle between Login/Register */}
          <p className="text-center text-sm mt-2">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button className="text-blue-500" onClick={handleRegister}>
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button className="text-blue-500" onClick={handleRegister}>
                  Register
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
