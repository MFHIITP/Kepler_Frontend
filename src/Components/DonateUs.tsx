import React, { useState } from "react";

function DonateUs() {
  const [donationAmount, setDonationAmount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Support Us with Your Donation
      </h2>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Make a Contribution
        </h3>
        <p className="text-gray-700 mb-6">
          Your donation helps us continue our mission. Every contribution, big
          or small, makes a difference.
        </p>

        <form>
          <div className="mb-4">
            <label
              htmlFor="donation"
              className="block text-gray-700 font-medium"
            >
              Enter Donation Amount (₹)
            </label>
            <input
              type="number"
              id="donation"
              name="donation"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <a href={`/notice/donation/paypal/${(donationAmount / 70)}`} onClick={(e)=>{if(donationAmount <= 0){e.preventDefault(); alert("Donation Amount Cannot be 0.")}}}>
            <div
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 mb-4"
            >
              Donate via PayPal
            </div>
          </a>
        </form>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p className="text-md">Alternatively, you can donate via QR code:</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="/notice/donation/qrcode">
            <button className="bg-green-600 text-white py-3 rounded-lg px-10 shadow-md hover:bg-green-700 transition-all duration-300">
              Donate via QR Code
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DonateUs;
