import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const handleLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post(apiRoutes.auth.login.signInLogin, {
    email: email,
    password: password,
  });
  return data;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const server_addr = import.meta.env.VITE_SERV_ADDR;

  useEffect(() => {
    if (localStorage.getItem("registration_toast")) {
      toast.success(localStorage.getItem("registration_toast"), {
        icon: "🎉",
      });
      localStorage.clear();
    }
  }, []);

  const { mutate: handleLoginMutation } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      handleLogin({ email: email, password: password }),
    onMutate: () => setLoading(true),
    onSuccess: async (data) => {
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
        localStorage.setItem(
          "toast_message",
          `Login Successful! Welcome to Kepler ${data.profileinfo.name}`
        );
        localStorage.setItem("sendAlert", data.sendAlert);
        localStorage.setItem("paymentLastDate", data.lastDate);
        localStorage.setItem("pendingCourses", JSON.stringify(data.courses));
        window.location.href = "/";
      }
    },
    onError: async (data) => {
      setLoading(false);
      setEmail("");
      toast.error(data.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLoginMutation({ email, password });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${server_addr}/auth/google`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full md:max-w-md">
        {/* Main Login Card */}
        <div className=" bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6 md:min-w-max">
          <div className="text-center">
            `{/* Logo/Brand Section */}
            <div className="mb-6 flex justify-center items-center gap-6">
              <div className="flex items-center justify-center w-12 h-10 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                <svg
                  className="h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gray-900 bg-clip-text text-transparent">
                Kepler
              </h1>
              <p className="text-gray-600 font-medium mt-2">
                Master coding skills that land jobs
              </p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600">
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Forgot your password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                loading
                  ? "bg-gray-400 cursor-wait"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl 
                     bg-white hover:bg-gray-50 transition-all duration-200 font-semibold text-gray-700 
                     hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5 mr-3"
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
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
