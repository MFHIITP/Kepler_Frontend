import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLoginMessage } from "../features/LoginInfo/LoginInfo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const server_addr = import.meta.env.VITE_SERV_ADDR;
  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("registration_toast")) {
      toast.success(localStorage.getItem("registration_toast"), {
        icon: "🎉",
      });
      localStorage.clear();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response = await api.post(apiRoutes.auth.login.signInLogin, {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const data = await response.data;

      if (data.accessToken != null && data.refreshToken != null) {
        setLoading(false);
        Cookies.set("AccessToken", data.accessToken, {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        Cookies.set("RefreshToken", data.refreshToken, {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        Cookies.set("ProfileInfo", JSON.stringify(data.profileinfo), {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        localStorage.setItem("toast_message", `Login Successful! Welcome to Kepler ${data.profileinfo.name}`);
        if(data.sendAlert){
          dispatch(setLoginMessage(data.lastDate))
          localStorage.setItem("pendingCourses", JSON.stringify(data.courses))
        }
        window.location.href = "/";
      }
    } else {
      setLoading(false);
      setEmail("");
      setPassword("");
      const data = await response.data;
      toast.error(data.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${server_addr}/auth/google`;
  };

  return (
    <div
      className={`flex items-center justify-center py-12 bg-gray-100 ${
        loading ? "cursor-progress" : "cursor-auto"
      }`}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 ">
          Kepler Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
              loading ? "cursor-wait" : "cursor-pointer"
            }`}
          >
            {loading ? <>Logging...</> : <>Login</>}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-md font-semibold text-gray-600">
            Not signed up?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:underline text-md font-semibold"
            >
              Register
            </a>
          </p>
        </div>
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2 space-x-2 font-semibold text-gray-50 bg-orange-500 hover:bg-orange-700 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {/* Google logo */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.6-1.6-34.5-4.7-50.9H272v96.4h147.1c-6.4 34.6-25.2 64.1-53.6 83.7v69.4h86.7c50.7-46.7 80.3-115.4 80.3-198.6z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.2 0 132.8-23.8 177-64.6l-86.7-69.4c-24.1 16.2-55 25.8-90.3 25.8-69 0-127.5-46.6-148.4-109.1H36.1v68.5c44.5 88.2 135.4 148.8 235.9 148.8z"
              />
              <path
                fill="#FBBC05"
                d="M123.6 326.9c-10.6-31.4-10.6-65.7 0-97.1V161.3H36.1c-43.7 87.3-43.7 190.6 0 277.9l87.5-68.3z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c37.8 0 71.7 13 98.5 34.9l74-72.1C386.6 25.3 327.1 0 272 0 171.5 0 80.6 60.6 36.1 148.8l87.5 68.3C144.5 154.3 203 107.7 272 107.7z"
              />
            </svg>

            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
