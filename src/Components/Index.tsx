import React, { useState, useContext, useEffect, FC } from "react";
import Avatar from "@mui/material/Avatar";
import { MyContext } from "../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faChevronDown, faUser, faSignOutAlt, faGraduationCap, faBook, faUsers, faBell, faImage, faLayerGroup, faComments, faVideo, faHome, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Index: FC<componentPropsInterface> = ({ auth, details }) => {
  var name = details?.name;
  if (name != undefined) {
    name = name[0];
  }

  const [navOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [librarydrop, setLibrarydrop] = useState(false);
  const [noticedrop, setNoticedrop] = useState(false);
  const [coreTeamDropdownOpen, setcoreTeamDropdownOpen] = useState(false);
  const context = useContext(MyContext);  
  const adminemails = context?.adminemails ?? []
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    const response = await api.post(apiRoutes.auth.logout, {
        email: details?.email,
      });
    if (response.status == 200) {
      Cookies.remove("AccessToken", {
        path: '/'
      })
      Cookies.remove("RefreshToken", {
        path: '/'
      })
      Cookies.remove("ProfileInfo", {
        path: '/'
      })
      localStorage.setItem("toast_message", "Logout Successful!");
      localStorage.removeItem("userCode");
      setLoading(false);
      window.location.href = '/';
    } else {
      setLoading(false);
      toast.error("Do again");
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className="hidden md:block bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center ml-[-100px]">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <img
                    src="/Images/Kepler_Logo.png"
                    alt="Kepler 22B"
                    width={40}
                    height={40}
                    className="rounded-lg transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">Kepler 22B</span>
                </div>
              </Link>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                  window.location.pathname === "/" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>

              <Link 
                to="/aboutus"
                className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                  window.location.pathname === "/aboutus" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                About Us
              </Link>

              <Link 
                to="/courses"
                className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                  window.location.pathname === "/courses" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
                Courses
              </Link>

              {/* Admins Dropdown */}
              <div className="relative group">
                <button 
                  className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                    window.location.pathname.startsWith("/admins") ? "text-blue-600" : "text-gray-700"
                  }`}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  Admins
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-3 w-3" />
                </button>
                
                {dropdownOpen && (
                  <div 
                    className="absolute top-3 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="py-1">
                      <div
                        className="relative group/sub"
                        onMouseEnter={() => setcoreTeamDropdownOpen(true)}
                        onMouseLeave={() => setcoreTeamDropdownOpen(false)}
                      >
                        <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                          Meet our Team
                          <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 transform -rotate-90" />
                        </div>
                        
                        {coreTeamDropdownOpen && (
                          <div className="absolute left-full top-0 ml-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                              {[
                                "Executive Team",
                                "Educators Team",
                                "Technical Team",
                                "Marketing Team", 
                                "Financial Team",
                                "HR Team",
                              ].map((team: string, index) => (
                                <Link
                                  key={index}
                                  to={`/admins/coreteam/${team.toLowerCase().replace(/\s/g, "")}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {team}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Link 
                        to="/admins/userlist" 
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${auth ? "" : "hidden"}`}
                      >
                        UserList
                      </Link>
                      <Link 
                        to="/admins/liveusers" 
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                          auth ? "" : "hidden"
                        } ${adminemails.includes(details?.email ?? "") ? "" : "hidden"}`}
                      >
                        Live Users
                      </Link>
                      <Link 
                        to="/admins/historyusers" 
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                          auth ? "" : "hidden"
                        } ${adminemails.includes(details?.email ?? "") ? "" : "hidden"}`}
                      >
                        User History
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Library Dropdown */}
              <div className={`relative group ${auth ? "" : "hidden"}`}>
                <button 
                  className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                    window.location.pathname.startsWith("/library") ? "text-blue-600" : "text-gray-700"
                  }`}
                  onMouseEnter={() => setLibrarydrop(true)}
                  onMouseLeave={() => setLibrarydrop(false)}
                >
                  <FontAwesomeIcon icon={faBook} className="mr-2" />
                  Library
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-3 w-3" />
                </button>
                
                {librarydrop && (
                  <div 
                    className="absolute top-3 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseEnter={() => setLibrarydrop(true)}
                    onMouseLeave={() => setLibrarydrop(false)}
                  >
                    <div className="py-1">
                      <Link to="/library/resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Resources
                      </Link>
                      <Link to="/problems/dailyProblems" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Daily Problems
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/group_chat" 
                className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                  window.location.pathname.startsWith("/group_chat") ? "text-blue-600" : "text-gray-700"
                } ${auth ? "" : "hidden"}`}
              >
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                Group Chat
              </Link>

              <Link 
                to="/meeting"
                className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                  window.location.pathname === "/meeting" ? "text-blue-600" : "text-gray-700"
                } ${auth ? "" : "hidden"}`}
              >
                <FontAwesomeIcon icon={faVideo} className="mr-2" />
                Meeting
              </Link>

              <Link 
                to="https://sites.google.com/d/1YIiDDXlB4EW7wCFTASiACXPuoZ6JQRqL/edit"
                className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                  window.location.pathname.startsWith("/gallery") ? "text-blue-600" : "text-gray-700"
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faImage} className="mr-2" />
                Gallery
              </Link>

              {/* Notice Updates Dropdown */}
              <div className="relative group">
                <button 
                  className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                    window.location.pathname.startsWith("/notice") ? "text-blue-600" : "text-gray-700"
                  }`}
                  onMouseEnter={() => setNoticedrop(true)}
                  onMouseLeave={() => setNoticedrop(false)}
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  Updates
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-3 w-3" />
                </button>
                
                {noticedrop && (
                  <div 
                    className="absolute top-3 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseEnter={() => setNoticedrop(true)}
                    onMouseLeave={() => setNoticedrop(false)}
                  >
                    <div className="py-1">
                      <Link 
                        to="/notice/notices" 
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${auth ? "" : "hidden"}`}
                      >
                        Notice and Circulars
                      </Link>
                      <Link to="/notice/merchandise" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Merchandise
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 mr-[-100px]">
              {/* Profile Avatar */}
              <div className={`${auth ? "" : "hidden"}`}>
                <Link to="/profiles">
                  <Avatar
                    sx={{
                      bgcolor: window.location.pathname === "/profiles" ? "#2563eb" : "#374151",
                      width: 32,
                      height: 32,
                      fontSize: "0.875rem",
                      fontWeight: 600
                    }}
                    className="hover:scale-105 transition-transform cursor-pointer"
                  >
                    {name}
                  </Avatar>
                </Link>
              </div>

              {/* Login Button */}
              <Link
                to="/login"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
                  auth ? "hidden" : ""
                }`}
              >
                Login
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={loading}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors ${
                  auth ? "" : "hidden"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <header className="md:hidden bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Logo */}
            <Link to="/" className="flex items-center space-x-2" onClick={() => setNavOpen(false)}>
              <img
                src="/Images/Kepler_Logo.png"
                alt="Kepler 22B"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <div>
                <span className="text-lg font-bold text-gray-900">Kepler 22B</span>
              </div>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <FontAwesomeIcon icon={navOpen ? faClose : faBars} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
              <Link 
                to="/" 
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === "/" 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
                  onClick={() => setNavOpen(false)}
              >
                <FontAwesomeIcon icon={faHome} className="mr-3" />
                Home
              </Link>

              <Link 
                to="/aboutus"
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === "/aboutus" 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
                  onClick={() => setNavOpen(false)}
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-3" />
                About Us
              </Link>

              <Link 
                to="/courses"
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === "/courses" 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
                  onClick={() => setNavOpen(false)}
              >
                <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
                Courses
              </Link>

              {/* Mobile Admins */}
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                    window.location.pathname.startsWith("/admins") 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="mr-3" />
                    Admins
                  </span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`h-3 w-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} 
                  />
                </button>
                
                {dropdownOpen && (
                  <div className="ml-4 space-y-1">
                    <button
                      onClick={() => setcoreTeamDropdownOpen(!coreTeamDropdownOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                    >
                      Meet our Team
                      <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className={`h-3 w-3 transition-transform ${coreTeamDropdownOpen ? "rotate-180" : ""}`} 
                      />
                    </button>
                    
                    {coreTeamDropdownOpen && (
                      <div className="ml-4 space-y-1">
                        {[
                          "Executive Team",
                          "Educators Team",
                          "Technical Team",
                          "Marketing Team", 
                          "Financial Team",
                          "HR Team",
                        ].map((team, index) => (
                          <Link
                            key={index}
                            to={`/admins/coreteam/${team.toLowerCase().replace(/\s/g, "")}`}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            onClick={() => setNavOpen(false)}
                          >
                            {team}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    <Link 
                      to="/admins/userlist" 
                      className={`block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md ${auth ? "" : "hidden"}`}
                      onClick={() => setNavOpen(false)}
                    >
                      UserList
                    </Link>
                    <Link 
                      to="/admins/liveusers" 
                      className={`block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md ${
                        auth ? "" : "hidden"
                      } ${adminemails.includes(details?.email ?? "") ? "" : "hidden"}`}
                    >
                      Live Users
                    </Link>
                    <Link 
                      to="/admins/historyusers" 
                      className={`block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md ${
                        auth ? "" : "hidden"
                      } ${adminemails.includes(details?.email ?? "") ? "" : "hidden"}`}
                       onClick={() => setNavOpen(false)}
                    >
                      User History
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Library */}
              <div className={auth ? "" : "hidden"}>
                <button
                  onClick={() => setLibrarydrop(!librarydrop)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                    window.location.pathname.startsWith("/library") 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faBook} className="mr-3" />
                    Library
                  </span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`h-3 w-3 transition-transform ${librarydrop ? "rotate-180" : ""}`} 
                  />
                </button>
                
                {librarydrop && (
                  <div className="ml-4 space-y-1">
                    <Link to="/library/resources" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md" onClick={() => setNavOpen(false)}>
                      Resources
                    </Link>
                    <Link to="/problems/dailyProblems" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md" onClick={() => setNavOpen(false)}>
                      Daily Problems
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/group_chat"
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === "/group_chat" 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                } ${auth ? "" : "hidden"}`}
                 onClick={() => setNavOpen(false)}
              >
                <FontAwesomeIcon icon={faComments} className="mr-3" />
                Group Chat
              </Link>

              <Link 
                to="/meeting"
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === "/meeting" 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                } ${auth ? "" : "hidden"}`}
                 onClick={() => setNavOpen(false)}
              >
                <FontAwesomeIcon icon={faVideo} className="mr-3" />
                Meeting
              </Link>

              <Link 
                to="https://sites.google.com/d/1YIiDDXlB4EW7wCFTASiACXPuoZ6JQRqL/edit"
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname.startsWith("/gallery") 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setNavOpen(false)}
              >
                <FontAwesomeIcon icon={faImage} className="mr-3" />
                Gallery
              </Link>

              {/* Mobile Circulars */}
              <div>
                <button
                  onClick={() => setNoticedrop(!noticedrop)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                    window.location.pathname.startsWith("/notice") 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faBell} className="mr-3" />
                    Circulars
                  </span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`h-3 w-3 transition-transform ${noticedrop ? "rotate-180" : ""}`} 
                  />
                </button>
                
                {noticedrop && (
                  <div className="ml-4 space-y-1">
                    <Link 
                      to="/notice/notices" 
                      className={`block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md ${auth ? "" : "hidden"}`} onClick={() => setNavOpen(false)}
                    >
                      Notice and Circulars
                    </Link>
                    <Link to="/notice/merchandise" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md" onClick={() => setNavOpen(false)}>
                      Merchandise
                    </Link>
                    <Link to="/notice/donation" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md" onClick={() => setNavOpen(false)}>
                      Donate Us
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Profile */}
              <Link 
                to="/profiles" 
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === "/profiles" 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                } ${auth ? "" : "hidden"}`}
                 onClick={() => setNavOpen(false)}
              >
                <Avatar
                  sx={{
                    bgcolor: window.location.pathname === "/profiles" ? "#2563eb" : "#374151",
                    width: 24,
                    height: 24,
                    fontSize: "0.75rem",
                    marginRight: "0.75rem"
                  }}
                >
                  {name}
                </Avatar>
                Profile
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/login"
                  className={`block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 ${
                    auth ? "hidden" : ""
                  }`}
                  onClick={() => setNavOpen(false)}
                >
                  Login
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className={`block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 mt-2 ${
                    auth ? "" : "hidden"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Index;