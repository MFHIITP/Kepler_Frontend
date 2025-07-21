import React, { useEffect, useState, useRef, ReactElement } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useNavigate } from "react-router-dom";
import { UseSelector } from "react-redux";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

function Otpverify() {
  const emailId = useSelector((state: RootState) => state.newUser.email)

  const otpref = useRef<HTMLInputElement | null>(null)
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    otpref.current?.focus()
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await api.post(apiRoutes.auth.otpVerify, {
          email: emailId,
          otp: otp,
        });

      if (!(response.status == 200)) {
        throw new Error("Network response was not ok");
      }
      localStorage.clear();
      setLoading(false)
      localStorage.setItem('registration_toast', 'Successfully Registered! Thank you for Registering')
      navigate("/login");
    } catch (error) {
      localStorage.clear();
      alert("Incorrect OTP Provided.");
      setLoading(false);
      navigate("/register")
    }
  };

  return ( 
    <div className={`flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 ${loading == true ? 'cursor-progress' : 'cursor-auto'}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">OTP Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-gray-700 font-semibold mb-2">Enter OTP:</label>
            <input
              ref={otpref}
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otpverify;
