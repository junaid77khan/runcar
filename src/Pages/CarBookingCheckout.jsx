import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  CreditCard, 
  QrCode, 
  Timer, 
  ChevronRight, 
  User, 
  Check, 
  ArrowRight
} from "lucide-react";

const Spinner = () => (
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-4 border-yellow-500 border-t-transparent"></div>
  </div>
);

const PaymentMethodButton = ({ method, selectedMethod, onSelect }) => (
  <button
    className={`
      flex items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all duration-300
      ${selectedMethod === method 
        ? 'border-yellow-600 bg-yellow-50 text-yellow-700' 
        : 'border-gray-300 hover:border-yellow-400 hover:bg-gray-50'}
    `}
    onClick={() => onSelect(method)}
  >
    {method === 'Credit Card' && <CreditCard className="w-5 h-5" />}
    {method === 'UPI' && <QrCode className="w-5 h-5" />}
    {method === 'Net Banking' && <Check className="w-5 h-5" />}
    {method}
  </button>
);

const CarBookingCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    contactDetails, 
    passengers, 
    s_id, 
    price, 
    route, 
    journeyDate, 
    selectedBoarding, 
    selectedDropoff 
  } = location.state || {};
  
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(price);
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discount, setDiscount] = useState("");

  // Timer and Booking Logic remain the same as in the previous implementation
  useEffect(() => {
    const storedExpiryTime = localStorage.getItem('bookingTimerExpiry');
    
    if (!storedExpiryTime) {
      const expiryTime = Date.now() + (10 * 60 * 1000);
      localStorage.setItem('bookingTimerExpiry', expiryTime.toString());
    }

    const timerInterval = setInterval(() => {
      const storedExpiry = localStorage.getItem('bookingTimerExpiry');
      if (storedExpiry) {
        const remainingTime = Math.max(0, Math.floor((Number(storedExpiry) - Date.now()) / 1000));
        
        setTimeRemaining(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          handleTimerExpiry();
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleTimerExpiry = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/booking.php?op=pre_book`, {
        r_id: route.r_id,
        date_of_journey: journeyDate
      });

      localStorage.removeItem('bookingTimerExpiry');
      toast.error("Booking time expired. Redirecting to routes.");
      navigate('/routes');
    } catch (error) {
      console.error("Timer expiry error:", error);
      navigate('/routes');
    }
  };

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const checkoutHandler = async () => {
    console.log("Called");
    try {
      setIsPaymentLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/booking.php?op=final_book`;
      const cancelUrl = `${import.meta.env.VITE_API_URL}/booking.php?op=pre_book`;
  
      let successfulBookings = [];
  
      const bookingPromises = passengers.map(async (passenger) => {
        const u_id = localStorage.getItem("u_id") || "";
        const data = new FormData();
        data.append("u_id", u_id);
        data.append("r_id", route.r_id);
        data.append("date_of_journey", journeyDate);
        data.append("seat_no", passenger.seat);
        data.append("v_id", "");
        data.append("date_of_booking", "");
        data.append("boarding_point", selectedBoarding);
        data.append("drop_point", selectedDropoff);
        data.append("total_fare", totalPrice);
        data.append("payment_status", "paid");
        data.append("payment_method", paymentMethod || "UPI");
        data.append("transaction_id", "txn_id");
        data.append("booking_status", "confirmed");
        data.append("cancellation_reason", "");
        data.append("cancellation_date", "");
        data.append("refund_amount", "");
  
        try {
          const response = await axios.post(url, data);
          if (response.data.success) {
            successfulBookings.push(data); 
          }
          return response;
        } catch (err) {
          console.error("Error in booking for seat:", passenger.seat, err);
          return { data: { success: false } }; 
        }
      });
  
      const responses = await Promise.all(bookingPromises);
      const allSuccessful = responses.every((res) => res.data.success);
  
      if (allSuccessful) {
        // Remove timer from localStorage on successful booking
        localStorage.removeItem('bookingTimerExpiry');
        navigate(`/confirmation`, {
          state: {
            contactDetails,
            passengers,
            s_id,
            price,
            route,
            journeyDate,
            selectedBoarding,
            selectedDropoff
          },
        });
      } else {
        if (successfulBookings.length > 0) {
          await Promise.all(
            successfulBookings.map(async (booking) => {
              const data = new FormData();
              data.append("r_id", route.r_id);
              data.append("date_of_journey", journeyDate);
              data.append("seat_no", booking.seat_no);
              await axios.post(cancelUrl, data);
            })
          );
        }
        toast.error("Some bookings failed. Please try again.");
      }
    } catch (err) {
      console.error("Error in booking:", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="mt-36 min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Timer */}
      <div className="fixed top-6 right-6 z-50 bg-red-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg">
        <Timer className="mr-2" />
        {formatTimer(timeRemaining)}
      </div>

      <ToastContainer />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Payment Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Payment Details</h1>

            {/* Discount Input */}
            <div className="bg-gray-100 p-4 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Discount Code</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button className="bg-yellow-600 text-white px-6 rounded-lg hover:bg-yellow-700 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose Payment Method</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Credit Card', 'UPI', 'Net Banking'].map((method) => (
                  <PaymentMethodButton
                    key={method}
                    method={method}
                    selectedMethod={paymentMethod}
                    onSelect={setPaymentMethod}
                  />
                ))}
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              className="w-full bg-yellow-600 text-white py-4 rounded-xl hover:bg-yellow-700 transition-colors relative"
              onClick={() => {
                console.log("Ok")
                setIsPaymentLoading(true);
                checkoutHandler();
              }}
              // disabled={isPaymentLoading || !paymentMethod}
            >
              {isPaymentLoading ? <Spinner /> : 'Proceed to Payment'}
            </button>
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Booking Overview</h1>

          {/* Journey Details */}
          <div className="bg-gray-100 rounded-xl p-6 mb-6">
          
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <MapPin className="text-green-600 mr-2" />
                <p className="text-sm text-gray-600">Boarding Point - {selectedBoarding}</p>
              </div>
              <ChevronRight className="text-gray-500" />
              <div className="flex items-center">
                <MapPin className="text-red-600 mr-2" />
                <p className="text-sm text-gray-600">Destination Point - {selectedDropoff}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <User className="mr-2 w-4 h-4" />
                {passengers.length} Passengers
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left my-4">
            {/* Boarding Section */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Boarding</p>
              <p className="font-semibold">{route.source}</p>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="mr-2" size={16} />
                {new Date(`${route.start_date}T${route.start_time}`).toLocaleString("en-US", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>

            <ArrowRight className="mx-4 text-gray-500 hidden sm:block" size={24} />

            {/* Destination Section */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Destination</p>
              <p className="font-semibold">{route.destination}</p>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="mr-2" size={16} />
                {new Date(`${route.end_date}T${route.end_time}`).toLocaleString("en-US", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
          </div>
          </div>

          {/* Passenger Details */}
          <div className="bg-gray-100 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Passenger Information</h2>
            <div className="space-y-4">
              {passengers.map((passenger, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{passenger.name}</p>
                    <p className="text-sm text-gray-600">
                      {passenger.age} years | {passenger.gender}
                    </p>
                  </div>
                  <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Seat {passenger.seat}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Price */}
          <div className="mt-6 bg-yellow-50 p-4 rounded-xl flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">Total Amount</span>
            <span className="text-2xl font-extrabold text-yellow-700">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarBookingCheckout;