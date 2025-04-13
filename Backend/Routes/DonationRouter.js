import express from 'express';
import authUser from '../Middlewares/AuthUser.js';
import {createCheckoutSession, getTotalDonations} from '../Controllers/DonationController.js';
import donationModel from '../Models/DonationModel.js';

const donationRouter = express.Router();

donationRouter.post('/create-checkout-session' , authUser , createCheckoutSession);
donationRouter.get('/total', getTotalDonations); 
donationRouter.post('/record', authUser, async (req, res) => {
    try 
    {
      const { userId, amount, email, message } = req.body;
  
      const donation = new donationModel({ userId, amount, email, message });

      await donation.save();
  
      res.json({ success: true, message: 'Donation recorded successfully' });

    } catch (err) 
    {
      console.error("Error saving donation:", err.message);

      res.status(500).json({ success: false, message: 'Database save failed' });

    }

  });
  

export default donationRouter;
