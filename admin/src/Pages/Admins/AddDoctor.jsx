import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
  return (
    <form action="">
    <p>Add Doctor</p>

    <div>
      <div>
        <label htmlFor="image">
          <img src={assets.upload_area} alt="" />
        </label>
        <input hidden type="file" id="image" />
        <p>Upload Doctor <br /> Image</p>

        <div>
          <div>
            <p>Your name</p>
            <input type="text" placeholder="name" required />
          </div>

          <div>
            <p>Doctor Email</p>
            <input type="text" placeholder="email" required />
          </div>

          <div>
            <p>Doctor Password</p>
            <input type="password" placeholder="password" required />
          </div>

          <div>
            <p>Doctor Experience</p>
            <select>
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="More than 10 Year">More than 10 Year</option>
            </select>
          </div>

          <div>
            <p>Degree</p>
            <input type="text" placeholder="Degree" required />
          </div>

          <div>
            <p>Speciality</p>
            <select>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p>Education</p>
            <input type="text" placeholder="Education" required />
          </div>

          <div>
            <p>Address</p>
            <input type="text" placeholder="Address 1" required />
            <input type="text" placeholder="Address 2" required />
          </div>
        </div>

        <div>
          <p>About</p>
          <textarea rows={5} placeholder="Write about doctor"></textarea>
        </div>

        <button>Add Doctor</button>
      </div>
    </div>
  </form>
  )
}

export default AddDoctor