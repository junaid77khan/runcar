import React, { useState } from "react"; 
import { X, MapPin, User, Phone, Mail, Calendar } from "lucide-react"; 
import SeatSelectionGrid from "./SeatSelectionGrid"; 
 
// Seat Selection Component 
const SeatSelection = ({ selectedSeat, onSeatSelect, seatConfig={rows: [], driverPosition: "right"}, route }) => { 
  const renderSeats = () => { 
    return ( 
      <SeatSelectionGrid 
        selectedSeat={selectedSeat} 
        seatConfig={seatConfig} 
        onSeatSelection={onSeatSelect}
        route={route}
      /> 
    ); 
  } 
 
  return ( 
    <div className="seat-selection w-full px-4 py-6"> 
      <h2 className="text-lg md:text-xl font-bold mb-4 text-center"> 
        Select Your Seat 
      </h2> 
      {renderSeats()} 
    </div> 
  ); 
}; 
 
export default SeatSelection;