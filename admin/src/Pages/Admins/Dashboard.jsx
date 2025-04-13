import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { useEffect } from 'react';

const Dashboard = () => {

  const {dashData , getDashData , aToken , cancleAppointment} = useContext(AdminContext);

  useEffect(() => {
    if(aToken)
    {
      getDashData()
    }
  },[ aToken ])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard