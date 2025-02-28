import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Doctors from './Pages/Doctors'
import Login from './Pages/Login'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyProfile from './Pages/MyProfile'
import MyAppointment from './Pages/MyAppointment'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>

      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/doctors' element = {<Doctors/>}/>
        <Route path='/doctors/:specialist' element = {<Doctors/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/contact' element = {<Contact/>}/>
        <Route path='/my-profile' element = {<MyProfile/>}/>
        <Route path='/my-appointment' element = {<MyAppointment/>}/>
        <Route path='/my-appointment/:docId' element = {<MyAppointment/>}/>
      </Routes>
      
    </div>
  )
}

export default App