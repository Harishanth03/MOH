import validator from 'validator'
import bcrypt from 'bcrypt'
import patientModel from '../Models/PatientModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../Models/DoctorModel.js';
import appointmentModel from '../Models/AppointmentModel.js';
import wardModel from '../Models/WardModel.js';
import BedAllocationModel from '../Models/BedAllocationModel.js';
import { sendSms } from '../utils/sendSms.js';
import Feedback from '../Models/FeedBackModel.js';
import ReportModel from '../Models/ReportModel.js';
//====================================== Register User ==================================================

const registerUser = async(req , res) => {

    try 
    {

        const {name , email , password} = req.body;
        
        if(!name || !email || !password)
        {
            return res.json({success:false , message:"Missing Data!"});

        }

        if(!validator.isEmail(email))
        {
            return res.json({success:false , message:"Invalid Email"})
        }

        if(password.length < 8)
        {
            return res.json({success:false , message:"Please enter a strong Password"})
        }

        //hash user password
        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password , salt);

        const userData = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new patientModel(userData);

        const user = await newUser.save();

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true , token});
        
    } catch (error) 
    {

        console.log(error);

        res.json({success:false , message : error.message});
        
    }

}

//================================================== API for user Login ======================================================

const loginUser = async(req , res) => {

    try 
    {

        const {email , password} = req.body;

        const user = await patientModel.findOne({email});

        if(!user)
        {

            return res.json({success:false , message:"User Does not exist"})

        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(isMatch)
        {

            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET);

            res.json({success:true , token});
            
        }
        else
        {

            return res.json({success:false , message:"Please enter a Correct Password"})

        }


        
    } catch (error) {
        
        console.log(error);

        res.json({success:false , message : error.message});

    }
}

//===================================================== My Profile ============================================================

const getProfile = async(req  , res) => 
{
    try 
    {

        const {userId} = req.body;

        const userData = await patientModel.findById(userId).select('-password')

        res.json({success:true , userData});
        
    } catch (error) 
    {

        console.log(error);

        res.json({success:false , message : error.message});
        
    }
}

//============================================== Update User Profile ====================================================

const updateUserProfile = async (req, res) => {

    try {

        const { userId, name, dob, gender, address, phone_number } = req.body;

        const imageFile = req.file;

        if (!name || !dob || !gender || !phone_number) 
        {

            return res.json({ success: false, message: "Data missing" });

        }

        const updatedUser = await patientModel.findByIdAndUpdate(

            userId,

            { name, phone_number, address: JSON.parse(address), dob, gender },

            { new: true }

        );

        if (imageFile) 
        {

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

            const imageURL = imageUpload.secure_url;

            await patientModel.findByIdAndUpdate(userId, { image: imageURL }, { new: true });

        }

        res.json({ success: true, message: "Profile Updated", updatedUser });

    } 
    catch (error) 
    {

        console.log(error);

        res.json({ success: false, message: error.message });

    }
};

//========================================== Book Appointment ====================================================

