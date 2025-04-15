import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    

    const backendURL = 'http://localhost:4000';

    const [dToken , setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "");

    const [appointment , setAppointment] = useState([]);

    const getappointment = async(req , res) => 
    {
        try 
        {

            const {data} = await axios.get(`${backendURL}/api/doctor/appointment` , {headers:{dToken}});

            if(data.success)
            {
                setAppointment(data.appointments.reverse());
                console.log(data.appointments);
            }
            else
            {
                toast.error(data.message);
            }
            
        } catch (error) 
        {
            console.log(error);

            toast.error(error.message);
        }
    }



    const value = {

        dToken,
        backendURL,
        setDToken,
        getappointment,
        appointment,
        setAppointment

    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}


export default DoctorContextProvider;