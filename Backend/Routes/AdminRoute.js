import express from 'express';
import { addDoctor } from '../Controllers/AdminController.js';
import upload from '../Middlewares/Multer.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor',upload.single('image'), addDoctor)

export default adminRouter;