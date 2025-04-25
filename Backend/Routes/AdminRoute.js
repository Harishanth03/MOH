import express from 'express';
import { addDoctor, adminDashboard, adminLogin, allDoctors, appointmentAdmin, AppointmentCancle, confirmBedAdmission, createWard, dischargePatient, getAllocatedBedsByWard } from '../Controllers/AdminController.js';
import upload from '../Middlewares/Multer.js';
import authAdmin from '../Middlewares/AuthAdmin.js';
import { changeAvailablity } from '../Controllers/DoctorController.js';
import { getAllWards } from '../Controllers/UserController.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'), addDoctor)

adminRouter.post('/login', adminLogin)

adminRouter.post('/all-doctors' , authAdmin , allDoctors)

adminRouter.post('/change-availablity' , authAdmin , changeAvailablity);

adminRouter.get('/appointments' , authAdmin , appointmentAdmin)

adminRouter.post('/cancle-appointment' , authAdmin , AppointmentCancle);

adminRouter.get('/dashboard', authAdmin , adminDashboard)

adminRouter.post('/ward' , authAdmin , createWard)

adminRouter.get('/wards' , authAdmin , getAllWards)

adminRouter.get('/allocated-beds' , authAdmin , getAllocatedBedsByWard)

adminRouter.post('/confirm-bed' , authAdmin , confirmBedAdmission)

adminRouter.post('/discharge-bed' , authAdmin , dischargePatient);

export default adminRouter;