import express from 'express';
import authUser from '../Middlewares/AuthUser';
import { addDonation } from '../Controllers/DonationController';

const donationRouter = express.Router();

donationRouter.post('/add-donate' , authUser , addDonation);

export default donationRouter;
