import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {

  return (

    <div className='flex bg-[#0D6EFD] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

        {/* ========================================= Left Side Banner =========================================== */}

        <div className='flex-1 py-8'>

            <div>

                <p>Check Doctor</p>
                <p>With 200+ Goverment Healthcare professionals</p>

            </div>

            <button>Create account</button>

        </div>

        {/* ========================================= Right Side Banner ========================================== */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>

            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />

        </div>

    </div>

  )

}

export default Banner