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
    <div>DoctorAppointment</div>
  )
}

export default DoctorAppointment