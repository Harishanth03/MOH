import { createContext, useEffect, useState } from "react";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken , setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");

    const backendURL = 'http://localhost:4000';

    const value = {
        aToken,
        setAToken,
        backendURL
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider;