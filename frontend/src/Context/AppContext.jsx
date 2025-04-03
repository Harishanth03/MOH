import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets.js";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = 'http://localhost:4000'
    const [doctors , setDoctors] = useState([]);
    const [token , setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : false);
    const [userData , setUserData] = useState(false);

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

    //=========================================== Get User Data =======================================

    const loadUserProfileData = async() => 
    {
        try 
        {

            const {data} = await axios.get(backendUrl+'/api/user/get-profile' , {headers:{token}});

            if(data.success)
            {
                setUserData(data.userData);
                console.log(data.userData); 
            }
            else
            {
                toast.error(data.message);
            }
            
        } catch (error) 
        {
            console.log(error);
        }
    }

    //=========================================== Update User Profile ================================================


    const updateUserProfile = async (updatedData, imageFile) => 
    {
        try 
        {

          const formData = new FormData();
      
          formData.append("userId", userData._id);
          formData.append("name", updatedData.name);
          formData.append("dob", updatedData.dob);
          formData.append("gender", updatedData.gender);
          formData.append("phone_number", updatedData.phone_number);
          formData.append("address", JSON.stringify(updatedData.address));
      
          if (imageFile) {
            formData.append("image", imageFile);
          }
      
          const { data } = await axios.post(
            `${backendUrl}/api/user/update-profile`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                token: token,
              },
            }
          );
      
          if (data.success) {
            toast.success(data.message);
            setUserData(data.updatedUser); // Optional: update local userData
          } else {
            toast.error(data.message);
          }
      
        } catch (error) {
          console.log(error);
          toast.error("Profile update failed.");
        }
      };
      

    useEffect(() => {

        getDoctorsData();

    } , [])

    useEffect(() => {

        if(token)
        {

            loadUserProfileData();

        }
        else
        {

            setUserData(false)

        }

    } , [token])
    

    const value = {
        doctors,
        token,
        setToken,
        backendUrl,
        userData,
        loadUserProfileData,
        updateUserProfile

    }

    return(
        
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider