import React, { useState, useContext, useEffect, FC } from "react";
import Avatar from "@mui/material/Avatar";
import { MyContext } from "../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
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
        path: '/',
        domain: window.location.hostname
      })
      Cookies.remove("RefreshToken", {
        path: '/',
        domain: window.location.hostname
      })
      Cookies.remove("ProfileInfo", {
        path: '/',
        domain: window.location.hostname
      })
      localStorage.setItem("toast_message", "Logout Successful!");
      setLoading(false);
      window.location.href = '/';
    } else {
      setLoading(false);
      toast.error("Do again");
    }
  };

  return (
    <>
      <div className="hidden md:grid h-16 grid-cols-[20%,65%,15%] px-4 z-50 shadow-xl">
        {/* Logo and Title Section */}
        <div className="flex items-center cursor-pointer">
          <img
            src="/Images/Kepler_Logo.png"
            alt="JMS Logo"
            height={80}
            width={80}
            className="rounded-lg hover:transition hover:duration-500 hover:scale-125"
          />
          <div className="font-semibold text-xl tracking-wide text-blue-900 transition-colors hover:scale-105  ml-4">
            <Link to="/">
            </Link>
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="flex items-center justify-center gap-8 relative">
          <div
            className={`cursor-pointer hover:text-blue-900 transition-colors hover:scale-110  ${
              window.location.pathname === "/"
                ? "text-blue-900"
                : "text-gray-900"
            }`}
          >
            <Link to="/">Home</Link>
          </div>
          {["About Us", "Courses"].map((link, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:text-blue-900 transition-colors  hover:scale-110 ${
                window.location.pathname ===
                `/${link.toLowerCase().replace(/\s/g, "")}`
                  ? "text-blue-900"
                  : "text-gray-900"
              }`}
            >
              <Link to={`/${link.toLowerCase().replace(/\s/g, "")}`}>{link}</Link>
            </div>
          ))}
          <div
            className={`relative cursor-pointer transition-colors  hover:scale-110`}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div
              className={`${
                window.location.pathname.startsWith("/admins")
                  ? "text-blue-900"
                  : "text-gray-900"
              } hover:text-blue-900`}
            >
              Admins
            </div>
            {dropdownOpen && (
              <div
                className={`absolute top-4 mt-2 w-40 bg-gray-300 text-black shadow-lg rounded-md`}
                onMouseEnter={() => {
                  setDropdownOpen(true);
                }}
              >
                <div
                  className="block pl-4 py-2 text-sm text-black hover:text-white hover:bg-gray-950 transition"
                  onMouseEnter={() => {
                    setcoreTeamDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    setcoreTeamDropdownOpen(false);
                  }}
                >
                  Meet our Team
                  {coreTeamDropdownOpen && (
                    <div className="absolute left-full top-0 w-52 bg-gray-300 shadow-lg rounded-md mt-0 ml-0">
                      {[
                        "Executive Committee",
                        "Core Committee",
                        "Treasury Committee",
                        "Development Team",
                        "Educators Team",
                        "PR Team",
                      ].map((team, index) => (
                        <Link
                          key={index}
                          to={`/admins/coreteam/${team
                            .toLowerCase()
                            .replace(/\s/g, "")}`}
                          className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-gray-950 transition"
                        >
                          {team}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link
                  to="/admins/userlist"
                  className={`block px-4 py-2 text-sm text-black hover:text-white hover:bg-gray-950 transition ${
                    auth ? "" : "hidden"
                  }`}
                >
                  UserList
                </Link>
                <Link
                  to="/admins/liveusers"
                  className={`block px-4 py-2 text-sm text-black hover:text-white hover:bg-gray-950 transition ${
                    auth ? "" : "hidden"
                  } ${
                    adminemails.includes(details?.email ?? "") ? "" : "hidden"
                  }`}
                >
                  Live Users
                </Link>
                <Link
                  to="/admins/historyusers"
                  className={`block px-4 py-2 text-sm text-black hover:text-white hover:bg-gray-950 transition ${
                    auth ? "" : "hidden"
                  } ${
                    adminemails.includes(details?.email ?? "") ? "" : "hidden"
                  }`}
                >
                  User History
                </Link>
              </div>
            )}
          </div>
          <div
            className={`relative cursor-pointer hover:text-blue-900 transition-colors hover:scale-110 ${
              auth ? "" : "hidden"
            }`}
            onMouseEnter={() => setLibrarydrop(true)}
            onMouseLeave={() => setLibrarydrop(false)}
          >
            <div
              className={`${
                window.location.pathname.startsWith("/library")
                  ? "text-blue-900"
                  : "text-gray-900"
              } hover:text-blue-900`}
            >
              Library
            </div>
            {librarydrop && (
              <div
                className={`absolute top-4 mt-2 w-40 bg-gray-300 shadow-lg rounded-md`}
                onMouseEnter={() => {
                  setLibrarydrop(true);
                }}
              >
                <Link
                  to="/library/resources"
                  className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-black transition"
                >
                  Resources
                </Link>
                <Link
                  to="/library/problems"
                  className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-black transition"
                >
                  Daily Problems
                </Link>
              </div>
            )}
          </div>
          <div
            className={`${
              window.location.pathname.startsWith("/group_chat")
                ? "text-blue-900"
                : "text-gray-900"
            } cursor-pointer hover:text-blue-900 duration-100 transition-colors hover:scale-110 ${auth ? "" : "hidden"}`}
          >
            <Link to="/group_chat">Group Chat</Link>
          </div>
          {["Meeting"].map((link, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:text-blue-900 transition-colors  hover:scale-110 ${
                window.location.pathname ===
                `/${link.toLowerCase().replace(/\s/g, "")}`
                  ? "text-blue-900"
                  : "text-gray-900"
              } ${auth ? "" : "hidden"}`}
            >
              <Link to={`/${link.toLowerCase().replace(/\s/g, "")}`}>{link}</Link>
            </div>
          ))}

          <div
            className={`cursor-pointer hover:text-blue-900 transition-colors  hover:scale-110 ${
              window.location.pathname.startsWith("/gallery")
                ? "text-blue-900"
                : "text-gray-900"
            } hover:text-blue-900`}
          >
            <Link to="https://sites.google.com/d/1YIiDDXlB4EW7wCFTASiACXPuoZ6JQRqL/edit">
              Gallery
            </Link>
          </div>

          <div
            className={`relative cursor-pointer hover:text-blue-900 transition-colors hover:scale-110 z-20`}
            onMouseEnter={() => setNoticedrop(true)}
            onMouseLeave={() => setNoticedrop(false)}
          >
            <div
              className={`${
                window.location.pathname.startsWith("/notice")
                  ? "text-blue-900"
                  : "text-gray-900"
              } hover:text-blue-900`}
            >
              NoticeUpdates
            </div>
            {noticedrop && (
              <div
                className={`absolute top-4 mt-2 w-40 bg-gray-300 shadow-lg rounded-md`}
                onMouseEnter={() => {
                  setNoticedrop(true);
                }}
              >
                <Link
                  to="/notice/notices"
                  className={`block px-4 py-2 text-sm text-black hover:text-white hover:bg-black transition ${
                    auth ? "" : "hidden"
                  }`}
                >
                  Notice and Circulars
                </Link>
                <Link
                  to="/notice/merchandise"
                  className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-black transition"
                >
                  Merchandise
                </Link>
                <Link
                  to="/notice/donation"
                  className="block px-4 py-2 text-sm text-black hover:text-white hover:bg-black transition"
                >
                  Donate Us
                </Link>
              </div>
            )}
          </div>
          {/* Profile Icon */}
          <div className={`cursor-pointer ${auth ? "" : "hidden"}`}>
            <Link to="/profiles">
              <Avatar
                sx={{
                  bgcolor:
                    window.location.pathname === "/profiles" ? "blue" : "black",
                  color:
                    window.location.pathname === "/profiles"
                      ? "white"
                      : "white",
                  zIndex: 10,
                }}
                className="hover:scale-110 transition-transform "
              >
                {name}
              </Avatar>
            </Link>
          </div>
        </div>

        {/* Login/Logout Section */}
        <div className="flex items-center gap-4 justify-end">
          <div
            className={`cursor-pointer px-4 py-2 rounded-md border transition-all duration-300 hover:text-blue-900 hover:border-blue-900  ${
              window.location.pathname === "/login"
                ? "text-blue-900 border-blue-900"
                : "text-gray-900 border-transparent"
            } hover:shadow-md ${auth ? "hidden" : ""}`}
          >
            <Link to="/login">Login</Link>
          </div>
          <button
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              loading
                ? "cursor-wait opacity-70"
                : "cursor-pointer hover:shadow-md hover:border-red-700 hover:scale-110"
            } border border-transparent text-red-500 border-red-500 ${
              auth ? "" : "hidden"
            }`}
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      {/*  --- Mobile Navbar --- */}

      <div className="md:hidden flex flex-col text-white h-16 bg-gray-900 shadow-md px-4 z-50">
        {/* Logo and Title Section */}
        <div className="flex justify-between w-full cursor-pointer">
          <img
            src="/Images/JMS_Logo(1).png"
            alt="JMS Logo"
            height={80}
            width={80}
            className="rounded-lg hover:transition hover:duration-500 hover:scale-125"
          />
          <button
            onClick={() => {
              setNavOpen((prev) => !prev);
            }}
          >
            {navOpen ? (
              <FontAwesomeIcon icon={faClose} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>
        <div
          className={`${
            navOpen ? `flex` : `hidden`
          } flex-col shadow-sm shadow-gray-700 bg-gray-800 rounded-md py-4`}
        >
          {/* Navigation Links Section */}
          <div className="flex flex-col items-center justify-center gap-4 relative ">
            <div
              className={`cursor-pointer hover:text-blue-500 transition-colors hover:scale-110  ${
                window.location.pathname === "/"
                  ? "text-blue-500"
                  : "text-gray-300"
              }`}
            >
              <Link to="/">Home</Link>
            </div>
            {["About Us", "Rules"].map((link, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:text-blue-500 transition-colors  hover:scale-110 ${
                  window.location.pathname ===
                  `/${link.toLowerCase().replace(/\s/g, "")}`
                    ? "text-blue-500"
                    : "text-gray-300"
                }`}
              >
                <Link to={`/${link.toLowerCase().replace(/\s/g, "")}`}>{link}</Link>
              </div>
            ))}
            <div
              className={`relative cursor-pointer transition-colors  hover:scale-110`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div
                className={`${
                  window.location.pathname.startsWith("/admins")
                    ? "text-blue-500"
                    : "text-gray-300"
                } hover:text-blue-500`}
              >
                Admins
              </div>
              {dropdownOpen && (
                <div
                  className={`absolute top-4 -right-4 mt-2 w-40 bg-gray-900 shadow-lg rounded-md`}
                  onMouseEnter={() => {
                    setDropdownOpen(true);
                  }}
                >
                  <div
                    className="block pl-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition"
                    onMouseEnter={() => {
                      setcoreTeamDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      setcoreTeamDropdownOpen(false);
                    }}
                  >
                    Meet our Team
                    {coreTeamDropdownOpen && (
                      <div className="absolute left-5 top-full w-52 z-50 bg-gray-800 shadow-lg rounded-md mt-0 ml-0 ">
                        {[
                          "Executive Committee",
                          "Core Committee",
                          "Treasury Committee",
                          "Development Team",
                          "Design Team",
                          "Content Team",
                          "Activity Team",
                          "PR Team",
                          "Appointment Sub-Committee",
                          "Disciplinary Sub-Committee",
                        ].map((team, index) => (
                          <Link
                            key={index}
                            to={`/admins/coreteam/${team
                              .toLowerCase()
                              .replace(/\s/g, "")}`}
                            className="block px-4 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition "
                          >
                            {team}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link
                    to="/admins/userlist"
                    className={`block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition ${
                      auth ? "" : "hidden"
                    }`}
                  >
                    UserList
                  </Link>
                  <Link
                    to="/admins/liveusers"
                    className={`block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition ${
                      auth ? "" : "hidden"
                    } ${
                      adminemails.includes(details?.email ?? "") ? "" : "hidden"
                    }`}
                  >
                    Live Users
                  </Link>
                  <Link
                    to="/admins/historyusers"
                    className={`block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition ${
                      auth ? "" : "hidden"
                    } ${
                      adminemails.includes(details?.email ?? "") ? "" : "hidden"
                    }`}
                  >
                    User History
                  </Link>
                </div>
              )}
            </div>
            <div
              className={`relative cursor-pointer hover:text-blue-500 transition-colors  hover:scale-110 ${
                auth ? "" : "hidden"
              }`}
              onMouseEnter={() => setLibrarydrop(true)}
              onMouseLeave={() => setLibrarydrop(false)}
            >
              <div
                className={`${
                  window.location.pathname.startsWith("/library")
                    ? "text-blue-500"
                    : "text-gray-300"
                } hover:text-blue-500`}
              >
                Library
              </div>
              {librarydrop && (
                <div
                  className={`absolute top-4 mt-2 w-40 bg-gray-800 shadow-lg rounded-md`}
                  onMouseEnter={() => {
                    setLibrarydrop(true);
                  }}
                >
                  <Link
                    to="/library/resources"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition"
                  >
                    Resources
                  </Link>
                  <Link
                    to="/library/problems"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition"
                  >
                    Daily Problems
                  </Link>
                </div>
              )}
            </div>
            {["Group Chat", "Meeting"].map((link, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:text-blue-500 transition-colors  hover:scale-110 ${
                  window.location.pathname ===
                  `/${link.toLowerCase().replace(/\s/g, "")}`
                    ? "text-blue-500"
                    : "text-gray-300"
                } ${auth ? "" : "hidden"}`}
              >
                <Link to={`/${link.toLowerCase().replace(/\s/g, "")}`}>{link}</Link>
              </div>
            ))}

            <div
              className={`cursor-pointer hover:text-blue-500 transition-colors hover:scale-110 ${
                window.location.pathname.startsWith("/gallery")
                  ? "text-blue-500"
                  : "text-gray-300"
              } hover:text-blue-500`}
            >
              <Link to="https://sites.google.com/d/1YIiDDXlB4EW7wCFTASiACXPuoZ6JQRqL/edit">
                Gallery
              </Link>
            </div>

            <div
              className={`relative cursor-pointer hover:text-blue-500 transition-colors hover:scale-110`}
              onMouseEnter={() => setNoticedrop(true)}
              onMouseLeave={() => setNoticedrop(false)}
            >
              <div
                className={`${
                  window.location.pathname.startsWith("/notice")
                    ? "text-blue-500"
                    : "text-gray-300"
                } hover:text-blue-500 ${
                  coreTeamDropdownOpen ? "hidden" : "block"
                }`}
              >
                Circulars
              </div>
              {noticedrop && (
                <div
                  className={`absolute top-4 mt-2 w-40 bg-gray-800 shadow-lg rounded-md`}
                  onMouseEnter={() => {
                    setNoticedrop(true);
                  }}
                >
                  <Link
                    href="/notice/notices"
                    className={`block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition ${
                      auth ? "" : "hidden"
                    }`}
                  >
                    Notice and Circulars
                  </Link>
                  <Link
                    href="/notice/merchandise"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition"
                  >
                    Merchandise
                  </Link>
                  <Link
                    href="/notice/donation"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition"
                  >
                    Donate Us
                  </Link>
                </div>
              )}
            </div>
            {/* Profile Icon */}
            <div className={`cursor-pointer ${auth ? "" : "hidden"}`}>
              <Link to="/profiles">
                <Avatar
                  sx={{
                    bgcolor:
                      window.location.pathname === "/profiles"
                        ? "blue"
                        : "white",
                    color:
                      window.location.pathname === "/profiles"
                        ? "white"
                        : "blue",
                  }}
                  className="hover:scale-110 transition-transform "
                >
                  {name}
                </Avatar>
              </Link>
            </div>
          </div>

          {/* Login/Logout Section */}
          <div className="flex items-center gap-4 justify-center pt-2">
            <div
              className={`cursor-pointer px-4 py-2 rounded-md border transition-all duration-300 hover:text-blue-500 hover:border-blue-500  ${
                window.location.pathname === "/login"
                  ? "text-blue-500 border-blue-500"
                  : "text-gray-300 border-transparent"
              } hover:shadow-md ${auth ? "hidden" : ""}`}
            >
              <Link to="/login">Login</Link>
            </div>
            <button
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                loading
                  ? "cursor-wait opacity-70"
                  : "cursor-pointer hover:shadow-md hover:border-red-700 hover:scale-110"
              } border border-transparent text-red-500 border-red-500 ${
                auth ? "" : "hidden"
              }`}
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
