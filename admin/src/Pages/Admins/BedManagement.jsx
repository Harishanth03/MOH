import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../Context/AdminContext';

const BedManagement = () => {
  const { aToken } = useContext(AdminContext);

  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedWardNumber, setSelectedWardNumber] = useState(null);
  const [allocatedBeds, setAllocatedBeds] = useState([]);

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/admin/wards', {
        headers: { aToken }
      });
      setWards(Array.isArray(data) ? data : data.wards || []);
    } catch (error) {
      console.error('Failed to load wards:', error);
      toast.error('Failed to load wards');
    }
  };

  const fetchAllocatedBeds = async () => {
    if (selectedWard && selectedWardNumber) {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/admin/allocated-beds`, {
          params: {
            wardName: selectedWard.wardName,
            wardNo: selectedWardNumber.wardNo,
          },
          headers: { aToken },
        });

        if (data.success) {
          setAllocatedBeds(data.beds);
        } else {
          setAllocatedBeds([]);
        }
      } catch (error) {
        console.error('Failed to fetch allocated beds', error);
        setAllocatedBeds([]);
      }
    }
  };

  useEffect(() => {
    fetchAllocatedBeds();
  }, [selectedWard, selectedWardNumber]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className='mb-3 text-lg font-medium'>Bed Allocations</p>

      <div className='bg-white border p-5 border-gray-300 rounded text-sm text-gray-700 max-h-[80vh] overflow-y-scroll min-h-[60vh]'>

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

        {/* BED TABLE */}
        {selectedWard && selectedWardNumber && (
          <>
            <button onClick={() => setSelectedWardNumber(null)} className="mb-4 text-blue-600 underline">
              ← Back to {selectedWard.wardName}
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Ward {selectedWardNumber.wardNo} – Allocated Beds
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-2 px-4 text-left">Bed No</th>
                    <th className="py-2 px-4 text-left">Patient Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Phone</th>
                    <th className="py-2 px-4 text-left">Allocated At</th>
                  </tr>
                </thead>
                <tbody>
                  {allocatedBeds.map((bed, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{bed.bedNo}</td>
                      <td className="py-2 px-4">{bed.userId?.name}</td>
                      <td className="py-2 px-4">{bed.userId?.email}</td>
                      <td className="py-2 px-4">{bed.userId?.phone_number}</td>
                      <td className="py-2 px-4">{new Date(bed.allocationTime).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
      
    </div>
  );
};

export default BedManagement;