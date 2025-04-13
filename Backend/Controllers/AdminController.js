import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import doctorModel from '../Models/DoctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../Models/AppointmentModel.js';

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

//================================================ Admin Login Function ===================================================

const adminLogin = async(req , res) => {

    try 
    {

        const {email , password} = req.body;


        if(!email || !password)
        {
            return res.json({success:false , message:"Please fill all the details"})
        }

        if(!validator.isEmail(email))
        {
            return res.json({success:false , message:"Please enter a valid email"})
        }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {
            const aToken = jwt.sign(email + password, process.env.JWT_SECRET)

            res.json({success:true , aToken})
        }
        else
        {
            res.json({success:false , message:"Invalide email or Password"})
        }
        
    } catch (error) 
    {
        
        console.log(error)

        res.json({success:false , message:error.message})
        
    }


}

//================================================ Get all doctors ===================================================

const allDoctors = async(req , res) => {
   
    try 
    {
        
        const doctors = (await doctorModel.find({}).select('-password')); //find all doctors

        res.json({success:true , doctors});

    } catch (error) 
    {

        console.log(error)

        res.json({success:false , message:error.message})
        
    }
    
}

//================================================= List All Doctors ==================================================

const listDoctors = async(req  , res) => {

    try 
    {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])

        res.json({success:true , doctors});
        
    } catch (error) 
    {

        console.log(error)

        res.json({success:false , message:error.message})
        
    }
}

//================================================= All appointment ==================================================

const appointmentAdmin = async (req , res) => {
    try 
    {

        const appointments = await appointmentModel.find({})

        res.json({success:true , appointments})
        
    } catch (error) 
    {
        console.log(error)

        res.json({success:false , message:error.message})
    }
}


export {addDoctor , adminLogin , allDoctors  ,listDoctors , appointmentAdmin}