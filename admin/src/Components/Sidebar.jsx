import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets';

const Sidebar = () => {

  const {aToken} = useContext(AdminContext);

  return (
    <div>
      
      {
        aToken && <ul>

          <NavLink to={'/admin-dashboard'}>

            <img src={assets.home_icon} />

            <p>Dashboard</p>

          </NavLink>

          <NavLink to={'/all-appointment'}>

            <img src={assets.appointment_icon} />

            <p>All Appointment</p>

          </NavLink>

          <NavLink to={'/add-doctor'}>

            <img src={assets.add_icon} />

            <p>Add Doctor</p>

          </NavLink>

          <NavLink to={'/doctor-list'}>

            <img src={assets.people_icon} />

            <p>Doctors List</p>

          </NavLink>

        </ul>
      }

    </div>
  )
}

export default Sidebar