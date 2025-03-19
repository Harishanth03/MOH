import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData , setUserData] = useState({
    name : "Harishanth",
    image : assets.user,
    email : "Harishanth08@gmail.com",
    phone : "1234567890",
    address : {
      line1: "233 , Anbuvalipuram",
      line2: "Trincomalee , Sri Lanka"
    },
    gender : "Male",
    dob : "2000-07-03",
  })
  return (
    <section className='w-full min-h-screen'>


    </section>
  )
}

export default MyProfile