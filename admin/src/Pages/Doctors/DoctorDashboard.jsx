import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'

const DoctorDashboard = () => {

  const {dashData, setDashData , getDashData , dToken} = useContext(DoctorContext);

  useEffect(() => {

    if(dToken)
    {

      getDashData();
      console.log(dashData)

    }
  }, [dToken])
  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard