import React from 'react'
import { assets } from '../assets/assets'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between text-sm text-gray-600 py-4 mb-5 border-b border-b-gray-200'>
        <img className='w-44 cursor-pointer' src={assets.logo} />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to={'/'}>
                <li className='py-1'>HOME</li>
                <hr  className='border-none rounded-full outline-none h-0.5 bg-[#0D6EFD]  m-auto hidden'/>
            </NavLink>
            <NavLink to={'/doctors'}>
                <li className='py-1'>ALL DOCTORS</li>
                <hr  className='border-none outline-none h-0.5 bg-[#0D6EFD]  m-auto hidden'/>
            </NavLink>
            <NavLink to={'/about'}>
                <li className='py-1'>ABOUT</li>
                <hr  className='border-none outline-none h-0.5 bg-[#0D6EFD]  m-auto hidden'/>
            </NavLink>
            <NavLink to={'/contact'}>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-[#0D6EFD] m-auto hidden' />
            </NavLink>
        </ul>
        <div>
            <button className='bg-[#0D6EFD] text-white px-[18px] py-[10px] rounded-full font-medium hidden cursor-pointer md:block'>Create account</button>
        </div>
    </div>
  )
}

export default Navbar