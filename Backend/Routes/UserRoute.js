import express from 'express'
import { bookAppointment, cancleAppointment, getProfile, listAppointment, loginUser, registerUser, updateUserProfile } from '../Controllers/UserController.js';
import authUser from '../Middlewares/AuthUser.js';
import upload from '../Middlewares/Multer.js';

const userRouter  = express.Router();

userRouter.post('/register' , registerUser);
userRouter.post('/login' , loginUser);
userRouter.get('/get-profile', authUser , getProfile)
userRouter.post('/update-profile' , upload.single('image'), authUser , updateUserProfile)
userRouter.post('/book-appointment' , authUser , bookAppointment);
userRouter.get('/appointments' , authUser , listAppointment);
userRouter.post('/cancel-appointment' , authUser , cancleAppointment);


export default userRouter;