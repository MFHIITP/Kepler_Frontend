import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { schedules, syllabus } from "../lists.js";
import Footer from '../Components/Footer.jsx'
import Playlist from "./Playlist.jsx";

function Course_Schedules() {
  const { examname } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState({
    college: {
      type: "Full Syllabus Batch",
      name: "College Aimers Batch",
      teachers: "Shubhayan Ghosal, Subhojit Fadikar, Shirso Dey",
      description:
        "In this batch, the complete syllabus for each and every semester exam will be covered by expert educators. This batch will be helpful for students who are preparing for college semester exams and wish to score excellent grades. All doubts related to the subject will be cleared during the doubt-clearing sessions. The batch will be completed in 5 months, the syllabus will be covered in English, and the notes will be provided in the same.",
    },
  });
  return (
    <>
    <div className="mx-14 my-4">
      <div className="shadow-lg shadow-gray-400 bg-white p-4 h-[60vh] mx-24 my-12 rounded-lg">
        <div className="flex h-[75%]">
          <img
            src="../../../Images/Monitoring.webp"
            alt=""
            className="w-[40%] rounded-lg"
          />
          <div className="flex flex-col mx-8 px-4">
            <div className="text-xl text-blue-800">
              {examname == "college" ? list.college.type : ""}
            </div>
            <div className="text-black text-3xl mt-2 font-extrabold">
              {examname == "college" ? list.college.name : ""}
            </div>
            <div className="text-black font-bold text-xl mt-2">
              {examname == "college" ? list.college.teachers : ""}
            </div>
            <div className="text-md text-gray-500 mt-2">
              {examname == "college" ? list.college.description : ""}
            </div>
          </div>
        </div>
        <hr className="bg-gray-300 mt-8 h-1" />
        <div className="flex justify-around my-6">
          <div className="flex">
            <svg width="22px" height="22px" viewBox="0 0 22 20">
              <path
                d="M6.0197 0.868601C6.0197 0.388886 5.62621 0 5.14081 0C4.65542 0 4.26193 0.388886 4.26193 0.868601V2.97227C2.51228 3.21673 1.13003 4.58442 0.896043 6.32902L0.794618 7.08523C0.777423 7.21344 0.76098 7.34172 0.74529 7.47006C0.703671 7.81052 0.975076 8.10695 1.32207 8.10695H20.6779C21.0249 8.10695 21.2963 7.81052 21.2547 7.47006C21.239 7.34172 21.2226 7.21343 21.2054 7.08522L21.104 6.32902C20.87 4.58444 19.4878 3.21677 17.7381 2.97228V0.868601C17.7381 0.388886 17.3446 0 16.8593 0C16.3739 0 15.9804 0.388886 15.9804 0.868601V2.79995C12.6667 2.50829 9.33336 2.50829 6.0197 2.79994V0.868601Z"
                fill="var(--color-i-yellow-4)"
              ></path>
              <path
                d="M21.4817 10.3949C21.4714 10.0863 21.2134 9.84415 20.901 9.84415H1.09897C0.786587 9.84415 0.528587 10.0863 0.518328 10.3949C0.448722 12.4884 0.577393 14.5862 0.904026 16.6608C1.1513 18.2312 2.44227 19.4375 4.0427 19.5935L5.44072 19.7297C9.13794 20.0901 12.8621 20.0901 16.5593 19.7297L17.9573 19.5935C19.5577 19.4375 20.8487 18.2312 21.096 16.6608C21.4226 14.5862 21.5513 12.4884 21.4817 10.3949Z"
                fill="var(--color-i-yellow-4)"
              ></path>
            </svg>
            <div className="flex-flex-col mx-4 mt-[-12px]">
              <div className="text-gray-800 ">Batch Schedule</div>
              <div className=" font-bold text-black">
                Started on 1st January
              </div>
            </div>
          </div>
          <div className="bg-blue-800 text-white p-2 rounded-lg shadow-md font-bold cursor-pointer mt-[-6px] hover:shadow-lg hover:shadow-gray-600" onClick={()=>{navigate('/profiles')}}>
            Get Subscription and Start Learing
          </div>
        </div>
      </div>
      <div className="my-8 mx-[6rem] h-[30rem] bg-gray-200 shadow-lg rounded-lg p-4">
        <Playlist exam = {examname}/>
      </div>
      <div className="flex mx-14 my-4 gap-x-14">
        <div className="flex flex-col ml-10">
          <div className="text-black font-bold  text-2xl mb-5">
            Schedule
          </div>
          <div className="flex gap-2">
            <svg width="16px" height="16px" viewBox="0 0 16 16">
              <circle
                cx="8"
                cy="8"
                r="6.0025"
                stroke="var(--color-text-secondary)"
              ></circle>
              <path
                d="M10.3036 8.76761L8 7.99996V3.99829"
                stroke="var(--color-text-secondary)"
              ></path>
            </svg>
            <div className="text-md  text-gray-700 mt-[-3px]">
              Morning & evening classes • Four times a week
            </div>
          </div>
          <div className="flex gap-2 my-5">
            <svg width="16px" height="16px" viewBox="0 0 16 16">
              <path
                d="M5 14H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1.5"
                stroke="#7A8B94"
              ></path>
              <path
                d="M9.755 13.808A.655.655 0 0 1 9.29 14h-1.32v-1.32c0-.174.069-.341.192-.464l3.882-3.886a1.128 1.128 0 0 1 1.595 0v0a1.127 1.127 0 0 1 0 1.596l-3.885 3.882Z"
                stroke="#7A8B94"
              ></path>
              <path
                d="m13.323 10.244.59.59c.31.31.31.814 0 1.125l-.714.715"
                stroke="#7A8B94"
              ></path>
              <path d="M5 8.334h2.5M5 6h6" stroke="#7A8B94"></path>
            </svg>
            <div className="text-md  text-gray-700 mt-[-4px]">
              Mock tests • Four times a week
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-10 gap-y-6 w-full mr-8">
          {schedules[`${examname}`].map((val, index) => (
            <div
              className="bg-gray-200 shadow-md rounded-lg flex gap-x-12 p-4"
              key={index}
            >
              <div className="flex flex-col">
                <div className="text-lg text-black ">{val.month}</div>
                <div className="text-lg text-gray-800  flex justify-center">
                  {val.day}
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className=" font-bold text-lg">
                  {val.title}
                </div>
                <div className=" text-md text-gray-800">
                  {val.details}
                </div>
                <div className=" text-md text-gray-800">{val.topic}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mx-20 my-8 bg-gray-200 p-8 gap-x-20 rounded-lg shadow-lg">
        <div className="text-2xl font-bold">Syllabus</div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 w-full">
          {syllabus[`${examname}`].map((val, index)=>(
            <div key={index} className="bg-white rounded-lg p-12 text-xl">
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Course_Schedules;
