import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets.js";
import axios from 'axios'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = 'http://localhost:4000'
    const [doctors , setDoctors] = useState([]);
    const [token , setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : false);

    const getDoctorsData = async() => {

        try 
        {

            const {data} = await axios.get('http://localhost:4000/api/doctor/list')

            if(data.success)
            {
                setDoctors(data.doctors)
                console.log(doctors)
            }
            
        } catch (error) 
        {
            console.log(error);

            
        }
    }

    useEffect(() => {

        getDoctorsData();

    } , [])
    

    const value = {
        doctors,
        token,
        setToken,
        backendUrl

    }

    return(
        
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider