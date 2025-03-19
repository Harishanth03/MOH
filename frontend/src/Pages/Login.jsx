import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Login = () => {

  const [name , setName] = useState('');

  const [email , setEmail] = useState('');

  const [password , setPassword] = useState('');

  const [state , setState] = useState('');

  //====================== Onsubmit Handler ===============================

  const onSubmitHandler = (event) => {

    event.preventDefault();
  }

  
  return (
    <section className='w-full min-h-screen flex flex-col justify-center items-center'>

      <form className='w-full sm:w-3/4 flex flex-col sm:flex-row gap-6 justify-center rounded-lg p-4 shadow-lg'>
            
        {/* =================== left side ====================== */}
        <div className='w-full sm:w-1/2'>

          <img className='rounded-bl-lg rounded-tl-lg w-full' src={assets.loginImage} alt="" />

        </div>

        {/* =================== right side ==================== */}
        <div className='w-full sm:w-1/2 pl-6 flex justify-start my-auto'>

          <div className='flex w-full flex-col gap-6'>

            <div className='flex  flex-col gap-2'>
              <h2 className='text-5xl font-medium text-gray-700'>Welcome!</h2>
              <p className='text-base text-gray-400'>Sign in to access...</p>
            </div>

            <div className='flex text-gray-700 text-base flex-col gap-1 w-full'>
              <label className='block' htmlFor="userName">User name</label>
              <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]'  id='userName' type="text" />
            </div>

            <div className='flex flex-col gap-1 w-full'>
              <label className='block' htmlFor="Email">Email</label>
              <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]'  id='Email' type="text" />
            </div>

            <div className='flex flex-col gap-1 w-full'>
              <label className='block' htmlFor="Password">Password</label>
              <input  className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]' id='Password' type="text" />
            </div>

            <button className='bg-[#0D6EFD] p-3 font-medium rounded-md cursor-pointer text-white'>Create Account</button>

          </div>

        </div>

      </form>

    </section>
  )
}

export default Login