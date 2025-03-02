import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

  return (
    <section id='home'>

        <div className='w-full flex flex-col md:grid grid-cols-2'>
            <div className='flex flex-col justify-center gap-4'>
                <div className='border-l-4 pl-4 border-[#FEB896]'>
                    <p className='text-balance font-medium text-[#023170]'>A range of programs for healthcare</p>
                </div>
                <h1 className="py-6 text-2xl font-bold text-start text-[#023170] sm:text-4xl">From Ministry Of Health</h1>
                <p className='text-gray-700 font-semibold'>Empowering lives with personalized, innovative healthcare solutions that prioritize well-being, enhance recovery, and redefine patient care through compassion, cutting-edge technology, and a commitment to excellence in every step of the journey.</p>
                <div>
                    <button onClick={() => navigate('/appointment')} className='px-[18px] cursor-pointer py-[10px] mt-4 bg-[#0D6EFD] text-white rounded font-medium'>make an Appointment</button>
                </div>
            </div>
            <div  className="w-full min-h-[100vw] sm:min-h-[34vw] items-end my-8 bg-no-repeat md:bg-right bg-cover md:bg-contain relative" style={{ backgroundImage: `url(${assets.HomeImage})` }}>
            </div>
        </div>

    </section>
  )
}

export default Header