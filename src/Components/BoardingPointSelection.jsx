import React, { useState } from 'react';

const BoardingPointSelection = ({ boardingPoints=[], dropingPoints=[], onPointSelect, SelectedBoarding, SelectedDropoff }) => {
    const [selectedBoarding, setSelectedBoarding] = useState(SelectedBoarding);
    const [selectedDropoff, setSelectedDropoff] = useState(SelectedDropoff);
  
    return (
      <div className="boarding-selection space-y-4">
        <div>
          <h3 className="font-bold mb-2">Select Boarding Point</h3>
          {boardingPoints.length > 0 ? (
            boardingPoints.map((point, index) => (
              <div 
                key={index}
                onClick={() => setSelectedBoarding(point)}
                className={`
                  p-3 border rounded-lg cursor-pointer mb-2 
                  ${selectedBoarding === point
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-100'}
                `}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{typeof point === 'object' ? point.name : point}</p>
                    <p className="text-sm">{typeof point === 'object' ? point.address : ''}</p>
                  </div>
                  <p className="font-bold">{typeof point === 'object' ? point.time : ''}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No boarding points available</p>
          )}
        </div>
  
        <div>
          <h3 className="font-bold mb-2">Select Drop-off Point</h3>
          {dropingPoints.length > 0 ? (
            dropingPoints.map((point, index) => (
              <div 
                key={index}
                onClick={() => setSelectedDropoff(point)}
                className={`
                  p-3 border rounded-lg cursor-pointer mb-2
                  ${selectedDropoff === point 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-100'}
                `}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{typeof point === 'object' ? point.name : point}</p>
                    <p className="text-sm">{typeof point === 'object' ? point.address : ''}</p>
                  </div>
                  <p className="font-bold">{typeof point === 'object' ? point.time : ''}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No drop-off points available</p>
          )}
        </div>
  
        <button 
          onClick={() => onPointSelect(selectedBoarding, selectedDropoff)}
          disabled={!selectedBoarding || !selectedDropoff}
          className="w-full bg-black text-white p-3 rounded-lg 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Points
        </button>
      </div>
    );
  };

export default BoardingPointSelection;