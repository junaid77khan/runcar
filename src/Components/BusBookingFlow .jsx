import React, { useEffect, useState } from 'react';
import UserInfoModal from './UserInfoModal ';
import SeatSelection from './SeatSelection';
import FinalSelectedData from './FinalSelectedData';
import BoardingPointSelection from './BoardingPointSelection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusBookingFlow = ({capacity, seatConfig, boardingPoints=[], dropingPoints=[], route, journeyDate}) => {
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedBoarding, setSelectedBoarding] = useState(null);
    const [selectedDropoff, setSelectedDropoff] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAll, setSelectedAll] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleSeatSelect = (seat) => {
      setSelectedSeat(seat);
    };
  
    const handlePointSelect = (boarding, dropoff) => {
      setSelectedBoarding(boarding);
      setSelectedDropoff(dropoff);
      setSelectedAll(true);
    };
  
    const handleUserSubmit = async (userData) => {
      // const loginTime = Date.now(); // Current timestamp in milliseconds
      // const expiryTime = loginTime + 60 * 60 * 1000; // 1 hour validity
      
      // localStorage.setItem("u_id", userId);  // Store user ID
      // localStorage.setItem("expiry", expiryTime); // Store expiry time
      
      if (!localStorage.getItem("u_id") || Date.now() > localStorage.getItem("expiry")) {
        // If no user ID or the expiry time has passed, log out
        localStorage.removeItem("u_id");
        localStorage.removeItem("expiry");
        alert("Session expired. Please log in again.");
        window.location.href = "login.html"; // Redirect to login page
      }
        let formData = new FormData();
        formData.append("seat_no", selectedSeat);
        formData.append("v_id", route.v_id);
        formData.append("d_id", route.d_id);
        formData.append("date_of_journey", route.d_id);
        formData.append("locked_by", localStorage.getItem("u_id"));
        formData.append("locked_at", new Date().toISOString().slice(0, 19).replace("T", " "));

        let url = `${process.env.VITE_API_URL}/seats.php?op=insert`;

      try {
        setLoading(true);
        const response = await axios.post(url, formData);
        if (response.data.success) {
          // successfully seat locked. Now redirect to Payment page with time limit-10min
        } else {
          toast.error(response.data.message || 'Something went wrong. Please try again later', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            theme: 'colored',
            className: 'bg-red-600 text-white',
          });
        }
      } catch (error) {
        console.error("Error submitting form:", err);
        toast.error('Something went wrong. Please try again later');
      } finally {
        setLoading(false);
      }
    };

    const handleProceed = () => {
        setIsModalOpen(true);
    }  
    return (
      <div className="flex flex-col md:flex-row">
        <div className="w-full p-4">
          {!selectedAll && <SeatSelection
            availableSeats={capacity} 
            seatConfig={seatConfig}
            onSeatSelect={handleSeatSelect} 
          />}
          {selectedSeat && !selectedAll && (
            <BoardingPointSelection
              boardingPoints={boardingPoints}
              dropingPoints={dropingPoints}
              onPointSelect={handlePointSelect} 
            />
          )}
          {selectedSeat && !selectedAll && boardingPoints && dropingPoints && (boardingPoints.length === 0 || dropingPoints.length === 0) && (
            <div className="p-4 border rounded-lg bg-yellow-50">
              <p className="text-center text-yellow-700">
                No boarding or dropping points available. Please contact support.
              </p>
              <button 
                onClick={() => setSelectedAll(true)}
                className="w-full mt-4 bg-black text-white p-3 rounded-lg"
              >
                Continue Anyway
              </button>
            </div>
          )}
          {
            selectedAll && (
                <FinalSelectedData
                    selectedSeat={selectedSeat}
                    selectedBoarding={selectedBoarding}
                    selectedDropoff={selectedDropoff}
                    onProceed={handleProceed}
                />
            )
          }
        </div>
  
        <UserInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUserSubmit}
          loading={loading}
        />
      </div>
    );
  };
  
export default BusBookingFlow;