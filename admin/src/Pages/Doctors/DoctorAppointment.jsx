import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext';

const DoctorAppointment = () => {

  const {getappointment , appointment , dToken} = useContext(DoctorContext);

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

      </div>

    </div>

  )
}

export default DoctorAppointment