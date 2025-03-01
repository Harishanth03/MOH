import React from 'react'
import { specialityData } from '../assets/assets.js'
import {Link} from 'react-router-dom'

const SpecializeMenu = () => {
  return (
    <>
        <section className='w-full min-h-screen mt-4'>
            <h1 className='text-2xl font-bold text-center text-gray-900 sm:text-4xl'>Find your doctor by speciality</h1>
            <p className='text-sm text-gray-500 text-center mt-6'>Discover top-rated doctors across various specialties and book your appointment with ease. Your health, your choice!</p>
            <div className='flex flex-wrap justify-center gap-4 my-5'>
            {
                specialityData.map((item  , index) => (
                    <Link key={index} to={`/doctors/${item.speciality}`}>
                        <img src={item.image} alt="" />
                        <p>{item.speciality}</p>
                    </Link>
                ))
            }
            </div>
        </section>
    </>
  )
}

export default SpecializeMenu