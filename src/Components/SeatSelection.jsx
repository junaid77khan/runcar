import React, { useState } from "react";
import { X, MapPin, User, Phone, Mail, Calendar } from "lucide-react";
import SeatSelectionGrid from "./SeatSelectionGrid";

// Seat Selection Component
const SeatSelection = ({ availableSeats, onSeatSelect, seatConfig={rows: [], driverPosition: "right"} }) => {

  const renderSeats = () => {
    return (
      <SeatSelectionGrid seatConfig={seatConfig} onSeatSelection={onSeatSelect} />
    );
  }


  return (
    <div className="seat-selection p-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">
        Select Your Seat
      </h2>
      {renderSeats()}
    </div>
  );
};

export default SeatSelection;
