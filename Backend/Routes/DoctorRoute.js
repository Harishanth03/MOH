import express from 'express'
import { listDoctors } from '../Controllers/AdminController.js'


const doctorRouter = express.Router()

doctorRouter.get('/list' , listDoctors);

export default doctorRouter