import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';

const Doctors = () => {

  const { speciality} = useParams();
  const {doctors} = useContext(AppContext)

  return (
    <div>

      <p>Browse Using Doctors Speciality</p>

      <div>

        <div>
          <p>General Physician</p>
          <p>Gynecologist</p>
          <p>Neurologist</p>
          <p>Dermatologist</p>
          <p>Pediatrician</p>
          <p>Gastroenterologist</p>
        </div>

      </div>

    </div>

  )
}

export default Doctors