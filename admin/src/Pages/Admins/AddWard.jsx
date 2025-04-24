import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../Context/AdminContext';

const AddWard = () => {
  const { aToken } = useContext(AdminContext);

  const [wardName, setWardName] = useState('');
  const [rooms, setRooms] = useState([{ wardNo: 1, beds: 10 }]);
  const [view, setView] = useState('add'); // 'add' or 'manage'
  const [wardList, setWardList] = useState([]);

  const addRoom = () => {
    setRooms([...rooms, { wardNo: rooms.length + 1, beds: 10 }]);
  };

  const updateRoom = (index, key, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][key] = parseInt(value) || 0;
    setRooms(updatedRooms);
  };

  const removeRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      wardName,
      wardNumbers: rooms,
    };

    try {
      const response = await axios.post(
        'http://localhost:4000/api/admin/ward',
        payload,
        { headers: { aToken } }
      );

      if (response.status === 201) {
        toast.success(response.data.message || 'Ward saved successfully!');
        setWardName('');
        setRooms([{ wardNo: 1, beds: 10 }]);
        fetchWards();
      } else {
        toast.error(response.data.message || 'Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error saving ward:', error);
      toast.error(error.response?.data?.message || 'Server error. Please try again.');
    }
  };

  const fetchWards = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/admin/wards' , { headers: { aToken } });
      console.log("Fetched data:", data); // Debug what’s returned
      if (Array.isArray(data)) {
        setWardList(data); // Only set if it's an array
      } else {
        console.error('Expected an array, got:', typeof data);
        setWardList([]);
      }
    } catch (error) {
      console.error('Error fetching wards:', error);
      setWardList([]); // prevent crashing UI
    }
  };

  useEffect(() => {
    fetchWards();
  }, []);

  return (
    <div className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Ward Management</p>

      <div className='bg-white p-4 border my-4 border-gray-300 rounded flex justify-center flex-col items-center gap-2 max-w-4xl'>
        <div className='flex items-center flex-col md:flex-row justify-center gap-2'>
          <button
            onClick={() => setView('add')}
            className={`px-8 py-2 rounded-md text-white cursor-pointer ${view === 'add' ? 'bg-blue-700' : 'bg-blue-500'}`}
          >
            Add Ward
          </button>
          <button
            onClick={() => setView('manage')}
            className={`px-8 py-2 rounded-md text-white cursor-pointer ${view === 'manage' ? 'bg-blue-700' : 'bg-blue-500'}`}
          >
            Ward Management
          </button>
        </div>
      </div>

      {view === 'add' ? (
        <form onSubmit={handleSubmit} className='bg-white border border-gray-300 px-8 py-8 rounded w-full max-w-4xl'>
          <div className='w-full flex flex-col gap-6 md:gap-0'>
            <div className='flex flex-col md:grid md:grid-cols-2 gap-4 w-full'>
              <div className='w-full flex flex-col gap-2'>
                <label htmlFor="ward-name">Ward name</label>
                <input
                  type="text"
                  value={wardName}
                  onChange={(e) => setWardName(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary'
                  placeholder='Ward name'
                  id='ward-name'
                />
              </div>

              <div className='w-full md:mt-7.5 flex flex-col gap-2'>
                <button
                  type='button'
                  onClick={addRoom}
                  className='w-full p-2 bg-blue-500 rounded-md text-white cursor-pointer'
                >
                  Add Room
                </button>
              </div>
            </div>

            <div className='grid grid-cols-3 mt-6 grid-flow-col text-start py-3 px-6 border-b border-gray-300 font-medium text-gray-500'>
              <p>Room No</p>
              <p>No. of Beds</p>
              <p>Action</p>
            </div>

            {rooms.map((room, index) => (
              <div
                key={index}
                className='flex flex-wrap justify-start sm:grid grid-cols-3 items-center text-start text-gray-500 py-3 px-6 border-b border-gray-200'
              >
                <p>{room.wardNo}</p>
                <input
                  className='p-2 border outline-none border-blue-500 rounded-md w-20'
                  type='number'
                  min='1'
                  value={room.beds}
                  onChange={(e) => updateRoom(index, 'beds', e.target.value)}
                />
                <button
                  type='button'
                  className='text-start cursor-pointer'
                  onClick={() => removeRoom(index)}
                >
                  <img className='w-7' src={assets.delete_icon} alt='' />
                </button>
              </div>
            ))}

            <button type='submit' className='w-full p-2 my-6 bg-blue-500 rounded-md text-white cursor-pointer'>
              Save Ward
            </button>
          </div>
        </form>
      ) : (
        <div className='bg-white border border-gray-300 px-8 py-8 rounded w-full max-w-4xl overflow-x-auto'>
          <table className='w-full font-medium text-left text-gray-500 border-collapse'>
            <thead>
              <tr className='border-b'>
                <th className='p-3'>Ward Name</th>
                <th className='p-3'>Rooms</th>
                <th className='p-3'>Total Beds</th>
              </tr>
            </thead>
            <tbody>
              {wardList.map((ward, index) => (
                <tr key={index} className='border-b hover:bg-gray-50'>
                  <td className='p-3'>{ward.wardName}</td>
                  <td className='p-3'>{ward.wardNumbers.length}</td>
                  <td className='p-3'>{ward.wardNumbers.reduce((sum, r) => sum + r.beds, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddWard;
