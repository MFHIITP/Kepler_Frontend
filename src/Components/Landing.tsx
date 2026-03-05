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

// ─── Icons ────────────────────────────────────────────────────────────────────

const DashboardIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
  </svg>
);

const CoursesIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ProfileIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ReferralIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BoardIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const LeaderboardIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// ─── Nav Config ───────────────────────────────────────────────────────────────

const navigationItems = [
  { key: "dashboard",           label: "Dashboard",           sublabel: "Analytics & Overview",    icon: <DashboardIcon /> },
  { key: "courses",             label: "Courses",             sublabel: "Learning Modules",         icon: <CoursesIcon /> },
  { key: "profile",             label: "Profile",             sublabel: "Account Management",       icon: <ProfileIcon /> },
  { key: "Referral Management", label: "Referral Management", sublabel: "Referrals & Wallet",       icon: <ReferralIcon /> },
];

const toolsItems = [
  { key: "keplerBoard",  label: "Kepler Board", sublabel: "Code Practice Hub",       icon: <BoardIcon /> },
  { key: "leaderboard",  label: "Leaderboard",  sublabel: "Performance Rankings",    icon: <LeaderboardIcon /> },
  { key: "settings",     label: "Settings",     sublabel: "System Preferences",      icon: <SettingsIcon /> },
];

const pageDescriptions: Record<string, string> = {
  dashboard:            "Analytics dashboard and learning progress overview",
  courses:              "Browse and manage your technical learning modules",
  profile:              "Manage your account settings and preferences",
  keplerBoard:          "Interactive coding practice and skill development",
  leaderboard:          "Performance rankings and competitive analytics",
  settings:             "System configuration and user preferences",
  "Referral Management":"Manage your referrals and wallet",
};

const pageTitles: Record<string, string> = {
  keplerBoard: "Kepler Board",
  "Referral Management": "Referral Management",
};

// ─── Sidebar Nav Item ─────────────────────────────────────────────────────────

const NavItem = ({ item, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
      active
        ? "bg-indigo-600 shadow-md shadow-indigo-200"
        : "hover:bg-gray-100"
    }`}
  >
    <div className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
      active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
    }`}>
      {item.icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className={`text-sm font-medium truncate ${active ? "text-white" : "text-gray-700"}`}>
        {item.label}
      </div>
      <div className={`text-xs truncate mt-0.5 ${active ? "text-indigo-200" : "text-gray-400"}`}>
        {item.sublabel}
      </div>
    </div>
    {active && (
      <div className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />
    )}
  </button>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const Landing: React.FC<componentPropsInterface> = (props) => {
  const [option, setOption] = useState("courses");
  const [mobileView, setMobileView] = useState("courses");

  useEffect(() => {
    const saved = localStorage.getItem('profileOption');
    if (saved) {
      setOption(saved);
      setMobileView(saved);
      localStorage.removeItem('profileOption');
    }
  }, []);

  const currentTitle = pageTitles[option] ?? option.charAt(0).toUpperCase() + option.slice(1);
  const currentDesc = pageDescriptions[option] ?? "";

  return (
    <div className="flex h-[91vh] bg-gray-50" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
      `}</style>

      {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
      <aside className={`bg-white border-r border-gray-100 shadow-sm flex flex-col
        ${mobileView === 'landing' ? 'w-screen md:w-[268px] md:flex-col' : 'hidden md:flex md:w-[268px]'}`}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">Kepler</h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-0.5">
                Aspiration → Achievement
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">
              Main
            </p>
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.key}
                  item={item}
                  active={option === item.key}
                  onClick={() => { setOption(item.key); setMobileView(item.key); }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">
              Tools
            </p>
            <div className="space-y-1">
              {toolsItems.map((item) => (
                <NavItem
                  key={item.key}
                  item={item}
                  active={option === item.key}
                  onClick={() => { setOption(item.key); setMobileView(item.key); }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* User Footer */}
        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              {props.details?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">{props.details?.name}</div>
              <div className="text-xs text-gray-400 truncate">{props.details?.email}</div>
            </div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" title="Online" />
          </div>
        </div>
      </aside>

      {/* ══ MAIN CONTENT ════════════════════════════════════════════════════ */}
      <div className={`relative flex flex-col flex-1 min-w-0
        ${mobileView !== "landing" ? "flex" : "hidden md:flex"}`}
      >
        {/* Mobile back button */}
        <button
          className="absolute left-3 top-3 z-10 p-2 rounded-lg bg-white shadow border border-gray-200 text-gray-600 md:hidden"
          onClick={() => setMobileView("landing")}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
        </button>

        {/* Page Header */}
        <div className="bg-white border-b border-gray-100 px-8 py-5 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Active icon accent */}
              <div className="p-2.5 rounded-xl hidden sm:flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#eef2ff,#f5f3ff)" }}>
                <span className="text-indigo-600">
                  {[...navigationItems, ...toolsItems].find(i => i.key === option)?.icon}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 capitalize leading-tight">
                  {currentTitle}
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">{currentDesc}</p>
              </div>
            </div>

            {/* Breadcrumb pill */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
              <span>Kepler</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-indigo-500 font-medium capitalize">{currentTitle}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50 overflow-hidden">
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
            <div className="h-full overflow-y-auto p-8">
              <div className="max-w-3xl space-y-5">
                {[
                  { label: "Learning Preferences",  desc: "Configure your learning environment and study goals" },
                  { label: "Notification Settings",  desc: "Manage how and when you receive updates and reminders" },
                  { label: "Account Security",       desc: "Password, two-factor authentication, and privacy controls" },
                  { label: "System Integration",     desc: "Third-party integrations, API keys, and connected apps" },
                ].map((section) => (
                  <div key={section.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{section.label}</h3>
                    <p className="text-sm text-gray-400 mb-4">{section.desc}</p>
                    <div className="h-10 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                      <span className="text-xs text-gray-400">Coming soon</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;