import express from 'express'
import { getProfile, loginUser, registerUser, updateUserProfile } from '../Controllers/UserController.js';
import authUser from '../Middlewares/AuthUser.js';
import upload from '../Middlewares/Multer.js';

const userRouter  = express.Router();

userRouter.post('/register' , registerUser);
userRouter.post('/login' , loginUser);
userRouter.get('/get-profile', authUser , getProfile)
userRouter.post('/update-profile' , upload.single('image'), authUser , updateUserProfile)


export default userRouter;