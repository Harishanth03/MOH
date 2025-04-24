import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../Context/AdminContext';

const AddWard = () => {

  const {aToken} = useContext(AdminContext);

  const [wardName , setWardName] = useState('');

  const [rooms , setRooms] = useState([{wardNo: 1, beds:10}]);

  const addRoom = () => {

    setRooms([...rooms, { wardNo: rooms.length + 1, beds: 10 }]);

  };

  const updateRoom = (index, key , value) => {

    const updatedRooms = [...rooms];

    updatedRooms[index][key] = parseInt(value) || 0;

    setRooms(updatedRooms);

  };

  const removeRoom = (index) => {

    const updatedRooms = rooms.filter((_, i) => i !== index);

    setRooms(updatedRooms);

  };

  const handleSubmit = async(e) => {

    e.preventDefault();

    const payload = {

      wardName,

      wardNumbers: rooms

    };

    try 
    {

      const response = await axios.post('http://localhost:4000/api/admin/ward', payload, {headers:{aToken}});

      if (response.status === 201) 
      {

        toast.success(response.data.message || 'Ward saved successfully!');
  
        // Reset form
        setWardName('');

        setRooms([{ wardNo: 1, beds: 10 }]);

      } 
      else 
      {

        toast.error(response.data.message || 'Unexpected response from server.');

      }

      
    } catch (error) 
    {

      console.error('Error saving ward:', error);

      toast.error(error.response?.data?.message || 'Server error. Please try again.');
      
    }
  }

  return (
    <form onSubmit={handleSubmit} className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Ward</p>

      <div className='bg-white border border-gray-300 px-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

        <div className='w-full flex flex-col gap-6 md:gap-0'>

          <div className='flex flex-col md:grid md:grid-cols-2 gap-4 w-full'>

            <div className='w-full flex flex-col gap-2'>

              <label className='block' htmlFor="ward-name">Ward name</label>  

              <input type="text" value={wardName} onChange={(e) => setWardName(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='Ward name' id='ward-name'/>

            </div>

            <div className='w-full md:mt-7.5 flex flex-col gap-2'>

              <button  onClick={(e) => {e.preventDefault(); addRoom();}} className='w-full p-2 bg-blue-500 rounded-md text-white cursor-pointer'>Add Ward</button>

            </div>

          </div>

          <div className='grid grid-cols-3 mt-6 grid-flow-col text-start py-3 px-6 border-b border-gray-300 font-medium text-gray-500'>

            <p>Room No</p>
            <p>No. of Beds</p>
            <p>Action</p>

          </div>

          {
            rooms.map((room , index) => (
              
              <div key={index} className='flex flex-wrap justify-star sm:grid grid-cols-3 items-center text-start text-gray-500 py-3 px-6 border-b border-gray-200'>

                <p>{room.wardNo}</p>

                <input className='p-2 border outline-none border-blue-500 rounded-md w-20' type="number" min="1" value={room.beds} onChange={(e) => updateRoom(index, 'beds', e.target.value)}/>

                <button className='text-start cursor-pointer'  onClick={() => removeRoom(index)}>

                  <img className='w-7' src={assets.delete_icon} alt="" />

                </button>

              </div>

            ))
          }

          <button type='submit' className='w-full p-2 my-6 bg-blue-500 rounded-md text-white cursor-pointer'>Save Ward</button>
          
        </div>

      </div>

    </form>
  )
}

export default AddWard