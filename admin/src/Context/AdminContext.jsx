import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken , setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");

    const backendURL = 'http://localhost:4000';

    const [doctors , setDoctors] = useState([]);

    //============================================== Get All Doctors ============================================

    const getAllDoctors = async(req  , res) => {

        try 
        {

            const {data} = await axios.post(backendURL+'/api/admin/all-doctors' , {Headers:{aToken}});

            if(data.success)
            {

                setDoctors(data.doctors);

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

    const value = {
        aToken,
        setAToken,
        backendURL,
        doctors,
        getAllDoctors
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider;