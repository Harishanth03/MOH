import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

    const {docId} = useParams(); //get the selected doctorId using UseParams

    const {doctors , backendUrl , token , getDoctorsData , voiceIntent, setVoiceIntent} = useContext(AppContext);

    const daysOfWeek = ['SUN' , 'MON' , 'TUE' , 'WED' , 'THU' , 'FRI' , 'SAT']

    const [docInfo , setDocInfo] = useState(null);

    const [docSlots , setDocSlots] = useState([]); //create an state array fpr save the data of book

    const [slotIndex , setSlotIndex] = useState(0); //slotIndex

    const [slotTime , setSlotTime] = useState(''); //store Date

    const navigate = useNavigate()
    

      //Create the function for slots of times 

      const getAvailableSlots = async () => {
        if (!docInfo) return;
      
        setDocSlots([]); // Clear previous slots
        const today = new Date(); // Today’s base date
        const allSlots = [];
      
        for (let i = 0; i < 7; i++) {
          // Correctly calculate each date by always adding to the original "today"
          let currentDate = new Date(today.getTime());
          currentDate.setDate(today.getDate() + i);
      
          // Clone for slot start and end
          let slotStart = new Date(currentDate.getTime());
          let slotEnd = new Date(currentDate.getTime());
          slotEnd.setHours(21, 0, 0, 0); // End at 9 PM
      
          // Set correct start time
          if (i === 0) {
            const now = new Date();
            slotStart.setHours(Math.max(now.getHours() + 1, 10)); // Start 1 hour from now or 10 AM
            slotStart.setMinutes(now.getMinutes() > 30 ? 30 : 0);
          } else {
            slotStart.setHours(10);
            slotStart.setMinutes(0);
          }
      
          const slotsForDay = [];
      
          while (slotStart < slotEnd) {
            const day = String(slotStart.getDate()).padStart(2, '0');
            const month = String(slotStart.getMonth() + 1).padStart(2, '0');
            const year = slotStart.getFullYear();
            const slotDate = `${day}_${month}_${year}`;
            const formattedTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
            const isAvailable = !(docInfo.slots_booked?.[slotDate]?.includes(formattedTime));
      
            if (isAvailable) {
              slotsForDay.push({
                datetime: new Date(slotStart.getTime()), // Clone again to avoid mutation
                time: formattedTime,
              });
            }
      
            // Step forward 30 minutes
            slotStart.setMinutes(slotStart.getMinutes() + 30);
          }
      
          allSlots.push(slotsForDay);
    
        }
      
        setDocSlots(allSlots);
      };
      
      
      


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
        // Find the selected slot using the selected time
        const selectedSlot = docSlots[slotIndex].find(slot => slot.time === slotTime);
    
        if (!selectedSlot) {
          toast.error("Please select a time slot");
          return;
        }
    
        const date = selectedSlot.datetime;
        const time = selectedSlot.time;
    
        //Properly format the slotDate with padded values
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
    
        //Send the appointment data
        const { data } = await axios.post(
          backendUrl + '/api/user/book-appointment',
          { docId, slotDate, slotTime: time }, // use `time` instead of `slotTime` directly
          { headers: { token } }
        );
    
        if (data.success) {
          toast.success(data.message);
          getDoctorsData();
          navigate('/my-appointment');
        } else {
          toast.error(data.message);
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
      if (docInfo) {
        getAvailableSlots();
      }
    }, [docInfo]);
    

    useEffect(() => {

        getAvailableSlots();

    }, [docInfo]);


    useEffect(() => {
        console.log(docSlots)
    },[docSlots])

    // Voice Button Click for Appointment
    useEffect(() => {
      if (!voiceIntent) return;

        console.log("Voice Intent in Appointment:", voiceIntent);

      if (voiceIntent === "click_appointment_button") 
      {
        console.log("Voice triggered Booking Appointment");

        bookAppointment(); // Directly call your booking function
      }

      setVoiceIntent(null); // Always reset
    }, [voiceIntent]);


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