import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Login = () => {

  const [name , setName] = useState('');

  const [email , setEmail] = useState('');

  const [password , setPassword] = useState('');

  const [state , setState] = useState('Sign in');

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
              <h2 className='text-5xl font-medium text-gray-700'>{state === "Sign in" ? 'Sign in' : 'Create account'}</h2>
              <p className='text-base text-gray-400'>{state === 'Sign in' ? 'Sign in' : 'Create account'} to access...</p>
            </div>

            {
              state === "Sign up" ? 
              <div className='flex text-gray-700 text-base flex-col gap-1 w-full'>
                <label className='block text-gray-600' htmlFor="userName">User name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]'  id='userName' type="text" />
              </div> : ""
            }

            <div className='flex flex-col gap-1 w-full'>
              <label className='block text-gray-600' htmlFor="Email">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]'  id='Email' type="email" />
            </div>

            <div className='flex flex-col gap-1 w-full'>
              <label className='block text-gray-600' htmlFor="Password">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password}  className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]' id='Password' type="password" />
            </div>

            <button className='bg-[#0D6EFD] p-3 font-medium rounded-md cursor-pointer text-white'>{state === "Sign in" ? "Sign In" : "Create Account"}</button>

            { 
              state === 'Sign in' ? <p className='text-gray-500'>Create an new account? <a className='cursor-pointer text-[#0D6EFD] underline text-sm' onClick={() => setState("Sign up")}>Click Here</a></p> : <p className='text-gray-500'>Already have an account? <a className='cursor-pointer text-[#0D6EFD] underline text-sm' onClick={() => setState("Sign in")}>Click Here</a></p>
            }

          </div>

        </div>

      </form>

    </section>
  )
}

export default Login