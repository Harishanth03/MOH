import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const DoctorsList = () => {

  const {doctors , aToken , getAllDoctors} = useContext(AdminContext);

  useEffect(() => {

    if(aToken)
    {
      getAllDoctors()
    }

  }, [aToken])

  return (

    <div className='m-5 max-h-[90vh] overflow-y-scroll'>

      <h1 className='text-large font-medium'>All Doctors</h1>

      <div className='w-full gap-4 pt-5 flex gap-y-6 flex-wrap'>
        {
          doctors.map((doctor , index) => (

            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>

              <img className='' src={doctor.image} alt="" />

              <div className='p-4'>

                <p className='text-neutral-800 text-lg font-medium'>{doctor.name}</p>
                <p className='text-zinc-600 text-sm'>{doctor.speciality}</p>

                <div className='mt-2 flex w-12 items-center gap-1 text-sm'>

                  <input type="checkbox" checked={doctor.available}/>

                  <p>Available</p>
                  
                </div>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  )

}

export default DoctorsList