
import doctorModel from "../Models/DoctorModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import appointmentModel from "../Models/AppointmentModel.js";

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

const appointmentsDoctor = async(req , res) =>
{
    try 
    {

        const {docId} = req.body;

        const appointments = await appointmentModel.find({docId});

        res.json({success:true , appointments});
        
    } catch (error) 
    {

        console.log(error);

        res.json({success:false , message : error.message});
        
    }
}

//=================================================== Complete Appointment =================================================

const appointmentComplete = async(req , res) => {

    try 
    {

        const {docId , appointmentId} = req.body;

        const appointmentData = await appointmentModel.find(appointmentId);

        if(appointmentData && appointmentData.docId === docId)
        {
            await appointmentModel.findByIdAndUpdate(appointmentId , {isCompleted : true})

            return res.json({success:true , message:"Appointment Completed"})
        }   
        else
        {
            return res.json({success:false , message:"Mark Falied"})
        }
        
    } catch (error) 
    {

        console.log(error);

        res.json({success:false , message : error.message});
        
    }

}

//=================================================== Complete Appointment =================================================

const appointmentCancle = async(req , res) => {

    try 
    {

        const {docId , appointmentId} = req.body;

        const appointmentData = await appointmentModel.find(appointmentId);

        if(appointmentData && appointmentData.docId === docId)
        {
            await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled : true})

            return res.json({success:true , message:"Appointment Cancelled"})
        }   
        else
        {
            return res.json({success:false , message:"Cancelled Falied"})
        }
        
    } catch (error) 
    {

        console.log(error);

        res.json({success:false , message : error.message});
        
    }

}

export{changeAvailablity , loginDoctor , appointmentsDoctor , appointmentComplete , appointmentCancle}