const bookAppointment = async (req, res) => {

    try {

      const { userId, docId, slotDate, slotTime } = req.body;
  
      // Fetch doctor data and remove password from response
      const docData = await doctorModel.findById(docId).select('-password');
  
      if (!docData) 
      {

        return res.json({ success: false, message: 'Sorry, doctor is not available.' });

      }
  
      // Initialize slots_booked if not already present
      let slots_booked = docData.slots_booked || {};
  
      // Check if the date exists
      if (slots_booked[slotDate]) 
    {
        // Check if the time slot is already booked
        if (slots_booked[slotDate].includes(slotTime)) 
        {

          return res.json({ success: false, message: 'Sorry, slot is not available.' });

        } 
        else 
        {

          slots_booked[slotDate].push(slotTime); // Add new time slot

        }

      } 
      else 
      {
        // Create new date entry and add the slot
        slots_booked[slotDate] = [slotTime];

      }
  
      // Get patient data without password
      const userData = await patientModel.findById(userId).select('-password');
  
      // Optional: remove booked slots info before saving docData in appointment
      const { slots_booked: _, ...docDataWithoutSlots } = docData.toObject();
  
      // Build appointment object
      const appointmentData = {

        userId,
        docId,
        userData,
        docData: docDataWithoutSlots,
        slotTime,
        slotDate,
        date: Date.now()

      };
  
      // Save the appointment
      const newAppointment = new appointmentModel(appointmentData);

      await newAppointment.save();
  
      // Update doctor's booked slots
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      res.json({ success: true, message: "Appointment Booked" });
  
    } 
    catch (error) 
    {

      console.error("Appointment booking error:", error);

      res.json({ success: false, message: error.message });

    }

  };

  //============================================ Get User Appointments ====================================================

  const listAppointment = async (req, res) => {

    try 
    {

        const { userId } = req.body;

        const appointments = await appointmentModel.find({userId});

        res.json({success:true , appointments});

        
    } catch (error) 
    {

        console.error("Appointment booking error:", error);

        res.json({ success: false, message: error.message });

    }

  }

  //============================================ Cancle the appointment ====================================================

  const cancleAppointment = async (req, res) => 
  {

    try 
    {

        const {userId , appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        //verify appointment User
        if(appointmentData.userId != userId)
        {
            return res.json({success:false , message:"Unauthorized User"})
        }

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

  //============================================ get All ward Details ====================================================

  const getAllWards = async(req , res) => {

    try 
    {

        const wards = await wardModel.find();

        res.status(200).json(wards);
        
    } 
    catch (error) 
    {

        console.error('Error fetching wards:', error);

        res.status(500).json({ message: 'Server error while fetching wards' });
        
    }

  }

  //============================================ bed Allocation ===============================================================

  const allocateBed = async(req , res) => 
  {

    try 
    {

        const {userId , wardName, wardNo, bedNo} = req.body;

        const existingBooking = await BedAllocationModel.findOne({
            
            userId,
            
            status: { $ne: 'discharged' } // Check for active bookings
            });

        if (existingBooking) 
        {

            return res.status(400).json({ success: false, message: 'User already has an active bed allocation.' });

        }

        const existingBed = await BedAllocationModel.findOne({ wardName, wardNo, bedNo, status: { $ne: 'discharged' } });

        if(existingBed)
        {

            return res.status(400).json({ success: false, message: 'This bed is already allocated to another patient.' });

        }

        const allocation = new BedAllocationModel({ userId, wardName, wardNo, bedNo })

        await allocation.save();

        const patient = await patientModel.findById(userId);

        if(patient && patient.phone_number)
        {

            const phone = patient.phone_number;

            const formattedPhone = phone.startsWith("94") ? phone : `94${phone.slice(-9)}`;

            const message = `Dear ${patient.name},\n\n` +
                `Your bed has been successfully allocated.\n\n` +
                `Ward Name: ${wardName}\n` +
                `Room Number: Room ${wardNo}\n` +
                `Bed Number: Bed ${bedNo}\n\n` +
                `Please arrive within 2 hours to confirm your admission.\n\n` +
                `– Ministory Of Health`;


            const smsResult = await sendSms(formattedPhone, message);

            if (!smsResult.success) {
                
                console.warn("SMS failed:", smsResult.message);
              }

        }

        res.status(201).json({ success: true, message: 'Bed successfully allocated', allocation });
        
    } 
    catch (error) 
    {

        console.error('Bed allocation error:', error);

        res.status(500).json({ success: false, message: 'Server error while allocating bed' });
        
    }

  }

  //============================================ bed Allocate get ===============================================================

  const getAllocatedBeds = async(req , res) => 
  {

    try 
    {

        const { wardName, wardNo } = req.query;

        const beds = await BedAllocationModel.find({ 
            wardName, 
            wardNo,
            status: { $ne: 'discharged' }
         }).select('bedNo -_id');

        const allocatedBedNumbers = beds.map(b => b.bedNo);

        res.status(200).json({ success: true, allocatedBeds: allocatedBedNumbers });
        
    } catch (error) 
    {

        console.error('Error fetching allocated beds:', err);

        res.status(500).json({ success: false, message: 'Failed to fetch allocated beds' });
        
    }

  }

  //=========================================== Feedback Code ===============================================================

  const submitFeedback = async (req  ,  res) => 
  {

    try 
    {

        const { doctorId, appointmentId, rating, comment, anonymous } = req.body;

        if (!doctorId || !appointmentId || !rating) 
        {

            return res.json({ success: false, message: "Required fields are missing" });

        }

        const existingFeedback = await Feedback.findOne({appointmentId});

        if (existingFeedback) 
        {

            return res.json({ success: false, message: "Feedback already submitted for this appointment" });

        }

        const newFeedback = await Feedback.create({

            userId: req.body.userId, 
            doctorId,
            appointmentId,
            rating,
            comment,
            anonymous: anonymous || false,

        });

        res.json({

            success: true,

            message: "Feedback submitted successfully",

            feedback: newFeedback,

        })
        
    } 
    catch (error) 
    {

        console.log(error);

        res.json({ success: false, message: error.message });
        
    }

  }
  
  //=================================================== Get my Report ====================================================

  const getMyReport = async (req , res) =>
  {

    try 
    {

        const { userId } = req.body;

        if (!userId) 
        {

            return res.json({ success: false, message: "Invalid User Access" });

        }

        const reports = await ReportModel.find({ userId }).sort({ date: -1 });

        res.json({ success: true, reports });
  
    } 
    catch (error) 
    {
        
        console.error(error);

        res.json({ success: false, message: error.message });
        
    }

  }

export {registerUser , getMyReport, submitFeedback , loginUser , getProfile  , updateUserProfile , bookAppointment , listAppointment , cancleAppointment , getAllWards , allocateBed , getAllocatedBeds}