import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [totalDonations, setTotalDonations] = useState(0);
  const [email, setEmail] = useState('');          // ✅ Added
  const [message, setMessage] = useState('');      // ✅ Added

  const stripe = useStripe();
  const elements = useElements();

  const donationOptions = [200, 250, 300, 350];
  const isPresetSelected = donationOptions.includes(selectedAmount);

  const handleDonate = async () => {
    if (!selectedAmount) return;
  
    try {
      const { data } = await axios.post('http://localhost:4000/api/donation/create-checkout-session', {
        amount: selectedAmount,
        email,
        message,
      }, {
        headers: {
          token: localStorage.getItem('token'),
        }
      });
  
      if (data.success) {
        window.location.href = data.url; // 🔁 Redirect to Stripe Checkout
      } else {
        toast.error(data.message);
      }
  
    } catch (err) {
      console.error("Checkout redirect error:", err);
      toast.error("Something went wrong.");
    }
  };
  
  

  const backendUrl = "http://localhost:4000"; 

  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/donation/total`);
        if (data.success) {
          setTotalDonations(data.total);
        }
      } catch (err) {
        console.error("Error fetching total:", err);
      }
    };

    fetchTotalDonations();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-600 mb-3 text-center">Make a Difference in People's Lives</h2>
      <p className="text-gray-600 mb-4 text-center text-sm">
        Your donation helps patients battling cancer and other critical illnesses to get the treatment and care they need.
      </p>

      {/* Live Donations Tracker */}
      <div className="text-center text-green-700 font-semibold text-xl bg-green-50 border border-green-200 py-2 rounded-lg mb-4">
        Total Donations: රු {totalDonations}
      </div>

      {/* Preset Amount Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {donationOptions.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`py-2 px-3 rounded-lg border text-lg font-medium transition-all cursor-pointer duration-300 ${
              selectedAmount === amount
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
            }`}
          >
            රු {amount}
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="mb-5">
        <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-1">
          Or enter custom amount:
        </label>
        <input
          id="customAmount"
          type="number"
          placeholder="Enter amount"
          disabled={isPresetSelected}
          value={isPresetSelected ? '' : selectedAmount || ''}
          onChange={(e) => setSelectedAmount(Number(e.target.value))}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-0 ${
            isPresetSelected
              ? 'bg-gray-100 cursor-not-allowed border-gray-300'
              : 'bg-white border-gray-300'
          }`}
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Your Email (optional):
        </label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
        />
      </div>

      {/* Message */}
      <div className="mb-5">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Leave a message (optional):
        </label>
        <textarea
          id="message"
          rows="3"
          placeholder="Your kind words..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
        ></textarea>
      </div>

      {/* Stripe Card Element */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Details:</label>
        <div className="p-3 border border-gray-300 rounded-lg">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleDonate}
        disabled={!selectedAmount}
        className={`w-full ${
          selectedAmount ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
        } text-white py-2 rounded-lg text-lg font-semibold transition duration-300`}
      >
        Donate රු {selectedAmount || '0'}
      </button>
    </div>
  );
};

export default Donation;
