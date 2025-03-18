import React from "react";
import { MapPin, Bus, Clock, ArrowRight } from "lucide-react";
import { PiSeatBold } from "react-icons/pi";

const FinalSelectedData = ({ onProceed, selectedSeat, selectedBoarding, selectedDropoff }) => {
  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl overflow-hidden ">
      {/* Header Section */}
      <div className="bg-black text-white p-6 text-center">
        <h1 className="text-xl md:text-2xl font-bold flex items-center justify-center">
          <Bus className="mr-3" size={32} />
          Booking Confirmation
        </h1>
      </div>

      {/* Booking Details */}
      <div className="p-6 space-y-6">
        {/* Seat, Boarding & Destination Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {/* Seat Information */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
            <PiSeatBold className="text-yellow-500 mb-2" size={28} />
            <p className="text-sm text-gray-600">Selected Seat</p>
            <h2 className="text-lg font-semibold text-gray-800">Seat {selectedSeat}</h2>
          </div>

          {/* Boarding Point */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
            <MapPin className="text-green-500 mb-2" size={28} />
            <p className="text-sm text-gray-600">Boarding Point</p>
            <h2 className="text-lg font-semibold text-gray-800">{selectedBoarding}</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2" size={16} />
              {selectedBoarding}
            </div>
          </div>

          {/* Destination Point */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
            <MapPin className="text-red-500 mb-2" size={28} />
            <p className="text-sm text-gray-600">Destination Point</p>
            <h2 className="text-lg font-semibold text-gray-800">{selectedDropoff}</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2" size={16} />
              {selectedDropoff}
            </div>
          </div>
        </div>

        {/* Journey Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left my-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Boarding</p>
            <p className="font-semibold">{selectedBoarding}</p>
          </div>
          <ArrowRight className="mx-4 text-gray-500 hidden sm:block" size={24} />
          <div className="text-center">
            <p className="text-sm text-gray-600">Destination</p>
            <p className="font-semibold">{selectedDropoff}</p>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={onProceed}
          className="w-full bg-black text-white py-3 rounded-lg 
           transition duration-300 ease-in-out 
           flex items-center justify-center space-x-2 
           transform focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <span>Proceed</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default FinalSelectedData;
