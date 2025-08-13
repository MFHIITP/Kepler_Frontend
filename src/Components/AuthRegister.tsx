import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";

function AuthRegister() {
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authfail")) {
      toast.success("Almost there. Please fill the following details for finer verification");
      localStorage.removeItem("authfail");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    educationType: "",
    school: "",
    school_year: "",
    college: "",
    college_stream: "",
    college_year: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(apiRoutes.auth.register.authRegister, {
        name: formData.name,
        phone: formData.phone,
        email: email,
        school:
          formData.educationType === "school" ? formData.school : undefined,
        school_year:
          formData.educationType === "school"
            ? formData.school_year
            : undefined,
        college:
          formData.educationType === "college" ? formData.college : undefined,
        college_stream:
          formData.educationType === "college"
            ? formData.college_stream
            : undefined,
        college_year:
          formData.educationType === "college"
            ? formData.college_year
            : undefined,
      });

      if (response.status === 200) {
        localStorage.setItem("registration_toast","Congratulations, your account has been created. Please Login Again.");
        navigate("/login");
      } else {
        alert(
          "You have already registered before. Please remove your earlier registration."
        );
      }
    } catch (error) {
      alert("An error occurred during registration. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12 opacity-10"></div>
            </div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">🚀</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Join Kepler 22B
              </h1>
              <p className="text-blue-100 text-lg">
                Complete your registration to unlock the future of tech education
              </p>
              <div className="mt-4 w-16 h-1 bg-white/30 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Education Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Education Level *
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  {["school", "college"].map((type) => (
                    <label
                      key={type}
                      className={`relative flex-1 cursor-pointer transition-all duration-200 ${
                        formData.educationType === type 
                          ? 'transform scale-105' 
                          : 'hover:scale-102'
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only peer"
                        id="educationType"
                        value={type}
                        checked={formData.educationType === type}
                        onChange={handleChange}
                      />
                      <div className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        formData.educationType === type
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      }`}>
                        <div className="text-2xl mb-2">
                          {type === 'school' ? '🏫' : '🎓'}
                        </div>
                        <div className={`font-semibold ${
                          formData.educationType === type ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {type.charAt(0).toUpperCase() + type.slice(1)} Student
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {type === 'school' ? 'Grades 9-12' : 'Undergraduate & Graduate'}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* School Fields */}
              {formData.educationType === "school" && (
                <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">🏫</span>
                    School Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="school" className="block text-sm font-semibold text-gray-700">
                        School Name *
                      </label>
                      <input
                        type="text"
                        id="school"
                        value={formData.school}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="Enter your school name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="school_year" className="block text-sm font-semibold text-gray-700">
                        Current Grade *
                      </label>
                      <select
                        id="school_year"
                        value={formData.school_year}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        required
                      >
                        <option value="">Select Grade</option>
                        {[9, 10, 11, 12].map((year) => (
                          <option key={year} value={year}>
                            Grade {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* College Fields */}
              {formData.educationType === "college" && (
                <div className="space-y-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">🎓</span>
                    College Information
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="college" className="block text-sm font-semibold text-gray-700">
                        College/University Name *
                      </label>
                      <input
                        type="text"
                        id="college"
                        value={formData.college}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="Enter your college/university name"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="college_stream" className="block text-sm font-semibold text-gray-700">
                          Degree Level *
                        </label>
                        <select
                          id="college_stream"
                          value={formData.college_stream}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                          required
                        >
                          <option value="">Select Degree Level</option>
                          {["Bachelor's", "Master's", "PhD"].map((stream) => (
                            <option key={stream} value={stream}>
                              {stream}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formData.college_stream !== "PhD" && (
                        <div className="space-y-2">
                          <label htmlFor="college_year" className="block text-sm font-semibold text-gray-700">
                            Year of Study *
                          </label>
                          <select
                            id="college_year"
                            value={formData.college_year}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                            required
                          >
                            <option value="">Select Year</option>
                            {(formData.college_stream === "Bachelor's"
                              ? ["1st", "2nd", "3rd", "4th", "5th"]
                              : ["1st", "2nd"]
                            ).map((year) => (
                              <option key={year} value={year}>
                                {year} Year
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 font-semibold text-lg rounded-xl transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed transform scale-95"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105 shadow-lg"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Creating Your Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Complete Registration</span>
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/login" 
                  className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 hover:shadow-lg"
                >
                  Sign In to Your Account
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure Registration
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Instant Access
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Free to Join
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;