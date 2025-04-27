import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDatabase from './config/mongodb.js'
import connectCloudinary from './config/Cloudinary.js'
import adminRouter from './Routes/AdminRoute.js';
import doctorRouter from './Routes/DoctorRoute.js';
import userRouter from './Routes/UserRoute.js';
import donationRouter from './Routes/DonationRouter.js';
import { startBedReleaseScheduler } from './utils/bedReleaseScheduler.js';
import axios from 'axios';

//=============================================== App Config ========================================================

const app = express();
const port = process.env.PORT || 4000;
connectDatabase();
connectCloudinary();

//=============================================== Middleware ========================================================

app.use(express.json());
app.use(cors());

//=============================================== API End Point =====================================================

app.use('/api/admin', adminRouter);
app.use('/api/doctor' , doctorRouter)
app.use('/api/user' , userRouter);
app.use('/api/donation' , donationRouter);

//=============================================== AI Voice Prediction Route ========================================

app.post('/api/voice/predict', async (req , res) => {

  const {text} = req.body;

  try 
  {

    const response = await axios.post('http://localhost:5001/predict-intent', { text });
    
    const { response: botResponse, endpoint , intent} = response.data;

    res.json({

      response: botResponse,

      endpoint: endpoint,

      intent: intent

    });
    
  } 
  catch (error) 
  {

    console.error("Error calling ML server:", error);
    
    res.status(500).json({ error: "Internal Server Error" });
    
  }
})

//=============================================== Server Start =====================================================

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    startBedReleaseScheduler(); // tart background task
  });
