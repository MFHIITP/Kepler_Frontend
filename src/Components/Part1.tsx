import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Play, Code, BookOpen, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Part1({auth}: {auth: boolean}) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("toast_message")) {
      const value = localStorage.getItem("toast_message");
      toast.success(value);
    }
    localStorage.removeItem("toast_message");
  }, []);

  const stats = [
    { number: "50+", label: "Active Learners" },
    { number: "100+", label: "Coding Challenges" },
    { number: "99.1%", label: "Job Success Rate" },
    { number: "24/7", label: "Expert Support" }
  ];

  const sampleCode = `#include <iostream>
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    string message = "Welcome to Kepler";
    cout << message << endl;
    return 0;
}`;

  const typeCode = async (text: string, delay = 50) => {
    setIsTyping(true);
    setCode("");
    for (let i = 0; i <= text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      setCode(text.slice(0, i));
    }
    setIsTyping(false);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOutput("Welcome to Kepler");
    setIsRunning(false);
  };

  useEffect(() => {
    const startDemo = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await typeCode(sampleCode, 30);
      await new Promise((resolve) => setTimeout(resolve, 800));
      await runCode();
    };

    startDemo();
  }, []);

  const features = [
    { icon: Code, text: "Interactive Coding" },
    { icon: BookOpen, text: "Comprehensive Curriculum" },
    { icon: Zap, text: "Real-time Execution" },
  ];

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("sendAlert") == "true") {
        const courses: string[] =
          JSON.parse(localStorage.getItem("pendingCourses")!) || [];
        const lastDate = localStorage.getItem("paymentLastDate")!;
        await Swal.fire({
          title: "Payment Pending",
          text: `The Deadline for the courses ${
            courses.length > 0 ? courses.join(", ") : ""
          } is ${lastDate}. Positively make the payment before the deadline to ensure smooth continuation of these courses. Failure to make payment before deadline will result in getting these courses removed from your account`,
          icon: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK",
        });
      }
      localStorage.removeItem("sendAlert");
      localStorage.removeItem("pendingCourses");
      localStorage.removeItem("paymentLastDate");
    })();
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-700 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 py-5 items-center min-h-[calc(100vh-6rem)]">
          {/* Left side - Hero content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-sm">
                  // EdTech Platform
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-violet-300 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  <img src="/Images/Kepler_Logo_Without_Background.png" alt="" width={250} height={250} className="pt-4"/>
                </span>
              </h1>
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-5xl font-black leading-tight">
                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Shape Your Future
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  Transform your programming skills with our AI-powered interactive platform. 
                  Join thousands of developers building the next generation of technology.
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Master programming through interactive coding experiences. Build
                real projects, solve challenges, and accelerate your tech
                career.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <feature.icon className="w-6 h-6 text-purple-400" />
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              onClick={() => navigate("/problems/allProblems")}>
                Start Coding
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
              onClick={() => navigate("/courses")}>
                Explore Courses
              </button>
            </div>
          </div>

          {/* Right side - Code Editor */}
          <div 
            className="relative"
            style={{
              transform: 'perspective(1000px) rotateY(-6deg) rotateX(2deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div 
              className="bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden shadow-green-700"
              style={{
                transform: 'perspective(1000px) rotateY(8deg) rotateX(-2deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Editor Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-800/80 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300 font-mono text-sm">
                    main.cpp
                  </span>
                </div>
                <button
                  onClick={runCode}
                  disabled={isTyping || isRunning}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  <Play className="w-4 h-4" />
                  <span>{isRunning ? "Running..." : "Run"}</span>
                </button>
              </div>

              {/* Code Area */}
              <div className="p-6">
                <div className="font-mono text-sm leading-relaxed min-h-[300px]">
                  <pre className="text-gray-300 whitespace-pre-wrap">
                    {code}
                    {isTyping && (
                      <span className="bg-purple-400 text-purple-900 animate-pulse">
                        |
                      </span>
                    )}
                  </pre>
                </div>
              </div>

              {/* Output Terminal */}
              <div className="border-t border-gray-700 bg-black/40">
                <div className="px-6 py-3 bg-gray-800/60">
                  <span className="text-gray-400 font-mono text-xs">
                    OUTPUT
                  </span>
                </div>
                <div className="px-6 py-4 min-h-[60px] flex items-center">
                  <div className="font-mono text-green-400">
                    {isRunning ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Compiling and running...</span>
                      </div>
                    ) : (
                      output && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">$</span>
                          <span className="animate-pulse">{output}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements - these will also be affected by the tilt */}
            <div 
              className="absolute -z-10 top-8 -right-8 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-bounce"
              style={{
                transform: 'perspective(1000px) rotateY(8deg) rotateX(-2deg)',
              }}
            ></div>
            <div 
              className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"
              style={{
                transform: 'perspective(1000px) rotateY(8deg) rotateX(-2deg)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Part1;
