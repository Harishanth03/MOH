import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import { AdminContext } from './Context/AdminContext'
import Navbar from './Components/Navbar.Jsx'
import Sidebar from './Components/Sidebar'

const App = () => {

  const{aToken} = useContext(AdminContext)

  return aToken ? (
    
    <div className='bg-[#F8F9FD]'>

      <ToastContainer/>
      <Navbar/>

      <div className='flex items-start'>

        <Sidebar/>

      </div>

    </div>
  ):
  (
    <>

      <Login/>

      <ToastContainer/>

    </>
  )
}

export default App