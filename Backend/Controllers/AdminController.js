import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import doctorModel from '../Models/DoctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../Models/AppointmentModel.js';
import patientModel from '../Models/PatientModel.js';
import donationModel from '../Models/DonationModel.js';
import wardModel from '../Models/WardModel.js';
import BedAllocationModel from '../Models/BedAllocationModel.js';

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

        if(appointments.length > 0)
        {
            res.json({success:true , appointments})
        }
        else
        {
            return res.json({success:false , message:"No Appointments available"})
        }
        
    } catch (error) 
    {
        console.log(error)

        res.json({success:false , message:error.message})
    }
}

//================================================= Cancle Appointment ==================================================

const AppointmentCancle = async (req, res) => 
    {
      try 
      {
  
        const {appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled:true});


        //relese doctor slots
        const { docId, slotDate, slotTime } = appointmentData;
  
      const doctorData = await doctorModel.findById(docId);
      if (!doctorData) 
      {
          return res.json({ success: false, message: "Doctor not found" });
      }
  
      let slots_booked = doctorData.slots_booked || {};
  
      if (slots_booked[slotDate]) 
      {
          slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
      }
  
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      res.json({ success: true, message: "Appointment Cancelled" });
    
      } catch (error) 
      {
  
          console.error("Appointment booking error:", error);
          res.json({ success: false, message: error.message });
          
      }

    }

    //================================================== Dashboard Data for admin panel ===========================================

    const adminDashboard = async (req , res) => 
    {
        try 
        {

            const doctors = await doctorModel.find({});

            const users = await patientModel.find({});

            const appointments = await appointmentModel.find({});

            const donations = await donationModel.find({} ,'amount');

            const totalDonations = donations.reduce((sum, donations) => sum + donations.amount, 0);

            const dashData = {
                doctors: doctors.length,
                users: users.length,
                appointments: appointments.length,
                latestAppointments: appointments.reverse().slice(0, 5),
                totaldonations: totalDonations,
            }

            res.json({success:true , dashData})


            
        } catch (error) 
        {

            console.error("Appointment booking error:", error);
            res.json({ success: false, message: error.message });
            
        }
    }

    //================================================= Add Ward Controller ==================================================

    const createWard = async (req , res) => {

        try 
        {

            const {wardName , wardNumbers} = req.body;

            if (!wardName || !wardNumbers || !Array.isArray(wardNumbers)) 
            {

                return res.status(400).json({ message: 'Invalid input format' });

            }

            const newWard = new wardModel({wardName , wardNumbers});

            await newWard.save();
            
            res.status(201).json({ message: 'Ward created successfully' });
            
        } catch (error) 
        {

            console.error('Error creating ward:', error);

            res.status(500).json({ message: 'Server error' });
            
        }
    }

    //================================================= Exporting all the functions ==============================================

    const getAllocatedBedsByWard = async (req, res) =>
    {

        try 
        {

            const { wardName, wardNo } = req.query;

            if (!wardName || !wardNo) 
            {

                return res.status(400).json({ success: false, message: 'wardName and wardNo are required' });

            }

            const beds = await BedAllocationModel.find({wardName, wardNo}).populate('userId', 'name email phone_number').sort({ allocationTime: -1 });

            res.status(200).json({success: true,beds});
            
        }
        catch (error) 
        {

            console.error('Error in getAllocatedBedsByWard:', error);
            res.status(500).json({
            success: false,
            message: 'Server error while fetching allocated beds',
            });
            
        }
    }

    //============================================ bed Allocate confirm ===============================================================

  const confirmBedAdmission = async (req, res) => 
    {
      try 
      {
  
          const {bedId} = req.body;
  
          const updated = await BedAllocationModel.findByIdAndUpdate(
  
              bedId,
  
              {isAdmitted:true},
  
              {new:true},
              
          ).populate('userId', 'name email phone_number');
  
          if(!updated)
          {
              return res.status(404).json({ success: false, message: 'Bed not found' });
          }
  
          res.status(200).json({
  
              success: true,
  
              message: `Admission confirmed for ${updated.userId?.name}`,
  
              allocation: updated,
  
          });
  
  
          
      } 
      catch (error) 
      {
  
          console.error('Error confirming admission:', err);
  
          res.status(500).json({ success: false, message: 'Server error while confirming bed admission' });
          
      }

    }

    const dischargePatient = async (req, res) => 
    {

        try 
        {

            const {bedId} = req.body;

            const allocation = await BedAllocationModel.findById(bedId);

            if(!allocation) 
            {

                return res.status(404).json({ success: false, message: 'Bed allocation not found' });

            }

            if (!allocation.isAdmitted) 
            {

                return res.status(400).json({ success: false, message: 'Patient is not admitted yet' });

            }

            allocation.status = 'discharged';

            allocation.isAdmitted = false;

            allocation.dischargedAt = new Date();

            await allocation.save();

            res.status(200).json({

                success: true,
                message: 'Patient discharged successfully',
                discharged: allocation,

            });
            
        } 
        catch (error) 
        {

            console.error('Discharge error:', error);

            res.status(500).json({ success: false, message: 'Server error while discharging patient' });
            
        }



    }


export {addDoctor , adminLogin , allDoctors  ,listDoctors , appointmentAdmin  , AppointmentCancle , adminDashboard , createWard , getAllocatedBedsByWard , confirmBedAdmission, dischargePatient}