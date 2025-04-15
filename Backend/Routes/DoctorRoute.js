import express from 'express'
import { listDoctors } from '../Controllers/AdminController.js'
import { loginDoctor } from '../Controllers/DoctorController.js';


const doctorRouter = express.Router()

doctorRouter.get('/list' , listDoctors);

doctorRouter.post('/login' , loginDoctor);


export default doctorRouter