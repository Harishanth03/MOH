import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

    const {docId} = useParams(); //get the selected doctorId using UseParams

    const {doctors , backendUrl , token , getDoctorsData} = useContext(AppContext);

    const daysOfWeek = ['SUN' , 'MON' , 'TUE' , 'WED' , 'THU' , 'FRI' , 'SAT']

    const [docInfo , setDocInfo] = useState(null);

    const [docSlots , setDocSlots] = useState([]); //create an state array fpr save the data of book

    const [slotIndex , setSlotIndex] = useState(0); //slotIndex

    const [slotTime , setSlotTime] = useState(''); //store Date

    const navigate = useNavigate()
    

    //Create the function for slots of times 

    const getAvailableSlots = async() => {

        setDocSlots([]); // Clear previous slots
    
        let today = new Date(); // Get the current date
    
        // Loop to calculate the next 7 days of slots
        for (let i = 0; i < 7; i++) {
    
          let currentDate = new Date(today);
    
          currentDate.setDate(today.getDate() + i); // Increment the date
    
    
          let endTime = new Date();
    
          endTime.setDate(today.getDate() + i);
    
          endTime.setHours(21, 0, 0, 0); // Set end time to 9:00 PM
    
    
          if(today.getDate() === currentDate.getDate()) {
    
            currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
    
            currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    
          } 
          else 
          {
    
            currentDate.setHours(10);
    
            currentDate.setMinutes(0);
    
          }
    
          let timeSlots = [];
    
          while (currentDate < endTime) 
          {
            let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    
            timeSlots.push({
    
              datetime: new Date(currentDate),
    
              time: formattedTime
    
            });
    
            currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes
    
          }
    
          setDocSlots(prev => ([...prev, timeSlots]));
    
        }
    
      }


    const fetchDocInfo = () => {
 
        const docInfo = doctors.find(doc => doc._id === docId); //destractre the doctor data from AppConec

        setDocInfo(docInfo);

    }

    //================================================== Book Appointment ============================================


    const bookAppointment = async () => {
        if (!token) {
          toast.warn("Please Login to Book your appointment");
          return navigate('/login');
        }
      
        try {
          const date = docSlots[slotIndex][0].datetime;
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          const slotDate = `${day}_${month}_${year}`;
      
          const { data } = await axios.post(
            backendUrl + '/api/user/book-appointment',
            { docId, slotDate, slotTime },
            { headers: { token } }
          );
      
          if (data.success) {
            toast.success(data.message); // ✅ green success toast
            getDoctorsData();
            navigate('/my-appointment');
          } else {
            toast.error(data.message); // only triggered if success is false
          }
      
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      };
      

    useEffect(() => {

        fetchDocInfo();

    }, [doctors , docId]) // run the fetch doctor function when doctors and docId is change


    useEffect(() => {

        getAvailableSlots();

    }, [docInfo]);


    useEffect(() => {
        console.log(docSlots)
    },[docSlots])

  return docInfo && (

    <div>

        {/* ================================ Doctors Details ================================== */}

        <div className='flex flex-col sm:flex-row gap-4 mt-5'>
            <div>
                <img className='w-full sm:max-w-72  rounded-lg' src={docInfo.image} alt="" />
            </div>

            <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

                {/* ================================ Doc Information ============================== */}

                <p className='flex items-center gap-2 text-xl font-medium text-gray-900'>{docInfo.name}</p>

                <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>

                    <p>{docInfo.degree} - {docInfo.speciality}</p>

                    <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>

                </div>

                {/* ======================================= Doc About =============================== */}

                <div>

                    <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                        About 
                        <img src={assets.info_icon} alt="" />
                    </p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1 leading-6'>{docInfo.about}</p>

                </div>



            </div>

        </div>

        {/* =================================== Booking Slots ================================================ */}

        <div className='mt-8 text-gray-700'>

            <p className='text-center md:text-start'>Book Your Appointment Here!</p>

            <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 justify-between'>

                {
                    
                    docSlots.length && docSlots.map((item , index) => (

                        <div key={index} onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#0D6EFD] text-white' : 'border border-gray-300'}`} >
                            
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>

                            <p>{item[0] && item[0].datetime.getDate()}</p>

                        </div>

                    ))

                }

            </div>

            <div className='flex flex-wrap items-center justify-center sm:justify-start mt-5 gap-3'>

                {
                    docSlots.length && docSlots[slotIndex].map((item , index) => (

                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#0D6EFD] text-white' : 'border border-gray-300'} `}>
                            {item.time.toLowerCase()}
                        </p>
                    ))
                }

            </div>

            <button onClick={bookAppointment} className='w-full mt-5 bg-[#0D6EFD] cursor-pointer text-white py-2.5 rounded-full'>Book an Appointment</button>

        </div>

    </div>
  )
}

export default Appointment