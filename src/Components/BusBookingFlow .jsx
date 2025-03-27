import React, { useEffect, useState } from 'react';
import UserInfoModal from './UserInfoModal ';
import SeatSelection from './SeatSelection';
import FinalSelectedData from './FinalSelectedData';
import BoardingPointSelection from './BoardingPointSelection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusBookingFlow = ({capacity, seatConfig, boardingPoints=[], dropingPoints=[], route, journeyDate}) => {
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [price, setPrice] = useState(0);
    const [selectedBoarding, setSelectedBoarding] = useState(null);
    const [selectedDropoff, setSelectedDropoff] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAll, setSelectedAll] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleSeatSelect = (seat) => {
      setSelectedSeat((prevSeats) => {
        const isSelected = prevSeats.includes(seat);
        const updatedSeats = isSelected ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat];
    
        // Update the price after determining seat selection
        setPrice((prevPrice) => 
          isSelected 
            ? parseFloat((prevPrice - parseFloat(route.price)).toFixed(2)) 
            : parseFloat((prevPrice + parseFloat(route.price)).toFixed(2))
        );
    
        return updatedSeats;
      });
    };
    

    const onBack = () => {
      setSelectedAll(false);
    }
  
    const handlePointSelect = (boarding, dropoff) => {
      setSelectedBoarding(boarding);
      setSelectedDropoff(dropoff);
      setSelectedAll(true);
    };
    const navigate = useNavigate();
    const handleUserSubmit = async (formData) => {
      try {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_URL}/booking.php?op=pre_book`;
        const cancelUrl = `${import.meta.env.VITE_API_URL}/booking.php?op=delete_pre_book`;
    
        let successfulSeats = [];
    
        const bookingPromises = formData.passengers.map(async (passenger) => {
          const data = new FormData();
          data.append("r_id", route.r_id);
          data.append("date_of_journey", journeyDate);
          data.append("seat_no", passenger.seat);
    
          try {
            const response = await axios.post(url, data);
            if (response.data.success) {
              successfulSeats.push(passenger.seat);
            //   setTimeout(() => {
            //     location.reload(); 
            // }, 3000); 
            } else if(response.data.unavailable) {
                      toast.error(`${response.data.message}`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
            }
            return response;
          } catch (err) {
            console.error("Error in pre-booking for seat:", passenger.seat, err);
            return { data: { success: false } }; // Return failed response
          }
        });
    
        const responses = await Promise.all(bookingPromises);
        const allSuccessful = responses.every((res) => res.data.success);
    
        if (allSuccessful) {
          const s_id = responses[0].data.s_id;
          navigate(`pay`, {
            state: {
              contactDetails: formData.contactDetails,
              passengers: formData.passengers,
              s_id: s_id,
              price: price,
              route,
              journeyDate,
              selectedBoarding,
              selectedDropoff
            },
          });
        } else {
          if (successfulSeats.length > 0) {
            await Promise.all(
              successfulSeats.map(async (seat) => {
                const data = new FormData();
                data.append("r_id", route.r_id);
                data.append("date_of_journey", journeyDate);
                data.append("seat_no", seat);
                await axios.post(cancelUrl, data);
              })
            );
          }
          toast.error("Some bookings failed. Please try again.");
        }
      } catch (err) {
        console.error("Error in pre-booking:", err);
        toast.error("Something went wrong. Please try again later.");
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
            selectedSeat={selectedSeat} 
            seatConfig={seatConfig}
            onSeatSelect={handleSeatSelect}
            route={route}
          />}
          {selectedSeat.length > 0 && !selectedAll && (
            <BoardingPointSelection
              boardingPoints={boardingPoints}
              dropingPoints={dropingPoints}
              onPointSelect={handlePointSelect} 
              SelectedBoarding={selectedBoarding}
              SelectedDropoff={selectedDropoff}
            />
          )}
          {selectedSeat.length > 0 && !selectedAll && boardingPoints && dropingPoints && (boardingPoints.length === 0 || dropingPoints.length === 0) && (
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
            selectedSeat.length > 0 && selectedAll && (
                <FinalSelectedData
                    route={route}
                    selectedSeat={selectedSeat}
                    selectedBoarding={selectedBoarding}
                    selectedDropoff={selectedDropoff}
                    onProceed={handleProceed}
                    onBack={onBack}
                    price={price}
                />
            )
          }
        </div>
  
        <UserInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUserSubmit}
          loading={loading}
          setLoading={setLoading}
          selectedSeat={selectedSeat}
          route={route}
        />
      </div>
    );
  };
  
export default BusBookingFlow;