import React, { useEffect, useState, useRef, ReactElement } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearEmail } from "../features/NewUser/NewUserSlice";

function Otpverify() {
  const emailId = useSelector((state: RootState) => state.newUser.email)

  const otpref = useRef<HTMLInputElement | null>(null)
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    otpref.current?.focus()
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
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
      dispatch(clearEmail());
      navigate("/login");
    } catch (error) {
      localStorage.clear();
      alert("Incorrect OTP Provided.");
      setLoading(false);
      navigate("/register")
    }
  };

  return ( 
    <div className={`flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden ${loading == true ? 'cursor-progress' : 'cursor-auto'}`}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md relative z-10 transform transition-all duration-300 hover:shadow-3xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg transform transition-transform duration-300 hover:scale-110">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            OTP Verification
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Please enter the verification code sent to your email
          </p>
          {emailId && (
            <div className="flex items-center justify-center mt-3 px-3 py-1 bg-blue-50 rounded-full inline-flex">
              <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-blue-700">{emailId}</span>
            </div>
          )}
        </div>

        <div onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-3">
              Enter OTP Code
            </label>
            <div className="relative">
              <input
                ref={otpref}
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-4 text-lg text-center font-mono tracking-widest border-2 border-gray-200 rounded-xl text-gray-700 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className={`w-full px-4 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            } focus:outline-none focus:ring-4 focus:ring-blue-200`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Verify OTP</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Footer */}
        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{' '}
            <button 
              type="button"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              onClick={() => console.log('Resend OTP')}
            >
              Resend OTP
            </button>
          </p>
        </div> */}
      </div>

      {/* Professional branding element */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Secure verification powered by advanced encryption
        </p>
      </div>
    </div>
  );
}

export default Otpverify;