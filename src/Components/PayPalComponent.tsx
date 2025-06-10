import React from 'react';
import { useParams } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function DonateWithPayPal() {
    const {donation} = useParams();
  return (
    <PayPalScriptProvider options={{ "client-id": "AbKi1wxGY88wLBvAqdQA6hTLB6LVOHXg6d6M--GMC097p5Gau-FOBeE9Ov-Q6ELt2CKoU39bcsFXENpC", currency: "USD" }}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Donate via PayPal</h2>
          <p className="text-gray-700 mb-6 text-center">
            Your support helps us continue our mission. Donate ${donation} using PayPal!
          </p>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: donation,
                  },
                }],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(`Thank you for your donation, ${details.payer.name.given_name}!`);
              });
            }}
            onError={(err) => {
              console.error("PayPal Checkout Error: ", err);
              alert("An error occurred. Please try again.");
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default DonateWithPayPal;
