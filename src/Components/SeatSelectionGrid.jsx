import React from 'react';
import useBookingStore from '../store';

const SeatSelectionGrid = ({ selectedSeat, seatConfig, onSeatSelection, route }) => {
  const { holdSeats } = useBookingStore(); 
  let seatCounter = 1;
  const bookedSeatsSet = new Set(
    (holdSeats || [])
      .filter(seat => seat.r_id === route.r_id && seat.v_id === route.v_id)
      .map(seat => Number(seat.seat_no))
  );

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-base md:text-lg font-medium text-gray-800 mb-4 text-center">Select Your Seat</h3>

      <div className="w-full overflow-x-auto">
        <div className="inline-block min-w-full">
          {seatConfig.rows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex justify-center space-x-2 sm:space-x-3 p-1 sm:p-2 bg-gray-50 rounded-md border border-gray-200 mb-2"
            >
              {Array.from({ length: row.columns }).map((_, seatIndex) => {
                const isDriverSeat = rowIndex === 0 &&
                  ((seatConfig.driverPosition === 'left' && seatIndex === 0) ||
                   (seatConfig.driverPosition === 'right' && seatIndex === row.columns - 1));

                if (!isDriverSeat) {
                  const currentSeatNumber = seatCounter;
                  seatCounter++;

                  // Check if seat is booked
                  const isBooked = bookedSeatsSet.has(currentSeatNumber);

                  return (
                    <button 
                      key={seatIndex} 
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded flex items-center justify-center 
                        text-xs sm:text-sm font-medium border transition-colors focus:outline-none
                        ${isBooked 
                          ? "bg-gray-400 text-white border-gray-500 cursor-not-allowed"  // Booked Seat
                          : selectedSeat.includes(currentSeatNumber) 
                          ? "bg-blue-500 text-white border-blue-500"  // Selected Seat
                          : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400"  // Available Seat
                        }
                      `} 
                      onClick={() => {
                        if (!isBooked) {
                          onSeatSelection(currentSeatNumber);
                        }
                      }}
                      disabled={isBooked}  // Disable button if seat is booked
                    >
                      {currentSeatNumber}
                    </button>
                  );
                }
                return <div key={seatIndex} className="w-8 h-8 sm:w-10 sm:h-10" />;
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap justify-between items-center space-y-2 sm:space-y-0 text-xs sm:text-sm">
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
          <div className="w-4 h-4 sm:w-6 sm:h-6 border border-gray-300 bg-white rounded mr-2"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded mr-2"></div>
          <span className="text-gray-600">Selected</span>
        </div>
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-400 rounded mr-2"></div>
          <span className="text-gray-600">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionGrid;
