import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets';
import { DoctorContext } from '../Context/DoctorContext';

const Sidebar = () => {

  const {aToken} = useContext(AdminContext);

  const {dToken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r border-r-gray-300'>
      
      {
        aToken && <ul className='text-[#515151] mt-5'>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/admin-dashboard'}>

            <img src={assets.home_icon} />

            <p>Dashboard</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/all-appointment'}>

            <img src={assets.appointment_icon} />

            <p>All Appointment</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/add-doctor'}>

            <img src={assets.add_icon} />

            <p>Add Doctor</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-list'}>

            <img src={assets.people_icon} />

            <p>Doctors List</p>

          </NavLink>

        </ul>
      }
      {/* ===================================================================================================================== */}
      {
        dToken && <ul className='text-[#515151] mt-5'>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-dashboard'}>

            <img src={assets.home_icon} />

            <p>Dashboard</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-appointment'}>

            <img src={assets.appointment_icon} />

            <p>Doctor Appointment</p>

          </NavLink>


          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-profile'}>

            <img src={assets.people_icon} />

            <p>Doctors Profile</p>

          </NavLink>

        </ul>
      }

    </div>
  )
}

export default Sidebar