import express from 'express';
import authUser from '../Middlewares/AuthUser.js';
import { addDonation } from '../Controllers/DonationController.js';

const donationRouter = express.Router();

donationRouter.post('/add-donation' , authUser , addDonation);

export default donationRouter;
