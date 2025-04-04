import express from 'express';
import { addDoctor, adminLogin, allDoctors } from '../Controllers/AdminController.js';
import upload from '../Middlewares/Multer.js';
import authAdmin from '../Middlewares/AuthAdmin.js';
import { changeAvailablity } from '../Controllers/DoctorController.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'), addDoctor)

adminRouter.post('/login', adminLogin)

adminRouter.post('/all-doctors' , authAdmin , allDoctors)

adminRouter.post('/change-availablity' , authAdmin , changeAvailablity);

export default adminRouter;