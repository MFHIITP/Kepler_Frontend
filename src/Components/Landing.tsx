import React, { useState } from "react";
import User_Details from './User_Details'
import Profile_Courses from "./Profile_Courses.jsx";
import Profile from "./Profile";

function Landing(props) {
  const [option, setOption] = useState("courses");
  return (
    <div className="flex h-[91vh] ">
      <div className="flex flex-col justify-between w-[14%] bg-[#1A233A] text-white">
        <div className="flex flex-col">
          <div className="flex flex-row ml-5 gap-2 my-1 mt-5">
            <div className="flex justify-center items-center font-medium text-2xl">Account</div>
          </div>
          <div className="border border-gray-600 my-1 mx-4"></div>
          {/* middle portion */}
          {/* part 1 */}
          <div className="flex flex-col">
            <div className="flex my-1 mx-4 text-lg font-medium">Quick Access</div>
            <div className="flex flex-col mt-2">
              <div
                className={`flex w-full cursor-pointer py-3 ${
                  option == "dashboard"
                    ? "bg-[linear-gradient(to_right,#70BCFD_2%,#303750_4%)]"
                    : ""
                }`}
                onClick={() => {
                  setOption("dashboard");
                }}
              >
                <div className="flex ml-3 gap-14"> 
                  <div className="flex gap-2">
                    <img src="../../../Images/Home_Icon.png" alt="" />
                    <div>Dashboard</div>
                  </div>
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer py-3 ${
                  option == "courses"
                    ? "bg-[linear-gradient(to_right,#70BCFD_2%,#303750_4%)]"
                    : ""
                }`}
                onClick={() => {
                  setOption("courses");
                }}
              >
                <div className="flex ml-3 gap-[4rem]">
                  <div className="flex gap-2">
                    <img src="../../../Images/Payments_Icon.png" alt="" />
                    <div>Courses</div>
                  </div>
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer py-3 ${
                  option == "profile"
                    ? "bg-[linear-gradient(to_right,#70BCFD_2%,#303750_4%)]"
                    : ""
                }`}
                onClick={() => {
                  setOption("profile");
                }}
              >
                <div className="flex ml-3 gap-[4rem]">
                  <div className="flex gap-2">
                    <img src="../../../Images/Option_Icon.png" alt="" />
                    <div>Profile</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* account portion */}
        <div className="mt-36">
        <div className="flex flex-col">
            <div className="flex flex-col mt-2">
              <div
                className={`flex w-full cursor-pointer py-3 ${
                  option == "notification"
                    ? "bg-[linear-gradient(to_right,#70BCFD_2%,#303750_4%)]"
                    : ""
                }`}
                onClick={() => {
                  setOption("notification");
                }}
              >
                <div className="flex ml-3 gap-14"> 
                  <div className="flex gap-2">
                    <img src="../../../Images/Notification_Icon.png" alt="" />
                    <div>Notification</div>
                  </div>
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer py-3 ${
                  option == "settings"
                    ? "bg-[linear-gradient(to_right,#70BCFD_2%,#303750_4%)]"
                    : ""
                }`}
                onClick={() => {
                  setOption("settings");
                }}
              >
                <div className="flex ml-3 gap-[4rem]">
                  <div className="flex gap-2">
                    <img src="../../../Images/settings_Icon.png" alt="" />
                    <div>Settings</div>
                  </div>
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer py-3 ${
                  option == "faq"
                    ? "bg-[linear-gradient(to_right,#70BCFD_2%,#303750_4%)]"
                    : ""
                }`}
                onClick={() => {
                  setOption("faq");
                }}
              >
                <div className="flex ml-3 gap-[4rem]">
                  <div className="flex gap-2">
                    <img src="../../../Images/FAQ_Icon.png" alt="" />
                    <div>FAQ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* power off portion */}
        <div className="flex flex-col my-1 py-2">
          <div className="border border-gray-400 my-2 "></div>
          <div className="flex ml-3 gap-1">
          </div>
        </div>
      </div>
      {option == "dashboard" && <div className="w-[86%] h-full overflow-x-hidden scrollbar-thin"><User_Details details = {props.details} goToPage = {setOption}/></div>}
      {option == "courses" && <div className="w-[86%] h-full overflow-x-hidden scrollbar-thin bg-gray-100"><Profile_Courses details = {props.details} goToPage = {setOption}/></div>}
    {option == "profile" && <div className="w-[86%] h-full overflow-x-hidden scrollbar-thin bg-gray-100"><Profile details = {props.details} goToPage = {setOption}/></div>}
    </div>
  );
}

export default Landing;
