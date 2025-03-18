import React, { useState } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterSection = ({ filters, handleCheckboxChange }) => {
  const [openFilter, setOpenFilter] = useState(null);

  const filterSections = [
    {
      title: "Departure Time",
      key: "departureTime",
      options: ["Before 6 AM", "6 AM - 12 PM", "12 PM - 6 PM", "After 6 PM"]
    },
    {
      title: "Arrival Time",
      key: "arrivalTime",
      options: ["Before 6 AM", "6 AM - 12 PM", "12 PM - 6 PM", "After 6 PM"]
    },
    {
      title: "Features",
      key: "acType",
      options: ["AC", "Non-AC", "Charging Port", "Wifi"]
    },
    {
      title: "Price Range",
      key: "priceRange",
      options: ["Under 300", "300-500", "500-1000", "1000-2000", "Above 2000"]
    }
  ];

  const toggleFilter = (key) => {
    setOpenFilter(openFilter === key ? null : key);
  };

  return (
    <div className="bg-white rounded-lg shadow-md sticky top-0">
      {/* Mobile and Desktop Friendly Filters */}
      <div className="flex flex-col">
        {filterSections.map((section) => (
          <div key={section.key} className="border-b last:border-b-0">
            {/* Filter Header - Works on both Mobile and Desktop */}
            <button 
              onClick={() => toggleFilter(section.key)}
              className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-gray-800">{section.title}</span>
              {openFilter === section.key ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* Filter Options - Responsive Dropdown */}
            <div 
              className={`
                px-4 overflow-hidden transition-all duration-300 ease-in-out
                ${openFilter === section.key 
                  ? 'max-h-96 pb-4 opacity-100' 
                  : 'max-h-0 opacity-0 p-0'}
              `}
            >
              <div className="space-y-2">
                {section.options.map((option) => (
                  <label 
                    key={option} 
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters[section.key]?.includes(option)}
                      onChange={() => handleCheckboxChange(section.key, option)}
                      className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <span className="text-gray-700">
                      {section.key === 'priceRange' ? `₹${option}` : option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;