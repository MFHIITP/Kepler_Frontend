import React, { useState, useEffect, useRef } from "react";
import { Users, BookOpen, Trophy, Target, Hammer, Settings, Rocket, Briefcase, Check, Star, Zap, Crown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Popping from "./Popping";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useNavigate } from "react-router-dom";
  interface responseInterface {
    users: number;
    courses: number;
  }
  const getUserNumbers = async () => {
    const { data } = await api.get<responseInterface>(apiRoutes.homePage);
    return data;
  };

function Numbers() {
  const [userNumber, setUserNumber] = useState(0);
  const [courseNumber, setCourseNumber] = useState(0);
  const [projectNumber, setProjectNumber] = useState(0);
  
  const [startUsers, setStartUsers] = useState(0);
  const [startCourse, setStartCourse] = useState(0);
  const [startProjects, setStartProjects] = useState(0);
  
  const [visible, setVisible] = useState(false);
  const numberRef = useRef(null);

  const navigate = useNavigate();

  const stats = [
    {
      icon: <Users className="w-12 h-12" />,
      number: startUsers,
      label: "Active Learners",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      number: startCourse,
      label: "Expert-Led Courses",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      number: startProjects,
      label: "Projects Completed",
      color: "from-orange-500 to-red-500"
    }
  ];

  const steps = [
    {
      title: "Lay the Foundation",
      description: "Master coding basics and programming fundamentals with hands-on practice",
      icon: <Hammer className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Master the Craft",
      description: "Advanced DSA, system design, and project building with real-world applications",
      icon: <Settings className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Showcase & Apply",
      description: "Build portfolio, optimize resume, and create an impressive GitHub profile",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Land Internships",
      description: "Interview preparation, mock interviews, and dedicated job placement support",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-orange-500 to-red-500"
    },
  ];

  const plans = [
    {
      tier: "FREE",
      price: "₹0",
      period: "/forever",
      description: "Perfect for getting started",
      features: [
        "Problem of the Day",
        "Basic coding resources",
        "Community access",
        "Basic tutorials"
      ],
      popular: false,
      color: "from-gray-500 to-gray-600"
    },
    {
      tier: "PLUS",
      price: "₹199",
      period: "/month",
      description: "Enhanced learning experience",
      features: [
        "Everything in Free Plan",
        "Complete practice sheet access",
        "Detailed editorials & solutions",
        "Priority community support",
        "Advanced IDE with debugging",
        "Progress tracking dashboard"
      ],
      popular: false,
      color: "from-blue-500 to-purple-500"
    },
    {
      tier: "PRO",
      price: "₹999",
      period: "/month",
      description: "Complete transformation package",
      features: [
        "Everything in Pro plan",
        "One premium course of choice",
        "Live interactive classes",
        "Comprehensive practice sets",
        "1-on-1 mentor sessions",
        "Exclusive workshops & webinars",
        "Job placement assistance",
        "Industry project assignments"
      ],
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    
    if (numberRef.current) {
      observer.observe(numberRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

   const { data, isLoading, error } = useQuery({
    queryKey: ["userNumbers"],
    queryFn: getUserNumbers,
  });
  useEffect(() => {
    if (!visible) {
      return;
    }
    setUserNumber(data?.users ?? -1);
    setCourseNumber(data?.courses ?? -1);
    const interval_user = setInterval(() => {
      if (startUsers < userNumber) {
        setStartUsers((startUsers) =>
          startUsers < userNumber ? startUsers + 1 : startUsers
        );
      } else {
        clearInterval(interval_user);
      }
    }, 100);

    const interval_course = setInterval(() => {
      if (startCourse < courseNumber) {
        setStartCourse((startCourse) =>
          startCourse < courseNumber ? startCourse + 1 : startCourse
        );
      } else {
        clearInterval(interval_course);
      }
    }, 100);

    return () => {
      clearInterval(interval_user);
      clearInterval(interval_course);
    };
  }, [courseNumber, visible]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Statistics Section */}
      <Popping>
        <section ref={numberRef} className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Impact in Numbers</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of learners who have transformed their careers with Kepler
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center transform hover:-translate-y-2">
                    {/* Icon with gradient background */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    
                    {/* Animated number */}
                    <div className="text-5xl font-bold text-gray-800 mb-3 font-mono">
                      {stat.number.toLocaleString()}+
                    </div>
                    
                    {/* Label */}
                    <p className="text-lg font-medium text-gray-600">
                      {stat.label}
                    </p>
                    
                    {/* Subtle glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Popping>

      {/* Learning Path Section */}
      <Popping>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Your Learning Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow our structured path from beginner to industry-ready professional
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="relative">
              {/* Desktop connector line */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 transform -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center transform hover:-translate-y-2">
                      {/* Step number */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-sm flex items-center justify-center shadow-lg`}>
                          {idx + 1}
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 mt-4`}>
                        {step.icon}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Subtle glow */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Popping>

      {/* Pricing Section */}
      <Popping>
        <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Choose Your Learning Plan</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select the perfect plan to accelerate your programming journey
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 transform hover:-translate-y-2 ${
                    plan.popular 
                      ? 'border-purple-500 lg:scale-105' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                        <Crown className="w-4 h-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.tier}</h3>
                      <div className="flex items-baseline justify-center mb-4">
                        <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                        <span className="text-gray-500 ml-1">{plan.period}</span>
                      </div>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mt-0.5`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-600 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <button className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-200'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                    } disabled:cursor-not-allowed`}
                    disabled = {plan.tier == 'FREE'}
                    onClick={plan.tier != 'FREE' ? () => {navigate("/courses")} : () => {}}>
                      {plan.tier === 'FREE' ? 'Available by Default' : 'Choose Plan'}
                    </button>
                  </div>
                  
                  {/* Gradient overlay for popular plan */}
                  {plan.popular && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Popping>
    </div>
  );
}

export default Numbers;