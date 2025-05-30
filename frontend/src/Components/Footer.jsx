import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (

    <div className='md:mx-10'>
        
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/* ======================================= Left Section of Footer ================================== */}
            <div>

                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full  text-gray-600 leading-6'> 
                    GetWell, launched by the Ministry of Health, Trincomalee, is your trusted digital healthcare companion. Our platform makes it easier than ever to book doctor appointments, access essential medical services, and stay informed about your health. With GetWell, 
                    we are committed to providing seamless, 
                    patient-centered care at your fingertips. Your health, our priority
                </p>

            </div>

            {/* ======================================= Center Section of Footer ================================== */}
            <div>

                <p className='text-xl font-medium mb-5'>MOH Trincomalee</p>

                <ul className='flex flex-col gap-2 text-gray-600'>

                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>

                </ul>

            </div>

            {/* ======================================= Right Section of Footer ================================== */}
            <div>

                <p className='text-xl font-medium mb-5'>Get In Touch</p>

                <ul className='flex flex-col gap-2 text-gray-600'>

                    <li>0262224714</li>
                    <li>MOHTrincomalee@gmail.com</li>

                </ul>

            </div>

        </div>

        {/* ======================================== Copy Right text ===================================== */}

        <div>

            <hr />

            <p className='py-5 text-sm text-center '>Copyright 2025@ Ministory Of health - All Right Reserved</p>

        </div>

    </div>
  )
}

export default Footer