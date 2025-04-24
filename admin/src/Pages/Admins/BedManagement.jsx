import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from '../../Context/AdminContext';

const BedManagement = ({ token }) => {
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allocatedBeds, setAllocatedBeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const {aToken} = useContext(AdminContext);

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/admin/wards', {
        headers: { aToken},
      });
  
      if (Array.isArray(data)) {
        setWards(data);
      } else if (Array.isArray(data.wards)) {
        setWards(data.wards); // if your API response wraps wards in { wards: [...] }
      } else {
        console.error('Unexpected ward data structure:', data);
        toast.error('Unexpected response format from server');
        setWards([]); // prevent map crash
      }
  
    } catch (error) {
      console.error('Failed to load wards:', error);
      toast.error('Failed to load wards');
      setWards([]); // also prevent crash on failure
    }
  };
  

  const fetchAllocatedBeds = async (wardName, wardNo) => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/admin/allocated-beds', {
        params: { wardName, wardNo },
        headers: { aToken: token },
      });
      setAllocatedBeds(data.beds);
    } catch (error) {
      console.error('Failed to load allocated beds:', error);
    }
  };

  const handleCancel = async (bedId) => {
    const reason = prompt("Enter reason for cancellation:");
    if (!reason) return;

    try {
      const { data } = await axios.post(`http://localhost:4000/api/admin/cancel-bed`, { bedId, reason }, {
        headers: { aToken: token }
      });
      toast.success(data.message);
      fetchAllocatedBeds(selectedWard.wardName, selectedRoom.wardNo);
    } catch (error) {
      console.error('Failed to cancel bed:', error);
      toast.error('Failed to cancel bed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin - Bed Allocations</h2>

      {!selectedWard && (
        <div className="grid grid-cols-2 gap-4">
          {wards.map((ward, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedWard(ward)}
              className="p-4 bg-white shadow rounded cursor-pointer hover:bg-blue-50"
            >
              {ward.wardName}
            </div>
          ))}
        </div>
      )}

      {selectedWard && !selectedRoom && (
        <>
          <button onClick={() => setSelectedWard(null)} className="text-blue-600 underline mb-4">← Back to Wards</button>
          <h3 className="text-xl font-semibold mb-2">{selectedWard.wardName} - Select Room</h3>
          <div className="grid grid-cols-4 gap-4">
            {selectedWard.wardNumbers.map((room, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedRoom(room);
                  fetchAllocatedBeds(selectedWard.wardName, room.wardNo);
                }}
                className="p-4 bg-white shadow rounded cursor-pointer hover:bg-blue-50"
              >
                Room {room.wardNo}
              </div>
            ))}
          </div>
        </>
      )}

      {selectedWard && selectedRoom && (
        <>
          <button onClick={() => setSelectedRoom(null)} className="text-blue-600 underline mb-4">← Back to Rooms</button>
          <h3 className="text-xl font-semibold mb-4">
            {selectedWard.wardName} - Room {selectedRoom.wardNo} Allocations
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left">Bed No</th>
                  <th className="py-2 px-4 text-left">User</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Allocated At</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {allocatedBeds.map((bed, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{bed.bedNo}</td>
                    <td className="py-2 px-4">{bed.userId?.name}</td>
                    <td className="py-2 px-4">{bed.userId?.email}</td>
                    <td className="py-2 px-4">{new Date(bed.allocationTime).toLocaleString()}</td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleCancel(bed._id)}
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default BedManagement;