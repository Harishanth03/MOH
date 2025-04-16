import express from 'express'
import { listDoctors } from '../Controllers/AdminController.js'
import { appointmentCancle, appointmentComplete, appointmentsDoctor, loginDoctor } from '../Controllers/DoctorController.js';
import authDoctor from '../Middlewares/AuthDoctor.js';


const doctorRouter = express.Router()

doctorRouter.get('/list' , listDoctors);

doctorRouter.post('/login' , loginDoctor);

doctorRouter.get('/appointment' , authDoctor , appointmentsDoctor);

doctorRouter.post('/complete' , authDoctor , appointmentComplete);

doctorRouter.post('/cancle' , authDoctor , appointmentCancle)


export default doctorRouter