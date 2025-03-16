import React from 'react'
import { assets } from '../assets/assets'


const About = () => {
  return (
    <div className=''>

      <div className='text-center text-2xl pt-10 text-gray-500'>

        <p>ABOUT <span className='text-primary'>US</span></p>

      </div>

      <div className='flex flex-col md:flex-row gap-12 my-10'>

        <img className='w-full md:max-w-[360px] rounded-md' src={assets.newAbout} alt="" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-500'>

          <p>
          Welcome to GetWell, your trusted digital healthcare companion, designed to make managing your health easier, faster, and more efficient. At GetWell, we recognize the challenges individuals face when booking doctor appointments and accessing healthcare services, which is why we provide a seamless, user-friendly platform to connect patients with trusted medical professionals.
          </p>

          <p>
          GetWell is committed to revolutionizing healthcare through innovation. We continuously enhance our platform by integrating the latest advancements in digital health technology, ensuring a smooth and convenient experience for every user. Whether you're scheduling a consultation, managing ongoing care, or seeking reliable medical services, GetWell is here to support you at every step.
          </p>

          <b className='text-gray-800'>
            Our Vision
          </b>

          <p>
          Our vision at GetWell is to transform the way people access healthcare by bridging the gap between patients and healthcare providers. We strive to make quality medical services easily accessible, ensuring that you receive the care you need, whenever you need it
          </p>

        </div>

      </div>

    </div>
  )
}

export default About