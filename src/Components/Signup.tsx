import React, { useEffect, useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail } from "../features/NewUser/NewUserSlice";
import { accordionSummaryClasses } from "@mui/material";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<string[]>([]);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    fetch("/universityLists.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCountries = Array.from(
          new Set(data.map((val) => val.country))
        ).sort();
        setCountries(uniqueCountries);
      })
      .catch((err) => toast.error("Failed to load countries"));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    educationType: "",
    school: "",
    school_year: "",
    college: "",
    college_stream: "",
    college_year: "",
    country: "",
    university: "",
  });

  useEffect(() => {
    fetch("/universityLists.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedUniversities = Array.from(
          new Set(
            data
              .filter((val) => val.country == formData.country)
              .map((val) => val.name)
          )
        ).sort();
        setUniversities(selectedUniversities);
      })
      .catch((err) => toast.error("Failed to load universities"));
  }, [formData.country]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      dispatch(setEmail(formData.email));

      const response = await api.post(apiRoutes.auth.register.signupRegister, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
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
        navigate("/verifyOTP");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Join Kepler 22B
            </h1>
            <p className="text-blue-100 text-lg">
              Start your tech education journey today
            </p>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {["name", "email"].map((id) => (
                  <div key={id} className="space-y-2">
                    <label
                      htmlFor={id}
                      className="block text-sm font-semibold text-slate-700"
                    >
                      {id.charAt(0).toUpperCase() +
                        id.slice(1).replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={
                        id.includes("password")
                          ? "password"
                          : id === "email"
                          ? "email"
                          : "text"
                      }
                      id={id}
                      value={formData[id]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      placeholder={`Enter your ${id}`}
                      required={
                        !(id === "password" || id === "confirmPassword")
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Password Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                {["password", "confirmPassword"].map((id) => (
                  <div key={id} className="space-y-2">
                    <label
                      htmlFor={id}
                      className="block text-sm font-semibold text-slate-700"
                    >
                      {id === "confirmPassword"
                        ? "Confirm Password"
                        : "Password"}
                    </label>
                    <input
                      type="password"
                      id={id}
                      value={formData[id]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      placeholder={
                        id === "confirmPassword"
                          ? "Confirm your password"
                          : "Enter your password"
                      }
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Country Details */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Country
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Education Type */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Education Level
                </label>
                <div className="flex gap-4">
                  {["school", "college"].map((type) => (
                    <label
                      key={type}
                      className="relative flex-1 cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="sr-only peer"
                        id="educationType"
                        value={type}
                        checked={formData.educationType === type}
                        onChange={handleChange}
                      />
                      <div className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-center font-medium text-slate-700 transition-all duration-200 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 peer-checked:shadow-md hover:border-slate-300">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-current rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          <span className="capitalize">{type}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* School Fields */}
              {formData.educationType === "school" && (
                <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      School Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      School Name
                    </label>
                    <input
                      type="text"
                      id="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      placeholder="Enter your school name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      School Year
                    </label>
                    <select
                      id="school_year"
                      value={formData.school_year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      required
                    >
                      <option value="">Select Year</option>
                      {[9, 10, 11, 12].map((year) => (
                        <option key={year} value={year}>
                          Class {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* College Fields */}
              {formData.educationType === "college" && (
                <div className="space-y-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      College Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      College Name
                    </label>
                    <select
                      id="college"
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                      required
                    >
                      <option value="">Select College Name</option>
                      {universities.map((college) => (
                        <option key={college} value={college}>
                          {college}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      College Stream
                    </label>
                    <select
                      id="college_stream"
                      value={formData.college_stream}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                      required
                    >
                      <option value="">Select Stream</option>
                      {["Bachelor's", "Master's", "PhD"].map((stream) => (
                        <option key={stream} value={stream}>
                          {stream}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.college_stream !== "PhD" &&
                    formData.college_stream && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Year of Study
                        </label>
                        <select
                          id="college_year"
                          value={formData.college_year}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
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
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-4 px-6 font-bold text-white rounded-xl transition-all duration-200 transform ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed scale-95"
                    : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  {loading && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  )}
                  <span className="text-lg">
                    {loading ? "Creating your account..." : "Create Account"}
                  </span>
                </div>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-slate-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-slate-600">
              Secure Registration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
