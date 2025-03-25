import express from 'express';
import { addDoctor, adminLogin } from '../Controllers/AdminController.js';
import upload from '../Middlewares/Multer.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor',upload.single('image'), addDoctor)

adminRouter.post('/admin-login', adminLogin)

export default adminRouter;