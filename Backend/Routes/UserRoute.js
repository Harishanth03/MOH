import express from 'express'
import { getProfile, loginUser, registerUser } from '../Controllers/UserController.js';
import authUser from '../Middlewares/AuthUser.js';

const userRouter  = express.Router();

userRouter.post('/register' , registerUser);
userRouter.post('/login' , loginUser);
userRouter.get('/get-profile', authUser , getProfile)


export default userRouter;