import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [edit , setEdit] = useState(false);

  const [userData , setUserData] = useState({
    name : "Harishanth",
    image : assets.user,
    email : "Harishanth08@gmail.com",
    phone : "1234567890",
    address : {
      line1: "233 , Anbuvalipuram",
      line2: "Trincomalee , Sri Lanka"
    },
    gender : "Male",
    dob : "2000-07-03",
  });

  //========================Live Date =============

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className='w-full min-h-screen'>
      
      {/* ======================= Main Div ========================= */}
      <div className='w-full'>

        <div className='w-full flex flex-col gap-2'> 

          {/* ======================= Name Div Image ========================= */}

          <div className='w-full flex flex-col gap-2 items-start my-4'>

            <h2 className='text-xl font-medium text-gray-700'> Welcome, {userData.name}</h2>

            <p className='text-sm text-gray-500'>{formattedDate}</p>

          </div>

          <div className='bg-linear-to-r from-cyan-500 to-blue-500'>

            <div>

              <div className='w-full bg-white mt-20 flex justify-between items-center p-5'>

                <div className='w-full flex justify-start items-center gap-2'>

                  {
                    edit === true ? <input type="file" className='w-24'/> : 
                    <img className='w-24' src={assets.user} alt="" />
                  }

                  <div className='text-gray-700'>

                    <p className='text-lg font-medium'>{userData.name}</p>
                    <p className='text-sm text-gray-500'>{userData.email}</p>

                  </div>

                </div>

                <button onClick={() => setEdit(prev => (!prev))} className='bg-[#0D6EFD] px-10 py-2.5 rounded-sm text-white cursor-pointer'>Edit</button>

              </div>

              <div className='w-full bg-white flex p-5'>

                <div className='w-full flex flex-col md:grid grid-cols-4 gap-y-8 gap-4'>

                  <div className=' w-full flex flex-col md:col-span-2 gap-3'>

                    <label className='block text-gray-600' htmlFor="userName">User name: </label>
                    {
                      edit === true ? <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]' type="text" /> : <p>{userData.name}</p>
                    }

                  </div>

                  <div className=' w-full flex flex-col md:col-span-2 gap-3'>

                    <label className='block text-gray-600' htmlFor="userName">Email: </label>
                    {
                      edit === true ? <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]' type="email" /> : <p>{userData.email}</p>
                    }

                  </div>

                  <div className=' w-full flex flex-col md:col-span-2 gap-3'>

                    <label className='block text-gray-600' htmlFor="userName">Email: </label>
                    {
                      edit === true ? <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]' type="email" /> : <p>{userData.email}</p>
                    }

                  </div>

                  <div className=' w-full flex flex-col md:col-span-2 gap-3'>

                    <label className='block text-gray-600' htmlFor="userName">Email: </label>
                    {
                      edit === true ? <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]' type="email" /> : <p>{userData.email}</p>
                    }

                  </div>

                </div>
                

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default MyProfile