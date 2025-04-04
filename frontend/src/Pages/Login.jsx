import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify'
import {useNavigate } from "react-router-dom";

const Login = () => {

  const [name , setName] = useState('');

  const [email , setEmail] = useState('');

  const [password , setPassword] = useState('');

  const [state , setState] = useState('Sign in');

  const {token , setToken , backendUrl} = useContext(AppContext);

  const navigate = useNavigate();


  //====================== Onsubmit Handler ===============================

  const onSubmitHandler = async (event) => {

    event.preventDefault();

    try 
    {

      if(state === 'Sign up')
      {
        const {data} = await axios.post(backendUrl + '/api/user/register' , {name , password , email})

        if(data.success)
        {
          localStorage.setItem('token' , data.token);

          setToken(data.token)

          toast.success("User Registered Success")

          navigate('/')
        }
        else
        {
          toast.error(data.message);
        }
      }
      else
      {

        const {data} = await axios.post(backendUrl + '/api/user/login' , {password , email})

        if(data.success)
        {
          localStorage.setItem('token' , data.token);

          setToken(data.token)

          navigate('/')
        }
        else
        {
          toast.error(data.message);
        }

      }
      
    } catch (error) 
    {
      console.log(error);
    }
  }

  useEffect(() => {

    if(token)
    {
      navigate('/')
    }
  },[token])

  
  return (
    <section className='w-full min-h-[70%] flex flex-col justify-center items-center'>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-3/4 flex flex-col sm:flex-row gap-6 justify-center rounded-lg p-4 shadow-lg'>
            
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

            <button type='submit' className='bg-[#0D6EFD] p-3 font-medium rounded-md cursor-pointer text-white'>{state === "Sign in" ? "Sign In" : "Create Account"}</button>

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