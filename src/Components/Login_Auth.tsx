import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Shield, Sparkles, Loader2, Rocket, Star } from "lucide-react";

const loginFunction = async (emailID: string) => {
  const { data } = await api.post(apiRoutes.auth.login.authLogin, {
    email: emailID,
  });
  return data;
};

function Login_Auth() {
  const { email } = useParams();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const { mutate: authLoginMutation } = useMutation({
    mutationFn: (email: string) => loginFunction(email),
    onSuccess: (data) => {
      if (data.accessToken != null && data.refreshToken != null) {
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
        if (data.sendAlert) {
          localStorage.setItem("paymentLastDate", data.lastDate);
          localStorage.setItem("pendingCourses", JSON.stringify(data.courses));
        }
        window.location.href = "/";
      }
    },
    onError: () => {
      localStorage.setItem(
        "authfail",
        "Please provide some more informations about yourself."
      );
      window.location.href = `/authregister/${email}`;
    },
  });

  useEffect(() => {
    authLoginMutation(email!);
  }, []);

  // Visual progress simulation for better UX
  useEffect(() => {
    const steps = [
      { delay: 500, progress: 20, step: 1 },
      { delay: 1200, progress: 45, step: 2 },
      { delay: 2000, progress: 70, step: 3 },
      { delay: 2800, progress: 100, step: 4 },
    ];

    steps.forEach(({ delay, progress: newProgress, step: newStep }) => {
      setTimeout(() => {
        setProgress(newProgress);
        setStep(newStep);
      }, delay);
    });
  }, []);

  const authSteps = [
    { icon: Shield, title: "Verifying Credentials", description: "Checking your authentication details..." },
    { icon: CheckCircle, title: "Authentication Confirmed", description: "Your identity has been verified successfully" },
    { icon: Sparkles, title: "Setting Up Profile", description: "Preparing your personalized experience..." },
    { icon: Rocket, title: "Ready to Launch", description: "Welcome to Kepler! Redirecting you now..." }
  ];

  const currentStepData = authSteps[step] || authSteps[0];
  const CurrentIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 flex items-center justify-center p-6 overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
        
        {/* Floating Stars */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/20 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 10 + 8}px`
            }}
          >
            ✦
          </div>
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Kepler Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              KEPLER
            </span>
          </div>
          <div className="text-gray-400 text-sm">Next-Generation EdTech Platform</div>
        </div>

        {/* Main Authentication Card */}
        <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 p-12 shadow-2xl">
          {/* Status Icon */}
          <div className="text-center mb-8">
            <div className="relative inline-flex">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border-4 border-white/10 backdrop-blur-sm">
                {step < 4 ? (
                  <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                ) : (
                  <CurrentIcon className="w-12 h-12 text-green-400" />
                )}
              </div>
              
              {/* Pulsing Ring Effect */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border border-cyan-400/30 animate-pulse"></div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Authentication Progress</span>
              <span className="text-sm text-purple-400 font-semibold">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Current Step Information */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-white">
              {currentStepData.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {authSteps.map((stepData, index) => {
              const StepIcon = stepData.icon;
              const isActive = index <= step;
              const isCurrent = index === step;
              
              return (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white scale-110' 
                      : 'bg-gray-700/50 text-gray-500'
                    }
                    ${isCurrent ? 'ring-4 ring-purple-400/30 animate-pulse' : ''}
                  `}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className={`text-xs font-medium transition-colors duration-300 ${
                    isActive ? 'text-purple-400' : 'text-gray-600'
                  }`}>
                    Step {index + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Your Original Message with Professional Styling */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
            <div className="text-blue-300 font-medium mb-2">
              Your credentials have been verified successfully.
            </div>
            <div className="text-gray-300 mb-2">
              You are going to be directed to the website shortly.
            </div>
            <div className="text-gray-400 text-sm">
              Please wait patiently.
            </div>
          </div>

          {/* Original Image with Modern Frame */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-2">
              <img
                src="/Images/milky-way-shooting-star.webp"
                alt="Milky Way Shooting Star"
                className="w-full h-auto rounded-xl"
              />
            </div>
            {/* Image Overlay Effects */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
            <Shield className="w-4 h-4" />
            <span>Secured by Kepler Authentication System</span>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-2xl animate-float animation-delay-2000"></div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .bg-grid-white\/\[0\.02\] {
          background-image: url("data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3e%3cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' stroke-width='1' stroke-opacity='0.02'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e");
        }
      `}</style>
    </div>
  );
}

export default Login_Auth;