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
      toast.success(
        "Almost there. Please fill the following details for finer verification"
      );
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
  const serv_addr = import.meta.env.VITE_SERV_ADDR;

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
        localStorage.setItem(
          "registration_toast",
          "Congratulations, your account has been created. Please Login Again."
        );
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
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-50 ${
        loading ? "cursor-wait" : ""
      }`}
    >
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register for Kepler 22B
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "phone"].map((id) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                {id.charAt(0).toUpperCase() +
                  id.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={id.includes("password") ? "password" : "text"}
                id={id}
                value={id == "name" ? formData.name : formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-700 bg-gray-100 focus:ring focus:ring-blue-300 focus:outline-none"
                required={!(id === "password" || id === "confirmPassword")}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Education Type
            </label>
            <div className="space-y-2">
              {["school", "college"].map((type) => (
                <label
                  key={type}
                  className="inline-flex items-center space-x-2 mx-12 cursor-pointer px-2 pr-4 hover:bg-gray-400 bg-gray-300 rounded-lg"
                >
                  <input
                    type="radio"
                    className="hidden peer"
                    id="educationType"
                    value={type}
                    checked={formData.educationType === type}
                    onChange={handleChange}
                  />
                  <span className="text-gray-700">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {formData.educationType === "school" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  id="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md text-gray-700 bg-gray-100 focus:ring focus:ring-blue-300 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  School Year
                </label>
                <select
                  id="school_year"
                  value={formData.school_year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
                  required
                >
                  <option value="">Select Year</option>
                  {[9, 10, 11, 12].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {formData.educationType === "college" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  College Name
                </label>
                <input
                  type="text"
                  id="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md text-gray-700 bg-gray-100 focus:ring focus:ring-blue-300 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  College Stream
                </label>
                <select
                  id="college_stream"
                  value={formData.college_stream}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
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
              {formData.college_stream !== "PhD" && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Year of Study
                  </label>
                  <select
                    id="college_year"
                    value={formData.college_year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
                    required
                  >
                    <option value="">Select Year</option>
                    {(formData.college_stream === "Bachelor's"
                      ? ["1st", "2nd", "3rd", "4th", "5th"]
                      : ["1st", "2nd"]
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-semibold text-white bg-blue-500 rounded-md transition-all ${
              loading
                ? "cursor-not-allowed opacity-75"
                : "hover:bg-blue-600 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-md font-semibold text-gray-600 my-4 flex justify-center">
          Already Registered? &nbsp;{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
