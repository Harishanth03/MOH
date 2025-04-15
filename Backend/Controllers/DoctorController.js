
import doctorModel from "../Models/DoctorModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

//================================================ Doctor Availablity ===================================================
const changeAvailablity = async(req , res) => {

    try 
    {

        const {docId} = req.body;

        const docData = await doctorModel.findById(docId);

        await doctorModel.findByIdAndUpdate(docId , {available: !docData.available})

        res.json({success:true , message:"Availablity Changed"});
        
        
    } catch (error) 
    {

        console.log(error);

        res.json({success:false , message : error.message});
        
    }
}

//================================================ Doctor Login ===================================================

const loginDoctor = async(req , res) => 
{
    try 
    {

        const {email , password} = req.body;

        if(!email)
        {
            return res.json({success:false , message:"Email is required"})
        }

        if(!password)
        {
            return res.json({success:false , message:"Password is required"})
        }

        const doctor = await doctorModel.findOne({email});

        if(!doctor)
        {
            return res.json({success:false , message:"Doctor not found"})
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if(!isMatch)
        {
            return res.json({success:false , message:"Invalid Password"})
        }
        else
        {
            const token = jwt.sign({id:doctor._id} , process.env.JWT_SECRET , {expiresIn:'1d'});

            res.json({success:true , token});
        }




        
    } catch (error) 
    {
        console.log(error);

        res.json({success:false , message : error.message});
    }
}


//================================================ Doctor appointments ===================================================

export{changeAvailablity , loginDoctor}