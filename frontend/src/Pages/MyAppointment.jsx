import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {

  const {doctors , backendUrl , token} = useContext(AppContext);

  const [appointments , setAppointments] = useState([]); //create an state array fpr save the data of book

  const months = ['Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec']
  
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }


  //============================================ Get User Appointments ====================================================

  const getUserAppointments = async() => {

    try 
    {
      
      const {data}  = await axios.get(backendUrl+'/api/user/appointments' , {headers:{token}})
      
      if(data.success)
      {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments.reverse())
      }
      else
      {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  //============================================ Cancle the appointment ====================================================

  const cancleAppointment = async(appointmentId) => 
  {
    try 
    {

      const {data} = await axios.post(backendUrl+'/api/user/cancel-appointment' , {appointmentId} , {headers:{token}})

      if(data.success)
      {
        toast.success(data.message)
        getUserAppointments()
      }
      else
      {
        toast.error(data.message)
      }
      
    } catch (error) 
    {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {

    if(token)
    {
      getUserAppointments()
    }

  } , [token])

  return (

    <div>

      <p className='text-2xl font-bold text-start border-b pb-3 text-zinc-700 border-gray-300 sm:text-4xl'>MyAppointment</p>

      <div>

        {
          appointments.slice(0 , 10).map((item , index) => (

            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-gray-300 py-2 border-b' key={index}>

              <div>

                <img className='w-32 rounded-lg' src={item.docData.image} alt="" />

              </div>

              <div className='flex-1 text-sm text-zinc-600'>

                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address: </p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'> <span className='text-sm text-neutral-700 font-medium'> Date & Time:</span> <span>{slotDateFormat(item.slotDate)} | {item.slotTime}</span></p>

              </div>

              <div>

              </div>

              <div className=' flex flex-col gap-2 justify-center'>

                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#fcdb35] hover:text-white cursor-pointer transaction-all duration-300'>Rate Doctor</button>
                <button onClick={() => cancleAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#0D6EFD] hover:text-white cursor-pointer transaction-all duration-300'>Cancle Doctor</button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  )

}

export default MyAppointment