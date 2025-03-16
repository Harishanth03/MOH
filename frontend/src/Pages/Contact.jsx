import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='w-full flex flex-col sm:grid grid-cols-2 my-6 gap-4'>

        {/* ================================================== Lest side=============================================== */}
        <div className='col-span-1 p-4  bg-white shadow-sm rounded-lg flex flex-col gap-10'>

          <div className='border-l-4 pl-4 border-[#FEB896]'>

            <p className='text-balance font-medium text-[#023170]'>Ministory Of Health - Trincomalee</p>

          </div>

          <p className='text-3xl sm:text-7xl font-medium'>We Belive in a future of easy medical access</p>

          <p className='text-sm leading-6 text-gray-500'>Our dream at GetWell is a easy healthcare transformation—a world where accessing quality medical care is seamless, efficient, and available to everyone. We envision a future where technology bridges the gap between patients and healthcare providers, ensuring that no one is left behind when it comes to their well-being. With innovation at our core, GetWell is dedicated to reshaping healthcare accessibility and empowering individuals to take control of their health, anytime, anywhere</p>

        </div >

        {/* ================================================== Right side=============================================== */}
        <div className='col-span-1 p-4 bg-white shadow-sm rounded-lg'> 

          <img className='w-full' src={assets.contactImage} alt="" />

          <div className='my-6 flex flex-col gap-4 w-full sm:grid grid-cols-4'>

            <div className='col-span-2 mt-3 shadow-sm p-6 rounded-md'>

              <p className='text-2xl font-medium'>100+</p>
              <p className='text-sm mt-1 text-gray-500'>Experienced Doctors</p>

            </div>

            <div className='col-span-2 mt-3 shadow-sm p-6 rounded-md'>

              <p className='text-2xl font-medium'>1000+</p>
              <p className='text-sm mt-1 text-gray-500'>Surguries Done</p>

            </div>

            <div className='col-span-2 mt-3 shadow-sm p-6 rounded-md'>

              <p className='text-2xl font-medium'>10000+</p>
              <p className='text-sm mt-1 text-gray-500'>Positive Reviews</p>

            </div>

            <div className='col-span-2 mt-3 shadow-sm p-6 rounded-md'>

              <p className='text-2xl font-medium'>100K</p>
              <p className='text-sm mt-1 text-gray-500'>trusted People</p>

            </div>

          </div>
          
        </div>

      </div>

    </div>
  )
}

export default Contact