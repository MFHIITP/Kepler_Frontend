import React, { useEffect, useState } from "react";
import User_Details from './User_Details'
import Profile_Courses from "./Profile_Courses.jsx";
import Profile from "./Profile";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";
import CodingDetails from "./CodingDetails";
import Leaderboard from "./Leaderboard";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReferralManagement from "./ReferralManagement";

const Landing: React.FC<componentPropsInterface> = (props) => {
  const [option, setOption] = useState("courses");
  const [mobileView, setMobileView] = useState("courses")

  useEffect(() => {
    if(localStorage.getItem('profileOption')){
      setOption(localStorage.getItem('profileOption') ?? "courses");
      setMobileView(localStorage.getItem('profileOption') ?? "courses");
      localStorage.removeItem('profileOption')
    }
  }, [])
  
  
  // Professional navigation structure
  const navigationItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      sublabel: "Analytics & Overview"
    },
    {
      key: "courses",
      label: "Courses",
      sublabel: "Learning Modules"
    },
    {
      key: "profile",
      label: "Profile",
      sublabel: "Account Management"
    },
    {
      key: "Referral Management",
      label: "Referral Management",
      sublabel: "Referral Management"
    }
  ];

  const toolsItems = [
    {
      key: "keplerBoard",
      label: "Kepler Board",
      sublabel: "Code Practice Hub"
    },
    {
      key: "leaderboard",
      label: "Leaderboard", 
      sublabel: "Performance Rankings"
    },
    {
      key: "settings",
      label: "Settings",
      sublabel: "System Preferences"
    }
  ];

  return (
    <div className={`flex h-[91vh] bg-gray-50`}>
      {/* Professional Sidebar */}
      <div className={`bg-white border-r border-gray-200 shadow-sm ${mobileView == 'landing' ? 'w-screen md:flex-col md:w-[280px]' : 'hidden md:block'}`}>
        {/* Kepler Brand Header */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Kepler</h1>
              <p className="text-xs text-gray-500 font-medium">WHERE ASPIRATION MEET ACHIEVEMENT</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6">
          {/* Main Navigation */}
          <div className="px-4 mb-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              Navigation
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <div
                  key={item.key}
                  className={`group flex items-center px-3 py-3 rounded-lg cursor-pointer transition-all duration-150 ${
                    option === item.key
                      ? "bg-blue-50 border-r-2 border-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {setOption(item.key); setMobileView(item.key)}}
                >
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      option === item.key ? "text-blue-700" : "text-gray-700"
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {item.sublabel}
                    </div>
                  </div>
                  {option === item.key && (
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Tools & Resources */}
          <div className="px-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              Tools & Resources
            </div>
            <nav className="space-y-1">
              {toolsItems.map((item) => (
                <div
                  key={item.key}
                  className={`group flex items-center px-3 py-3 rounded-lg cursor-pointer transition-all duration-150 ${
                    option === item.key
                      ? "bg-blue-50 border-r-2 border-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {setOption(item.key); setMobileView(item.key)}}
                >
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      option === item.key ? "text-blue-700" : "text-gray-700"
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {item.sublabel}
                    </div>
                  </div>
                  {option === item.key && (
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Professional Footer */}
        <div className="px-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3">
            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </div>
            <div className="flex-1 py-2 md:py-0">
              <div className="text-sm font-medium text-gray-700">{props.details?.name}</div>
              <div className="text-xs text-gray-500">{props.details?.email}</div>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`bg-white relative ${mobileView != "landing" ? "md:flex-1 md:flex md:flex-col" : "hidden md:flex-1 md:flex md:flex-col"}`}>
        <div className={`absolute left-0.5 top-2 py-1 px-2 rounded-lg shadow-md bg-gray-300 md:hidden`} onClick={() => {setMobileView("landing")}}><FontAwesomeIcon icon={faArrowLeft}/></div>
        {/* Professional Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 capitalize">
                {option === "keplerBoard" ? "Kepler Board" : option}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {option === "dashboard" && "Analytics dashboard and learning progress overview"}
                {option === "courses" && "Browse and manage your technical learning modules"}
                {option === "profile" && "Manage your account settings and preferences"}
                {option === "keplerBoard" && "Interactive coding practice and skill development"}
                {option === "leaderboard" && "Performance rankings and competitive analytics"}
                {option === "settings" && "System configuration and user preferences"}
                {option == "Referral Management" && "Manage your referrals and wallet"}
              </p>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className={`flex-1 bg-gray-50`}>
          {option === "dashboard" && (
            <div className="h-full overflow-y-auto">
              <User_Details details={props.details} goToPage={setOption} />
            </div>
          )}
          {option === "courses" && (
            <div className="h-full overflow-y-auto">
              <Profile_Courses details={props.details} goToPage={setOption} />
            </div>
          )}
          {option === "profile" && (
            <div className="h-full overflow-y-auto">
              <Profile details={props.details} goToPage={setOption} />
            </div>
          )}
          {option === "keplerBoard" && (
            <div className="h-full overflow-y-auto">
              <CodingDetails details={props.details} goToPage={setOption} />
            </div>
          )}
          {option === "leaderboard" && (
            <div className="h-full overflow-y-auto">
              <Leaderboard details={props.details} goToPage={setOption} />
            </div>
          )}
          {option === "Referral Management" && (
            <div className="h-full overflow-y-auto">
              <ReferralManagement details={props.details} goToPage={setOption} />
            </div>
          )}
          {option === "settings" && (
            <div className="h-full overflow-y-auto">
              <div className="p-8">
                <div className="max-w-4xl">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Learning Preferences
                          </label>
                          <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                            <p className="text-sm text-gray-600">Configure your learning environment settings</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notification Settings
                          </label>
                          <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                            <p className="text-sm text-gray-600">Manage notification preferences</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Security
                          </label>
                          <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                            <p className="text-sm text-gray-600">Security and privacy settings</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            System Integration
                          </label>
                          <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                            <p className="text-sm text-gray-600">Third-party integrations and APIs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;