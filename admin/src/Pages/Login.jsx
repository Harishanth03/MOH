import React, { useContext, useState } from 'react'
import { AdminContext } from '../Context/AdminContext.jsx';
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {

    const [state , setState] = useState('Admin');

    const {setAToken} = useContext(AdminContext); //get the atoken from res and set it

    const backendURL = 'http://localhost:4000';

    const [email , setEmail] = useState("");

    const [password , setPassword] = useState("");

    const onSubmitHandler = async(event) => {

        event.preventDefault();

        try 
        {

            if(state === 'Admin')
            {
                const {data} = await axios.post(`${backendURL}/api/admin/login` , {email , password})

                if(data.success)
                {
                    localStorage.setItem('aToken' , data.aToken)
                    setAToken(data.aToken)
                    toast.success("Login Success")

                }
                else
                {
                    toast.error(data.message)
                }
            }
            else
            {
                
            }
            
        } catch (error) 
        {
            
        }

    }

  return (

    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>

        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-100 rounded-xl text-[#5E5E5E] text-sm shadow-lg'>

            <p className='text-2xl font-semibold m-auto '><span className='text-blue-500'>{state}</span>Login</p>

            <div className='w-full'>

                <label htmlFor="email">Email</label>

                <input value={email} onChange={(e) => setEmail(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-blue-500  outline-none' type="email" name="email" id="email" required />

            </div>

            <div className='w-full'>

                <label htmlFor="password">Password</label>

                <input value={password} onChange={(e) => setPassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-blue-500  outline-none' type="password" name="password" id="password" required />

            </div>

            <button className='bg-blue-500 cursor-pointer text-white w-full py-2 rounded-md text-base'>Login</button>

            {
                state === 'Admin' ? 
                <p className='text-center'>Doctor Login <span className='text-blue-500 hover:underline cursor-pointer'onClick={() => setState('Doctor')} >Click Here</span></p> :
                <p className='text-center'>Admin Login <span className='text-blue-500 hover:underline cursor-pointer'onClick={() => setState('Admin')} >Click Here</span></p>
            }

        </div>

    </form>

  )
}

export default Login