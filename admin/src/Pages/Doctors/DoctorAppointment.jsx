import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {

  const {getappointment , appointment , dToken} = useContext(DoctorContext);

  const {calculateAge , slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if(dToken)
    {
      getappointment();
    }

  }, [dToken])
  return (

    <div className='w-full max-w-6xl m-5'>
      
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border border-gray-300 rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]'>

        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1.5fr_1fr_2fr_2fr] gap-1 py-3 px-6 border-b border-gray-300'> 

          <p>#</p>
          <p>Patient Details</p>
          <p>Status</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Action</p>

        </div>

        {

          appointment.map((item , index) => (

            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1.5fr_1fr_2fr_2fr] gap-1 items-center text-gray-500  py-3 px-6  border-b border-gray-300 hover:bg-blue-50' key={index}>

              <p className='max-sm:hidden'>{index + 1}</p>

              <div className='flex items-center gap-2'>

                <img className='w-10 rounded-full' src={item.userData.image} alt="" />

                <p>{item.userData.name}</p>

              </div>

              <div>

                <p className={`max-sm:hidden ${item.cancelled ? 'text-red-500' : 'text-green-500'}`}>{item.cancelled ? "Cancelled" : "Scheduled"}</p>

              </div>

              <p>{calculateAge(item.userData.dob)}</p> 

              <p>{slotDateFormat(item.slotDate)} <span className='text-red-500'>|</span> { item.slotTime}</p>

              <div className='flex gap-3'>

                <img className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />

                <img className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />

              </div>

            </div>

          ))

        }

      </div>

    </div>

  )
}

export default DoctorAppointment