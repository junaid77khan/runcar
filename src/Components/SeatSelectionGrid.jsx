import React from 'react';

const SeatSelectionGrid = ({ seatConfig, onSeatSelection }) => {
  // Initialize seat counter
  let seatCounter = 1;
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Select Your Seat</h3>
      
      <div className="grid grid-cols-1 gap-6">
        {seatConfig.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-3 p-2 bg-gray-50 rounded-md border border-gray-200">
            {Array.from({ length: row.columns }).map((_, seatIndex) => {
              // Check if this is a driver seat that should be hidden
              const isDriverSeat = rowIndex === 0 && 
                ((seatConfig.driverPosition === 'left' && seatIndex === 0) || 
                 (seatConfig.driverPosition === 'right' && seatIndex === row.columns - 1));
              
              // Only render non-driver seats
              if (!isDriverSeat) {
                const currentSeatNumber = seatCounter;
                seatCounter++; // Increment for next seat
                
                return (
                  <button
                    key={seatIndex}
                    className="w-10 h-10 rounded flex items-center justify-center text-sm font-medium border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => onSeatSelection(currentSeatNumber)}
                  >
                    {currentSeatNumber}
                  </button>
                );
              }
              return <div key={seatIndex} className="w-10 h-10" />;
            })}
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-between text-sm">
        <div className="flex items-center">
          <div className="w-6 h-6 border border-gray-300 bg-white rounded mr-2"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
          <span className="text-gray-600">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-400 rounded mr-2"></div>
          <span className="text-gray-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionGrid;