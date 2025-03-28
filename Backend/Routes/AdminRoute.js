import express from 'express';
import { addDoctor, adminLogin, allDoctors } from '../Controllers/AdminController.js';
import upload from '../Middlewares/Multer.js';
import authAdmin from '../Middlewares/AuthAdmin.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'), addDoctor)

adminRouter.post('/login', adminLogin)

adminRouter.post('/all-doctors' , authAdmin , allDoctors)

export default adminRouter;