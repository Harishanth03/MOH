import express from 'express';
import authUser from '../Middlewares/AuthUser.js';
import {createCheckoutSession, getTotalDonations} from '../Controllers/DonationController.js';

const donationRouter = express.Router();

donationRouter.post('/create-checkout-session' , authUser , createCheckoutSession);
donationRouter.get('/total', getTotalDonations); 

export default donationRouter;
