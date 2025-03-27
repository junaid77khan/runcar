import { create } from "zustand";
import axios from "axios";

const useBookingStore = create((set, get) => ({
  holdSeats: [], // Holds booked seats
  pickup: "", // Pickup location
  drop: "", // Drop location
  journeyDate: "", // Journey date

  // Update pickup location
  setPickup: (pickup) => set({ pickup }),

  // Update drop location
  setDrop: (drop) => set({ drop }),

  // Update journey date
  setJourneyDate: (date) => set({ journeyDate: date }),

  // Set hold seats after clearing previous ones
  setHoldSeats: (seats) => set({ holdSeats: seats }),

  // Clear all held seats
  clearSeats: () => set({ holdSeats: [] }),

  // Add a seat to holdSeats
  addSeat: (seat) => set((state) => ({ holdSeats: [...state.holdSeats, seat] })),

  // Remove a seat from holdSeats
  removeSeat: (seatId) => set((state) => ({
    holdSeats: state.holdSeats.filter((seat) => seat.id !== seatId),
  })),

  // Fetch hold seats based on pickup, drop, and journeyDate
  fetchHoldSeats: async () => {
    const { pickup, drop, journeyDate, clearSeats, setHoldSeats } = get();

    if (!pickup || !drop || !journeyDate) {
      console.warn("Pickup, drop, or journeyDate is missing");
      return;
    }

    const [month, day, year] = journeyDate.split("/").map(Number);
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/routes.php?op=hold_seats&pickup=${pickup}&drop=${drop}&date=${formattedDate}`
      );

      if (response.data.success && response.data.bookedSeats) {
        clearSeats(); // Clear previous seats
        setHoldSeats(response.data.bookedSeats);
      }
    } catch (error) {
      console.error("Error fetching hold seats:", error);
    }
  },
}));

export default useBookingStore;
