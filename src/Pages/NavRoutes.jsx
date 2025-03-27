import React, { useState, useEffect, useMemo } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaSave, FaFilter } from "react-icons/fa";
import citiesData from "../utils/cities.json"; 
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; 
import BusBookingFlow from "../Components/BusBookingFlow ";
import FilterSection from "../Components/FilterSection";
import axios from "axios";
import useBookingStore from "../store";

const NavRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.initialPickup || !location.state?.initialDrop || !location.state?.initialDate) {
      navigate("/"); 
    }
  }, [location, navigate]);

  const initialState = useMemo(() => {    
    return {
      pickup: location.state?.initialPickup || "All",
      drop: location.state?.initialDrop || "All",
      journeyDate: location.state?.initialDate 
        ? new Date(location.state.initialDate).toLocaleDateString() 
        : "Not Selected"
    };
  }, [location.state]);

  const[loading, setLoading] = useState(false);

  const { holdSeats, setHoldSeats, clearSeats } = useBookingStore();
  const [routes, setRoutes] = useState([]);
  const { fetchHoldSeats, pickup, setPickup, drop, setDrop, journeyDate, setJourneyDate } = useBookingStore();
  const [selectedRouteForSeat, setSelectedRouteForSeat] = useState(null);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [filters, setFilters] = useState({
    departureTime: [],  
    arrivalTime: [],  
    acType: [],         
    priceRange: []      
  });

  const fetchRoutes = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/routes.php?op=front_fetch`
      );

      if(response.data.success && response.data.routes) {
        setRoutes(response.data.routes);
        setFilteredRoutes(response.data.routes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedValues = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];

      return { ...prevFilters, [category]: updatedValues };
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [tempPickup, setTempPickup] = useState(pickup);
  const [tempDrop, setTempDrop] = useState(drop);
  const [tempDate, setTempDate] = useState(
    journeyDate && journeyDate !== "Not Selected" ? new Date(journeyDate) : null
  );
  
  const [cityResults, setCityResults] = useState([]); 
  const [searchType, setSearchType] = useState(""); 

  useEffect(() => {
    setPickup(initialState.pickup);
    setDrop(initialState.drop);
    setJourneyDate(initialState.journeyDate);
  }, [initialState]);

  const handleCitySearch = (value, type) => {
    setSearchType(type);
    if (value.length > 1) {
      const results = citiesData.cities.filter((city) =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setCityResults(results);
    } else {
      setCityResults([]);
    }
  };

  const handleCitySelect = (city) => {
    if (searchType === "pickup") {
      setTempPickup(city);
    } else {
      setTempDrop(city);
    }
    setCityResults([]); 
  };
  
  const handleSave = () => {
    setIsEditing(false);
    const formattedDate = typeof tempDate === 'string' 
      ? tempDate 
      : tempDate.toLocaleDateString();

    navigate("", {
      state: {
        initialPickup: tempPickup, 
        initialDrop: tempDrop, 
        initialDate: formattedDate
      }, 
      replace: true
    });
  };

  const formatTime = (time) => {
    let hour, minute, period;

    if (/AM|PM/i.test(time)) {
        [hour, period] = time.split(/(AM|PM)/i).map(str => str.trim());

        if (!hour.includes(":")) {
            hour += ":00";
        }
        return `${hour} ${period.toUpperCase()}`;
    }

    if (time.includes(":")) {
        [hour, minute] = time.split(":").map(str => str.trim());
    } else {
        hour = time.trim();
        minute = "00"; 
    }

    hour = parseInt(hour, 10);

    if (hour === 0) {
        period = "AM";
        hour = 12;
    } else if (hour === 12) {
        period = "PM";
    } else if (hour > 12) {
        period = "PM";
        hour -= 12;
    } else {
        period = "AM";
    }

    return `${hour}:${minute} ${period}`;
};


  const convertTo24Hour = (time) => {
      let [hour, minutePart] = time.split(":");
      
      let [minute, period] = minutePart.split(" ");
    
      hour = parseInt(hour, 10);
      minute = parseInt(minute || 0, 10);
    
      if (period.toLowerCase() === "pm" && hour !== 12) {
          hour += 12;
      } else if (period.toLowerCase() === "am" && hour === 12) {
          hour = 0;
      }

      return hour * 60 + minute; 
  };

  const isTimeInRange = (time, range) => {
    const timeInMinutes = convertTo24Hour(formatTime(time));
    if(range.includes("After")) { 
        let start = convertTo24Hour(formatTime('6 pm'));
        let end = convertTo24Hour('11:59 pm');
        
        return timeInMinutes >= start && timeInMinutes <= end;
    } else if(range.includes("Before")) {
      let start = convertTo24Hour(formatTime('12 am'));
      let end = convertTo24Hour(formatTime('6 am'));
        return timeInMinutes >= start && timeInMinutes <= end;
    } else {
      let [start, end] = range.split(" - ");
      start = convertTo24Hour(formatTime(start));
      end = convertTo24Hour(formatTime(end));
      return timeInMinutes >= start && timeInMinutes <= end;
    }
  };

  useEffect(() => {
    let filtered = routes;
    if (pickup && pickup !== "All") {
      filtered = filtered.filter((route) => route.source === pickup);
    }
    if (drop && drop !== "All") {
      filtered = filtered.filter((route) => route.destination === drop);
    }
    if (journeyDate && journeyDate !== "Not Selected") {
      const [month, day, year] = journeyDate.split("/");
      const formattedJourneyDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      filtered = filtered.filter((route) => formattedJourneyDate === route.start_date);
    }
    
    if (filters.departureTime.length > 0) {
      filtered = filtered.filter((route) => {
        return filters.departureTime.some((entry) => isTimeInRange(route.start_time, entry));
      });
    }
    
    if (filters.arrivalTime.length > 0) {
      filtered = filtered.filter((route) => filters.arrivalTime.some((entry) => isTimeInRange(route.end_time, entry)));
    }

    if (filters.acType.length > 0) {
      filtered = filtered.filter((route) => 
        filters.acType.some((entry) => 
          route.features?.split(',')
          .map((feature) => feature.replace(/["']/g, "").trim())
          .some((feature) => feature === entry) 
        )
      );
    }
    

    if (filters.priceRange.length > 0) {
      filtered = filtered.filter((route) => {
        return filters.priceRange.some((range) => {
          if (range.includes("Under")) {
            let maxPrice = Number(range.split("Under ")[1]);
            return Number(route.price) <= maxPrice;
          } else if (range.includes("Above")) {
            let minPrice = Number(range.split("Above ")[1]);
            return Number(route.price) >= minPrice;
          } else {
            const [min, max] = range.split("-").map(Number);
            return Number(route.price) >= min && Number(route.price) <= max;
          }
        });
      });
    }
    

    setFilteredRoutes(filtered);
  }, [pickup, drop, journeyDate, filters, routes]);

  useEffect(() => {
    fetchHoldSeats();
  }, [routes, pickup, drop, journeyDate]);

  const handleViewSeat = (route) => {
    setSelectedRouteForSeat(route);
  }
  
  const handleCloseViewSeat = () => {
    setSelectedRouteForSeat(null);
  }
  return (
    <section className="mt-36 py-8 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="container mx-auto px-4 lg:px-6">
        
        <div className="bg-black text-white p-4 sm:p-6 rounded-lg shadow-lg relative">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-3 items-center w-full relative">
                <div className="flex flex-col sm:flex-row items-center w-full gap-3">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={tempPickup}
                      onChange={(e) => {
                        setTempPickup(e.target.value);
                        handleCitySearch(e.target.value, "pickup");
                      }}
                      className="bg-white text-black px-3 py-2 rounded-md outline-none w-full"
                      placeholder="Enter Pickup"
                    />
                    {cityResults.length > 0 && searchType === "pickup" && (
                      <ul className="absolute bg-white text-black w-full mt-1 rounded shadow-lg z-10">
                        {cityResults.map((city) => (
                          <li
                            key={city.id}
                            onClick={() => handleCitySelect(city.name)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                          >
                            {city.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <span className="hidden sm:block text-2xl">➝</span>

                  <div className="relative w-full mt-3 sm:mt-0">
                    <input
                      type="text"
                      value={tempDrop}
                      onChange={(e) => {
                        setTempDrop(e.target.value);
                        handleCitySearch(e.target.value, "drop");
                      }}
                      className="bg-white text-black px-3 py-2 rounded-md outline-none w-full"
                      placeholder="Enter Drop"
                    />
                    {cityResults.length > 0 && searchType === "drop" && (
                      <ul className="absolute bg-white text-black w-full mt-1 rounded shadow-lg z-10">
                        {cityResults.map((city) => (
                          <li
                            key={city.id}
                            onClick={() => handleCitySelect(city.name)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                          >
                            {city.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="w-full mt-3 sm:mt-0">
                    <DatePicker
                      selected={typeof tempDate === 'string' ? new Date(tempDate) : tempDate}
                      onChange={(date) => setTempDate(date)}
                      className="p-2 sm:p-3 bg-white text-black border rounded w-full focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                      placeholderText="Select Date"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                <h2 className="text-base sm:text-xl font-bold flex items-center gap-2 mb-3 sm:mb-0">
                  <FaMapMarkerAlt className="text-yellow-500 text-sm sm:text-base" />
                  <span className="flex items-center gap-2">
                    {pickup} <span className="text-xl">➝</span> {drop}
                  </span>
                  {journeyDate !== "Not Selected" && (
                    <span className="bg-white text-black px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium ml-2 sm:ml-3 shadow-sm">
                      <FaCalendarAlt className="inline-block mr-1 text-sm" /> {journeyDate}
                    </span>
                  )}
                </h2>
              </div>
            )}

            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium transition w-full sm:w-auto text-center justify-center"
            >
              {isEditing ? <FaSave /> : <FaEdit />}
              {isEditing ? "Save" : "Modify"}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6 ">
        {/* Filters Section */}
        <div className="w-full md:w-1/4 ">
            <FilterSection
              filters={filters}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>

        {/* Routes Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <FaMapMarkerAlt className="text-yellow-500" /> Available Journeys
          </h2>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-600">Loading routes...</p>
            </div>
          )     
          : (<div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          {/* Desktop View */}
          <div className="hidden md:block">
            {filteredRoutes.length > 0 ? (
              <div className="grid grid-cols-6 gap-4 border-b bg-black text-white text-sm p-3 rounded-t-lg">
                <div>Car & Features</div>
                <div>Departure</div>
                <div className="hidden md:block">Duration</div>
                <div>Arrival</div>
                <div>Fare</div>
                <div>Seats</div>
              </div>
            ) : null}

            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((item) => (
                <div key={item.r_id}>
                <div key={item.r_id}  className="grid grid-cols-6 gap-4 items-center border-b p-4 text-sm hover:bg-gray-100">
                  
                  {/* Car & Features */}
                  <div className="font-semibold">{item.vehicle_name} <span className="bg-gray-200 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {item.features.includes("Non-AC") ? "Non-AC" : "AC"}
                  </span></div>

                  {/* Departure */}
                  <div>
                    <p className="text-gray-600">{item.start_time} - {item.source}</p>
                    <p className="font-bold">{item.start_date}</p>
                  </div>

                  {/* Duration (Hidden on smaller screens) */}
                  <div className="hidden md:block text-gray-600">
                  {item?.duration ? (() => {
                                              const parts = item.duration.split(":");
                                              const hours = parts[0] || "0"; 
                                              const minutes = parts[1] ? `${parts[1]}min` : ""; 
                                              return `${hours}h ${minutes}`;
                                    })() : "N/A"}
                  </div>

                  {/* Arrival */}
                  <div>
                    <p className="text-gray-600">{item.end_time} - {item.destination}</p>
                    <p className="font-bold">{item.end_date}</p>
                  </div>

                  {/* Fare */}
                  <div className="text-yellow-600 font-bold">₹{item.price}</div>

                  {/* Seats & Button */}
                  <div className="flex flex-col items-center">
                    <p>{item.availableSeats} available</p>
                    <button onClick={() => {
                      if(selectedRouteForSeat !== null && selectedRouteForSeat.r_id === item.r_id) {
                        handleCloseViewSeat();
                      }else  {
                        handleViewSeat(item);
                      }
                    }} className="mt-2 px-3 py-1 bg-black text-white text-xs font-semibold rounded hover:bg-gray-600">
                      {selectedRouteForSeat?.r_id === item.r_id  ? 'Close' : 'View seats'}
                    </button>
                  </div>
                </div>
                {selectedRouteForSeat?.r_id === item.r_id && holdSeats && (
                  <BusBookingFlow 
                    key={item.r_id}  
                    capacity={item.capacity} 
                    seatConfig = {JSON.parse(item.seat_config)}
                    boardingPoints={JSON.parse(item.boarding_points || "[]")} 
                    dropingPoints={JSON.parse(item.drop_points || "[]")} 
                    route={item}
                    journeyDate={journeyDate}
                  />
                )}

                </div>
              ))
            ) : (
              <div className="p-4 text-center">
                <FaMapMarkerAlt className="text-yellow-500 text-4xl mb-4" />
                <p className="text-gray-600">No routes found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex flex-col gap-4">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((item) => (
                <div key={item.r_id} className="border rounded-lg p-4 shadow-md bg-white">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{item.vehicle_name}</h3>
                    <span className="text-yellow-600 font-bold">₹{item.price}</span>
                  </div>
                  <span className="bg-gray-200 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {item.features}
                  </span>
                  <div className="mt-2 text-gray-600">
                    <p className="text-sm"><span className="font-semibold">Departure:</span> {item.start_time} - {item.source}</p>
                    <p className="text-sm"><span className="font-semibold">Arrival:</span> {item.end_time} - {item.destination}</p>
                    <p className="text-sm"><span className="font-semibold">Date:</span> {item.start_date}</p>
                    <p className="text-sm"><span className="font-semibold">Duration:</span> 
                    {item?.duration ? (() => {
                                              const parts = item.duration.split(":");
                                              const hours = parts[0] || "0"; 
                                              const minutes = parts[1] ? `${parts[1]}min` : ""; 
                                              return `${hours}h ${minutes}`;
                                    })() : "N/A"}
                    </p>
                    <p className="text-sm"><span className="font-semibold">Seats Available:</span> {item.capacity}</p>
                  </div>
                  <button onClick={() => {
                      if(selectedRouteForSeat !== null && selectedRouteForSeat.r_id === item.r_id) {
                        handleCloseViewSeat();
                      }else  {
                        handleViewSeat(item);
                      }
                    }} className="mt-3 w-full px-3 py-2 bg-black text-white text-sm font-semibold rounded hover:bg-yellow-600">
                    {selectedRouteForSeat?.r_id === item.r_id ? 'Close' : 'View Seats'}
                  </button>
                  {selectedRouteForSeat?.r_id === item.r_id && (
                    <BusBookingFlow 
                      key={item.r_id}  
                      capacity={item.capacity} 
                      seatConfig = {JSON.parse(item.seat_config)}
                      boardingPoints={JSON.parse(item.boarding_points || "[]")} 
                      dropingPoints={JSON.parse(item.drop_points || "[]")} 
                      route={item}
                      journeyDate={journeyDate}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">
                <FaMapMarkerAlt className="text-yellow-500 text-4xl mb-4" />
                <p>No routes found matching your criteria.</p>
              </div>
            )}
          </div>

          </div>)}
        </div>
        </div>
      </div>
    </section>
  );
};

export default NavRoutes;