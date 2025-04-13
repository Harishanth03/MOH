import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {

  const {aToken , appointments , getAllAppoinments} = useContext(AdminContext);

  const {calculateAge , slotDateFormat} = useContext(AppContext);

  

  useEffect(() => {

    if(aToken)
    {
      getAllAppoinments()
    }

  },[aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      
      <p className='mb-3 text-lg font-medium'>All appointments</p>

      <div className='bg-white border border-gray-300 rounded text-sm text-gray-700 max-h-[80vh] overflow-y-scroll min-h-[60vh]'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_3fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300'>

          <p>ID</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date</p>
          <p>Doctor</p>
          <p>Status</p>
          <p>Action</p>
          
        </div>

        {
          appointments.map((item , index) => (

            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_3fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-blue-50 cursor-pointer' key={index}>

              <p className='max-sm:hidden'>{index + 1}</p>

              <div className='flex items-center gap-2'>

                <img className='w-9 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>

              </div>

              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

              <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>

              <div className='flex items-center gap-2'>

                <img className='w-9 rounded-full' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>

              </div>

              <p className={`max-sm:hidden ${item.cancelled ? 'text-red-500' : 'text-green-500'}`}>
                {item.cancelled ? "Cancelled" : "Scheduled"}
              </p>

              <img className='w-5' src={assets.delete_icon} alt="" />
              
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default AllAppointments