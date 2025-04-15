import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../Context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../Context/DoctorContext.jsx'

const Navbar = () => {

    const {aToken , setAToken} = useContext(AdminContext);

    const {dToken , setDToken} = useContext(DoctorContext);

    const navigate = useNavigate();

    //=====================================================  // Logout  //======================================================

    const logout = () => {

        navigate('/');

        aToken && setAToken('');

        dToken && setDToken('');

        aToken && localStorage.removeItem('aToken');

        dToken && localStorage.removeItem('dToken');
    }

  return (

    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white]'>
        
        <div className='flex items-center gap-3 text-xs'>

            <img className='w-36 cursor-pointer' src={assets.logo} alt="" />
            <p className='border-gray-500 border cursor-pointer text-gray-600 px-2.5 py-0.5 rounded-full'>{aToken ? 'Admin' : 'Doctor'}</p>

        </div>

        <button onClick={logout} className='bg-red-500 text-sm font-medium cursor-pointer px-10 py-3 text-center rounded-sm text-white flex items-center justify-center'>
            Logout
        </button>

    </div>
  )
}

export default Navbar