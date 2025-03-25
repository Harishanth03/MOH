import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import doctorModel from '../Models/DoctorModel.js';

//================================================ Add Doctor Function ===================================================

const addDoctor = async(req , res) => {

    try 
    {

        const {name , email , password , speciality , degree , experience , about , address } = req.body;

        const imageFile = req.file;

        //check all data is available
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !address)
        {
            return res.json({success:false , message:"Please fill all the details"})
        }

        //validate the email
        if(!validator.isEmail(email))
        {
            return res.json({success:false , message:"Please enter a valid email"})
        }

        //validate strong Password
        if(password.length < 8)
        {
            return res.json({success:false , message:"Please enter a strong password"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password , salt);

        //update image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type:"image"})

        const imageUrl = imageUpload.secure_url;


        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashPassword,
            speciality,
            degree,
            experience,
            about,
            address:JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);

        await newDoctor.save()

        res.json({success:true , message:"Doctor addedd"});
        
    } catch (error) 
    {
        console.log(error)

        res.json({success:false , message:error.message})
    }
}

export {addDoctor}