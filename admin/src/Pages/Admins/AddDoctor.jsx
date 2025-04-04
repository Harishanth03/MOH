import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext.jsx";
import { toast } from "react-toastify";
import axios from 'axios'

const AddDoctor = () => {

  const [docImage , setDocImage] = useState(false);
  
  const [name , setName] = useState('');

  const [email , setEmail] = useState('');

  const [password , setPassword] = useState('');

  const [experience , setExperience] = useState('1 Year');

  const [about , setAbout] = useState('');

  const [speciality , setSpeciality] = useState('General physician');

  const [degree , setDegree] = useState('')

  const [address1 , setAddress1] = useState('')

  const [address2 , setAddress2] = useState('');

  const {backendURL , aToken} = useContext(AdminContext)

  const onsubmitHandler = async(event) => {

    event.preventDefault();

    try 
    {

      if(!docImage)
      {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();

      formData.append('image' , docImage);
      formData.append('name' , name);
      formData.append('email' , email);
      formData.append('password' , password);
      formData.append('speciality' , speciality);
      formData.append('degree' , degree);
      formData.append('experience' , experience);
      formData.append('about' , about);
      formData.append('address' , JSON.stringify({line1:address1 , line2:address2}));

      const {data} = await axios.post(backendURL+'/api/admin/add-doctor', formData , {headers:{aToken}});

      if(data.success)
      {
        toast.success(data.message);
        setDocImage(false);
        setName('')
        setAbout('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setExperience('')
        setSpeciality('')
        setPassword('')
        setDegree('')
      }
      else
      {
        toast.error(data.message);
      }
      
    } catch (error) 
    {
      
    }

  }

  return (

    <form onSubmit={onsubmitHandler} className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Doctors</p>

      <div className='bg-white border border-gray-300 px-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

        <div className='flex items-center gap-4 mb-8 text-gray-500'>

          <label htmlFor="upload-area">

            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImage ? URL.createObjectURL(docImage) : assets.upload_area} />

          </label>

          <input onChange={(e) => setDocImage(e.target.files[0])}  type="file" hidden id="upload-area" />

          <p>Upload doctor<br/>picture</p>

        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>

              <p>Doctor Name</p>

              <input onChange={(e) => setName(e.target.value)} value={name}  className='border border-gray-400 rounded px-3 py-2' type="text"  placeholder='Your Name' required/>

            </div>

            <div className='flex-1 flex flex-col gap-1'>

              <p>Doctor Email</p>

              <input onChange={(e) => setEmail(e.target.value)} value={email}  className='border border-gray-400 rounded px-3 py-2' type="email"  placeholder='Doctor Email' required/>

            </div>

            <div className='flex-1 flex flex-col gap-1'>

              <p>Doctor Password</p>

              <input onChange={(e) => setPassword(e.target.value)} value={password}  className='border border-gray-400 rounded px-3 py-2' type="password"  placeholder='Doctor Password' required/>

            </div>

            <div className='flex-1 flex flex-col gap-1'>

              <p>Doctor Experience</p>

              <select onChange={(e) => setExperience(e.target.value)} value={experience}  className='border border-gray-400 rounded px-3 py-2' id="experience">

                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>

              </select>

            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-1 flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>

              <p htmlFor="speciality" >Speciality</p>

              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border border-gray-400 rounded px-3 py-2'  id="speciality">

                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>

              </select>

            </div>

            <div className='flex-1 flex flex-col gap-1'>

              <p>Education</p>

              <input onChange={(e) => setDegree(e.target.value)} value={degree}  className='border border-gray-400 rounded px-3 py-2' type="text"  placeholder='Education' required/>

            </div>

            <div  className='flex-1 flex flex-col gap-2'>

              <p>Address</p>

              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border border-gray-400 rounded px-3 py-2' type="text"  placeholder='Address 1' required/>

              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border border-gray-400 rounded px-3 py-2' type="text" placeholder='Address 2'/>

            </div>

          </div>

        </div>

        <div>

          <p className='mt-4 mb-2'>About Doctor</p>

          <textarea onChange={(e) => setAbout(e.target.value)} value={about}  className='w-full px-4 pt-2 border border-gray-400 rounded'  placeholder='About Doctor' required/>

        </div>

        <button type='submit' className='bg-blue-500 cursor-pointer w-full px-10 py-3 mt-4 text-white rounded'>Add Doctor</button>

      </div>

    </form>

  );

};

export default AddDoctor;
