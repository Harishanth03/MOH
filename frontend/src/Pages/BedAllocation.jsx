import React, { useState } from 'react'

const wards = [
  'Accident Ward',
  'Surgery Ward',
  'Male Ward',
  'Female Ward',
  'Pediatric Ward',
  'Maternity Ward',
  'ICU',
];

const BedAllocation = () => {

  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedWardNumber, setSelectedWardNumber] = useState(null);

  const wardNumbers = Array.from({ length: 20 }, (_, i) => `Ward ${i + 1}`);
  const bedNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="p-6 min-h-screen sm:min-h-[80vh] border m-6 rounded-lg border-blue-500 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Bed Allocation</h1>

      {/* WARD SELECTION */}
      {!selectedWard && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wards.map((ward, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedWard(ward)}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
            >
              <h2 className="text-xl font-semibold text-gray-700">{ward}</h2>
            </div>
          ))}
        </div>
      )}

      {/* WARD NUMBER SELECTION */}
      {selectedWard && !selectedWardNumber && (
        <>
          <button
            onClick={() => setSelectedWard(null)}
            className="mb-4 text-blue-600 underline"
          >
            ← Back to Wards
          </button>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            {selectedWard} - Select Ward Number
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {wardNumbers.map((wardNum, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedWardNumber(wardNum)}
                className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-blue-100"
              >
                {wardNum}
              </div>
            ))}
          </div>
        </>
      )}

      {/* BED SELECTION */}
      {selectedWard && selectedWardNumber && (
        <>
          <button
            onClick={() => setSelectedWardNumber(null)}
            className="mb-4 text-blue-600 underline"
          >
            ← Back to {selectedWard}
          </button>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            {selectedWardNumber} – Available Beds
          </h2>
          <div className="grid grid-cols-6 gap-4 justify-items-center">
            {bedNumbers.map((bed) => (
              <div
                key={bed}
                className="w-12 h-12 flex items-center justify-center rounded bg-blue-200 hover:bg-blue-300 text-sm font-semibold cursor-pointer shadow"
              >
                {bed}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default BedAllocation