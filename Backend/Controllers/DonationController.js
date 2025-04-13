// controllers/DonationController.js
import Stripe from 'stripe';
import donationModel from '../Models/DonationModel.js';

const stripe = new Stripe('sk_test_51RDIreCk5O913mra8LXabdM59ZbBtrWXyEJGNrXDXMUp1nkFzYUDwQJVPNOhcbNA7qsU9TeBYeDddjM8S9yJkJvA00whjNJC69'); // Your secret key

const addDonation = async (req, res) => {
  try {
    const { amount, email, message, paymentMethodId } = req.body;
    const { userId } = req.body;

    if (!amount || !paymentMethodId) {
      return res.json({ success: false, message: "Amount and payment method are required." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Amount in cents
        currency: 'lkr',
        payment_method: paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'  // 👈 ADD THIS
        }
      });
      

    //  If payment is successful, save donation to DB
    const donation = new donationModel({
      userId,
      amount,
      email,
      message,
    });

    await donation.save();

    res.json({ success: true, message: "Donation successful. Thank you!" });

  } catch (error) {
    console.error("Stripe donation error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addDonation };
