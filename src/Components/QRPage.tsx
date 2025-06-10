import React from 'react';

function DonateQR() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Donate via QR Code
      </h2>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto text-center">
        <p className="text-gray-700 mb-6">
          Scan the QR code below to make your donation.
        </p>
        <img
          src="../../../Images/QR_Code.jpg"
          alt="QR Code"
          className="mx-auto mb-6"
        />
        <p className='my-4'>UPI ID: supratim.mukherjee123@okhdfcbank</p>
        <p className='text-lg mb-4'>Scan to pay with any UPI App</p>
        <p className="text-gray-600">
          Thank you for your support! Your generosity helps us continue our mission.
        </p>
      </div>
    </div>
  );
}

export default DonateQR;
