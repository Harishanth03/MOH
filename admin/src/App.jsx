import React from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify'

const App = () => {
  return (
    <div>
      <Login/>
      <ToastContainer/>
    </div>
  )
}

export default App