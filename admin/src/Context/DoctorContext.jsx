import { createContext, useState } from "react";


export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    

    const backendURL = 'http://localhost:4000';

    const [dToken , setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "");



    const value = {

        dToken,
        backendURL,
        setDToken

    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}


export default DoctorContextProvider;