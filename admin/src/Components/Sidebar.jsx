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

            <p className='hidden md:block'>Dashboard</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/all-appointment'}>

            <img src={assets.appointment_icon} />

            <p className='hidden md:block'>All Appointment</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/add-doctor'}>

            <img src={assets.add_icon} />

            <p className='hidden md:block'>Add Doctor</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-list'}>

            <img src={assets.people_icon} />

            <p className='hidden md:block'>Doctors List</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/ward'}>

            <img src={assets.ward} />

            <p className='hidden md:block'>Ward Management</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/bed-management'}>

            <img src={assets.bedManagement} />

            <p className='hidden md:block'>Bed Management</p>

          </NavLink>

        </ul>
      }
      {/* ===================================================================================================================== */}
      {
        dToken && <ul className='text-[#515151] mt-5'>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-dashboard'}>

            <img src={assets.home_icon} />

            <p className='hidden md:block'>Dashboard</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-appointment'}>

            <img src={assets.appointment_icon} />

            <p className='hidden md:block'>Doctor Appointment</p>

          </NavLink>


          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/verify-doctor'}>

            <img src={assets.verify} />

            <p className='hidden md:block'>Doctors Verify</p>

          </NavLink>

          <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/feedback-doctor'}>

            <img src={assets.feedback} />

            <p className='hidden md:block'>Doctors Feedback</p>

          </NavLink>


        </ul>
      }

    </div>
  )
}

export default Sidebar