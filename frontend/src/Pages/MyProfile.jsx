import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData , setUserData] = useState({
    name : "Harishanth",
    image : assets.user,
  })
  return (
    <section className='w-full min-h-screen'>


    </section>
  )
}

export default MyProfile