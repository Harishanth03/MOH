import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken , setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");

    const backendURL = 'http://localhost:4000';

    const [doctors , setDoctors] = useState([]);

    const [appointments , setAppointments] = useState([]);

    //============================================== Get All Doctors ============================================

    const getAllDoctors = async(req  , res) => {

        try 
        {

            const {data} = await axios.post(backendURL+'/api/admin/all-doctors',{} , {headers:{aToken}});

            if(data.success)
            {

                setDoctors(data.doctors);
                console.log(data.doctors)

            }
            else
            {
                toast.error('No Doctors details available')
            }

            
        } catch (error) 
        {
            toast.error(error.message);
        }
    }

    //============================================ Change Availablity ======================================================

    const changeAvailablity = async(docId) => {

        try 
        {

            const {data} = await axios.post(backendURL + '/api/admin/change-availablity' , {docId} , {headers:{aToken}});

            if(data.success)
            {
                toast.success(data.message);
                getAllDoctors()
            }
            else
            {
                toast.error(data.message);
            }
            
        } catch (error)
        {
            toast.error(error.message);
        }
    }

    //============================================= Get All appointments ===============================================

    const getAllAppoinments = async() => {

        try 
        {

            const {data} = await axios.get(backendURL + '/api/admin/appointments' , {headers:{aToken}});

            if(data.success)
            {
                setAppointments(data.appointments);
                console.log(data.appointments)
            }
            else
            {
                toast.error(data.message);
            }
            
        } catch (error) 
        {
            toast.error(error.message);
        }
    }

    const value = {
        aToken,
        setAToken,
        backendURL,
        doctors,
        getAllDoctors,
        changeAvailablity,
        setAppointments,
        getAllAppoinments,
        appointments
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider;