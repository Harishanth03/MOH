import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import { AdminContext } from './Context/AdminContext'
import Navbar from './Components/Navbar.Jsx'
import Sidebar from './Components/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Dashboard from './Pages/Admins/Dashboard'
import AllAppointments from './Pages/Admins/AllAppointments'
import AddDoctor from './Pages/Admins/AddDoctor'
import DoctorsList from './Pages/Admins/DoctorsList'

const App = () => {

  const{aToken} = useContext(AdminContext)

  return aToken ? (
    
    <div className='bg-[#F8F9FD]'>

      <ToastContainer/>
      <Navbar/>

      <div className='flex items-start'>

        <Sidebar/>

        <Routes>

          <Route path='/' element={<></>}/>

          <Route path='/admin-dashboard' element={<Dashboard/>}/>

          <Route path='/all-appointment' element={<AllAppointments/>}/>

          <Route path='/add-doctor' element={<AddDoctor/>}/>

          <Route path='/doctor-list' element={<DoctorsList/>}/>

        </Routes>

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