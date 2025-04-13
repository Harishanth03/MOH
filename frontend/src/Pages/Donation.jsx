import React, { useState } from 'react'

const Donation = () => {

    const [selectedAmount, setSelectedAmount] = useState(null);
  const [totalDonations, setTotalDonations] = useState(0); // 💡 New state
  const donationOptions = [10, 25, 50, 100];
  const isPresetSelected = donationOptions.includes(selectedAmount);

  const handleDonate = () => {
    if (selectedAmount && selectedAmount > 0) {
      setTotalDonations(prev => prev + selectedAmount); // 💰 Add to total
      setSelectedAmount(null); // reset after donation
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-600 mb-3 text-center">Make a Difference in People's Lives</h2>
      <p className="text-gray-600 mb-4 text-center text-sm">
        Your donation helps patients battling cancer and other critical illnesses to get the treatment and care they need.
      </p>

      {/*  Live Donations Tracker */}
      <div className="text-center text-green-700 font-semibold text-xl bg-green-50 border border-green-200 py-2 rounded-lg mb-4">
        Total Donations: රු {totalDonations}
      </div>

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

      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Your Email (optional):
        </label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Leave a message (optional):
        </label>
        <textarea
          id="message"
          rows="3"
          placeholder="Your kind words..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
        ></textarea>
      </div>

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
  )
}

export default Donation