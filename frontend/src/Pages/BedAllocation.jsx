import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const BedAllocation = () => {
  const { wards, getWards, token } = useContext(AppContext);

  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedWardNumber, setSelectedWardNumber] = useState(null);
  const [selectedBedNo, setSelectedBedNo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allocatedBeds, setAllocatedBeds] = useState([]);


  useEffect(() => {

    if (token) 
    {
      getWards();
    }
  }, [token]);

  const handleBedAllocation = async (bedNo) => {
    setLoading(true);
    setSelectedBedNo(bedNo);

    try {
      const payload = {
        wardName: selectedWard.wardName,
        wardNo: selectedWardNumber.wardNo,
        bedNo: bedNo,
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/user/allocate-bed',
        payload,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message || 'Bed allocated successfully!');
        setSelectedWard(null);
        setSelectedWardNumber(null);
        setSelectedBedNo(null);
      } else {
        toast.error(data.message || 'Failed to allocate bed');
      }
    } catch (error) {
      console.error('Allocation Error:', error);
      toast.error(error.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const fetchAllocatedBeds = async() => {

      if(selectedWard && selectedWardNumber)
      {
        try 
        {

          const { data } = await axios.get(`http://localhost:4000/api/user/allocated-beds`, {

            params: {

              wardName: selectedWard.wardName,

              wardNo: selectedWardNumber.wardNo,

            },

            headers: { token }

          });

          if(data.success)
          {

            setAllocatedBeds(data.allocatedBeds);

          }
          else
          {

            setAllocatedBeds([]);

          }
          
        } 
        catch (error) 
        {
          console.error('Failed to fetch allocated beds', error);

          setAllocatedBeds([]);

        }
      }
    }

    fetchAllocatedBeds();

  } ,[selectedWard, selectedWardNumber])

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
              <h2 className="text-xl font-semibold text-gray-700">{ward.wardName}</h2>
            </div>
          ))}
        </div>
      )}

      {/* WARD NUMBER SELECTION */}
      {selectedWard && !selectedWardNumber && (
        <>
          <button onClick={() => setSelectedWard(null)} className="mb-4 text-blue-600 underline">
            ← Back to Wards
          </button>

          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            {selectedWard.wardName} - Select Ward Number
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {selectedWard.wardNumbers.map((room, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedWardNumber(room)}
                className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-blue-100"
              >
                Ward {room.wardNo}
              </div>
            ))}
          </div>
        </>
      )}

      {/* BED SELECTION */}
      {selectedWard && selectedWardNumber && (
        <>
          <button onClick={() => setSelectedWardNumber(null)} className="mb-4 text-blue-600 underline">
            ← Back to {selectedWard.wardName}
          </button>

          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Ward {selectedWardNumber.wardNo} – Available Beds
          </h2>

          <div className="grid grid-cols-6 gap-4 justify-items-center">
            {Array.from({ length: selectedWardNumber.beds }).map((_, index) => {
  const bedNo = index + 1;
  const isAllocated = allocatedBeds.includes(bedNo);

  return (
    <div
      key={index}
      onClick={() => !isAllocated && handleBedAllocation(bedNo)}
      className={`w-12 h-12 flex items-center justify-center rounded text-sm font-semibold shadow transition cursor-pointer
        ${
          isAllocated
            ? 'bg-red-400 text-white cursor-not-allowed'
            : (loading && selectedBedNo === bedNo)
              ? 'bg-gray-400 cursor-wait'
              : 'bg-green-300 hover:bg-green-400'
        }`}
    >
      {bedNo}
    </div>
  );
})}

          </div>
        </>
      )}
    </div>
  );
};

export default BedAllocation;
