import React, { useState, useEffect } from "react";
import Popping from "./Popping";
import { useNavigate } from "react-router-dom";

function Part2() {
  
  const [exams, setExams] = useState([
    {
      image: "../../../Images/JEE_Prep.webp",
      name: "2 Year JEE Preparation",
      exam: "jee",
    },
    {
      image: "../../../Images/CAT_Prep.webp",
      name: "CAT Exam Preparation",
      exam: "cat",
    },
    {
      image: "../../../Images/GATE_Prep.webp",
      name: "GATE Exam Preparation",
      exam: "gate",
    },
    {
      image: "../../../Images/College_Prep.webp",
      name: "College Exams Preparation",
      exam: "college",
    },
  ]);
  const [search, setsearch] = useState("");

  const [Goals, setGoals] = useState([
    {
      image: "../../../Images/Live_Classes.webp",
      name: "Live Classes",
      description:
        "Chat with educators, ask questions, answer live polls, and get your doubts cleared - all while the class is going on",
    },
    {
      image: "../../../Images/Mentorship.webp",
      name: "Mentorship Facilities",
      description:
        "Connect with seasoned mentors who are here to nurture your talent and help you navigate your journey. Gain invaluable insights and grow both personally and professionally.",
    },
    {
      image: "../../../Images/Practive_Revise.webp",
      name: "Practice and Revise",
      description:
        "Learning isn't just limited to classes with our practice section, mock tests and lecture notes shared as PDFs for your revision",
    },
    {
      image: "../../../Images/Comminity_Networks.webp",
      name: "Community and Networking",
      description:
        "Build Connections That Last! Join a vibrant community of like-minded individuals. Collaborate, share ideas, and build lifelong friendships that will enrich your college experience.",
    },
    {
      image: "../../../Images/Learn_anywhere.webp",
      name: "Learn anytime, anywhere",
      description:
        "One subscription gets you access to all our live and recorded classes to watch from the comfort of any of your devices",
    },
    {
      image: "../../../Images/Monitoring.webp",
      name: "Regular Monitoring through Tests",
      description:
        "Test Modules, carefully curated by our seasoned educators to help the students in tracking their progress.",
    },
  ]);
  const navigate = useNavigate();
  
  let filteredlist = exams.filter((val) => {
    return val.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="mt-2 p-4">
      <Popping>
        <div className="m-5 mb-10 mx-12">
          <div className="text-2xl m-auto font-bold  p-2">
            Select your Goals/Exams
          </div>
          <input
            type="text"
            name=""
            id=""
            value={search}
            className="border border-black rounded-lg w-2/3 h-10 placeholder-gray-700 p-2"
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            placeholder="Type the goal or exam you are preparing for"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-black mx-2 py-2 text-5xl  flex justify-center items-center mb-4">
            Popular Goals
          </div>
          <div className="grid grid-cols-4 mb-4 py-4 gap-y-6 gap-x-10 mx-12">
            {filteredlist.map((val, index) => (
              <div
                key={index}
                className="border-gray-300 border flex flex-col justify-around items-center rounded-lg shadow-sm hover:shadow-lg hover:border-orange-600 transition-transform hover:scale-105 p-10 cursor-pointer hover:shadow-blue-400"
                onClick={() => {
                  navigate(`/courses/${val.exam}`);
                }}
              >
                <img
                  src={val.image}
                  alt={val.name}
                  height={200}
                  width={200}
                  className="rounded-lg"
                />
                <div className="font-bold  text-2xl mt-4">{val.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Popping>
      <Popping>
        <div className="relative flex justify-center items-center py-12 h-10 text-center overflow-hidden rounded-lg my-2 mx-12">
          <div className="absolute top-0 left-0 w-full h-full z-0" />
          <div className="relative z-10 text-4xl md:text-4xl font-bold bg-white text-black p-4 rounded-lg my-4 mx-2  border border-black shadow-md hover:shadow-blue-400">
            KEPLER - WHERE ASPIRATION MEETS ACHEIVEMENT
          </div>
        </div>
      </Popping>
      <Popping>
        <div className="grid grid-cols-3 gap-8 py-16 bg-indigo-200 px-10 rounded-lg mx-12">
          {Goals.map((val, index) => (
            <div key={index} className="">
              <div className="flex flex-col gap-8 p-8 rounded-lg shadow-lg transition-transform hover:scale-105 bg-white hover:shadow-xl cursor-default duration-300 ease-in-out h-[520px]">
                <div className="">
                  <img
                    src={val.image}
                    alt=""
                    className="rounded-lg flex justify-center w-[50%]"
                  />
                </div>
                <div className="relative">
                  <div className="text-4xl  font-bold text-blue-600">
                    {val.name}
                  </div>
                </div>
                <div className=" text-gray-700">{val.description}</div>
              </div>
            </div>
          ))}
        </div>
      </Popping>
    </div>
  );
}

export default Part2;
