import express from 'express'
import { listDoctors } from '../Controllers/AdminController.js'
import { appointmentsDoctor, loginDoctor } from '../Controllers/DoctorController.js';
import authDoctor from '../Middlewares/AuthDoctor.js';


const doctorRouter = express.Router()

doctorRouter.get('/list' , listDoctors);

doctorRouter.post('/login' , loginDoctor);

doctorRouter.get('/appointment' , authDoctor , appointmentsDoctor);


export default doctorRouter