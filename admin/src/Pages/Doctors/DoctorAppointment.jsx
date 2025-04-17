import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {

  const {getappointment , appointment , dToken , completeAppointment , CancleAppointment} = useContext(DoctorContext);

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

        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1.5fr_1fr_2fr_2fr_3fr] gap-1 py-3 px-6 border-b border-gray-300'> 

          <p>#</p>
          <p>Patient Details</p>
          <p>Cancellation Status</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Med Status</p>
          <p>Action</p>

        </div>

        {

          appointment.map((item , index) => (

            <div className='flex flex-wrap cursor-pointer justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1.5fr_1fr_2fr_2fr_3fr] gap-1 items-center text-gray-500  py-3 px-6  border-b border-gray-300 hover:bg-blue-50' key={index}>

              <p className='max-sm:hidden'>{index + 1}</p>

              <div className='flex items-center gap-2'>

                <img className='w-10 rounded-full' src={item.userData.image} alt="" />

                <p>{item.userData.name}</p>

              </div>

              <div>

                <p className={`max-sm:hidden ${item.cancelled ? 'text-red-500' : 'text-green-500'}`}>{item.cancelled ? "Cancelled" : "Scheduled"}</p>

              </div>

              <p>{!isNaN(calculateAge(item.userData.dob)) ? calculateAge(item.userData.dob) : "N/A"}</p>

              <p>{slotDateFormat(item.slotDate)} <span className='text-red-500'>|</span> { item.slotTime}</p>

              <p className={`max-sm:hidden ${item.isCompleted ? 'text-green-500' : 'text-orange-500'}`}>{item.isCompleted ? "Completed" : "Pending"}</p>

              <div className='flex gap-3'>
                {item.cancelled ? (
                  item.isCompleted ? (
                    <p className='text-red-500 font-medium'>Appointment Cancelled by patient</p>
                  ) : (
                    <p className='text-red-500 font-medium'>Appointment Cancelled by doctor</p>
                  )
                ) : item.isCompleted ? (
                  <button 
                    className='px-4 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
                    onClick={() => handleWriteReport(item._id)}
                  >
                    Write Report
                  </button>
                ) : (
                  <>
                    <img 
                      onClick={() => CancleAppointment(item._id)} 
                      className='w-10 cursor-pointer' 
                      src={assets.cancel_icon} 
                      alt="Cancel" 
                    />
                    <img 
                      onClick={() => completeAppointment(item._id)} 
                      className='w-10 cursor-pointer' 
                      src={assets.tick_icon} 
                      alt="Complete" 
                    />
                  </>
                )}
              </div>



            </div>

          ))

        }

      </div>

    </div>

  )
}

export default DoctorAppointment