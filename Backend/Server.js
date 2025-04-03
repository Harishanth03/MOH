import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDatabase from './config/mongodb.js'
import connectCloudinary from './config/Cloudinary.js'
import adminRouter from './Routes/AdminRoute.js';
import doctorRouter from './Routes/DoctorRoute.js';
import userRouter from './Routes/UserRoute.js';

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

//=============================================== Server Start =====================================================

app.listen(port, () => console.log(`Server started on port ${port}`));
