import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { popupitems } from "../lists.js";
import Footer from "./Footer.jsx";
import { Link, useNavigate } from "react-router-dom";
import LiveImage from "../../Images/Live_Classes/webp"

function Rules() {
  const [image_index, setImage_index] = useState(0);
  const [listname, setListname] = useState("");
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
  const [images] = useState([
    {
      ind: 0,
      img: "../../../Images/Live_Classes.webp",
    },
    {
      ind: 1,
      img: "../../../Images/Comminity_Networks.webp",
    },
    {
      ind: 2,
      img: "../../../Images/Mentorship.webp",
    },
    {
      ind: 3,
      img: "../../../Images/Monitoring.webp",
    },
    {
      ind: 4,
      img: "../../../Images/Practive_Revise.webp",
    },
  ]);

  const [list, setList] = useState([
    {
      name: "Live Classes",
      image: "../../../Images/Live_Image.png",
      desc: "Watch free online classes presented by our experienced educators.",
    },
    {
      name: "Courses",
      image: "../../../Images/Courses.png",
      desc: "Learn varied topics in details from our best educators",
    },
    {
      name: "Batches",
      image: "../../../Images/Batches.png",
      desc: "Handpicked batches to smothen the learning curve of our students",
    },
    {
      name: "Top Educators",
      image: "../../../Images/Top_Educators.png",
      desc: "Learn from our handpicked educators specifically suited for our students' needs",
    },
    {
      name: "Practice",
      image: "../../../Images/Practice.png",
      desc: "Adaptive practice sets to strenthen our students exam preparation",
    },
    {
      name: "Doubts and Solutions",
      image: "../../../Images/Doubts.png",
      desc: "Clarify your doubts and get detailed solutions in no time",
    },
  ]);

  const [fade, setFade] = useState(false);
  const [isopen, setIsopen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setImage_index((prev_index) => (prev_index + 1) % images.length);
        setFade(false);
      }, 500);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length, image_index]);

  return (
    <>
      <div className={`relative w-4/5 h-3/5 mt-12 rounded-lg mx-auto ${isopen ? 'bg-gray-500 opacity-50' : ''}`} id="nonpopup">
        {/* Images */}
        <Link to="/">
          <img
            src={images[image_index].img}
            alt={`Image${images[image_index].ind}`}
            className={`w-[30%] hover:shadow-xl z-10 rounded-lg transition-opacity duration-500 ${
              fade == true ? "opacity-10" : "opacity-100"
            }`}
          />
        </Link>
        <div
          className="absolute right-0 top-[40%] z-10 bg-black text-white transition-transform hover:scale-105 opacity-70 text-2xl p-2 m-1 rounded-lg cursor-pointer"
          onClick={() => {
            setFade(true);
            setTimeout(() => {
              setFade(false);
              setImage_index((prev) => (prev + 1) % 5);
            }, 500);
          }}
        >
          <ArrowForwardIosIcon />
        </div>
        <div
          className="absolute left-0 top-[40%] z-10 bg-black text-white transition-transform hover:scale-105 opacity-70 text-2xl p-2 m-1 rounded-lg cursor-pointer"
          onClick={() => {
            setFade(true);
            setTimeout(() => {
              setFade(false);
              setImage_index((prev) => (prev == 0 ? 4 : (prev - 1) % 5));
            }, 500);
          }}
        >
          <ArrowBackIosNewIcon />
        </div>

        {/* Indicators */}
        <div className="flex space-x-2 mt-4 absolute bottom-4 left-[40%]">
          {images.map((val, index) => (
            <span
              key={index}
              className={`w-10 h-3 rounded-full ${
                index === image_index ? "bg-black" : "bg-gray-300"
              } cursor-pointer z-10 shadow-md`}
              onClick={() => {
                setFade(true);
                setTimeout(() => {
                  setFade(false), setImage_index(index);
                }, 500);
              }}
            ></span>
          ))}
        </div>
      </div>
      <div>
        <div className={`flex flex-col m-6 p-3`}>
          <div className="text-3xl font-bold  ml-6">
            Crack JEE and other College Level Entrance Tests with Kepler
          </div>
          <div className="grid grid-cols-3 gap-x-12 gap-y-8 m-6">
            {list.map((val, index) => (
              <div
                key={index}
                className={`border border-gray-300 p-6 rounded-lg shadow-md cursor-pointer hover:border-orange-500 hover:bg-gray-100 transition-transform hover:scale-105`}
                onClick={() => {
                  setListname(val.name);
                  setIsopen(true);
                }}
              >
                <div className="flex">
                  <img
                    src={val.image}
                    alt=""
                    height={50}
                    width={50}
                    className="rounded-lg mr-4"
                  />
                  <div className="text-2xl  m-1 font-bold items-center justify-center flex">
                    {val.name}
                  </div>
                </div>
                <div className="text-md  m-1 font-thin">
                  {val.desc}
                </div>
              </div>
            ))}
          </div>
          <div
            className={`fixed top-[64px] w-[95%] overflow-y-auto scrollbar-thin bg-white rounded-lg shadow-lg shadow-gray-600 transition-all duration-1000 ${
              isopen ? "h-[70%]" : "h-0"
            }`}
            style={{ zIndex: 19 }}
            id="popup"
          >
            <div className="p-12">
              <div
                className="absolute top-2 right-3 bg-red-200 rounded-lg p-2 hover:scale-110 hover:text-white hover:bg-red-700 transition-transform cursor-pointer text-black"
                onClick={() => {
                  setIsopen(false);
                  setTimeout(() => {
                    ()=>{setListname("")}
                  }, 500);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="">
                {listname == "Live Classes" ? (
                  <>
                    <div className="">
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2 mb-8">
                        <div className="text-black text-3xl  font-bold mb-2">Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  text-black">Watch online coaching classes for College Semester Exams by our best educators. You can watch both recorded classes and live classes</div>
                      </div>
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2">
                        <div className="text-2xl  font-bold">All about Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  mb-8">Kepler provides students with free live and recorded classes and lectures to help with Semester Exam preparation.</div>
                        {popupitems[`${listname}`].map((val, index)=>(
                          <div key={index}>
                            <div className="text-xl font-bold  mx-3">{val.question}</div>
                            <div className="text-lg  mx-3 mb-6 font-light">{val.answer}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {listname == "Courses" ? (
                  <>
                    <div className="">
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2 mb-8">
                        <div className="text-black text-3xl  font-bold mb-2">Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  text-black">Watch online coaching classes for College Semester Exams by our best educators. You can watch both recorded classes and live classes</div>
                      </div>
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2">
                        <div className="text-2xl  font-bold">All about Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  mb-8">Kepler provides students with free live and recorded classes and lectures to help with Semester Exam preparation.</div>
                        {popupitems[`${listname}`].map((val, index)=>(
                          <div key={index}>
                            <div className="text-xl font-bold  mx-3">{val.question}</div>
                            <div className="text-lg  mx-3 mb-6 font-light">{val.answer}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {listname == "Batches" ? (
                  <>
                    <div className="">
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2 mb-8">
                        <div className="text-black text-3xl  font-bold mb-2">Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  text-black">Watch online coaching classes for College Semester Exams by our best educators. You can watch both recorded classes and live classes</div>
                      </div>
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2">
                        <div className="text-2xl  font-bold">All about Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  mb-8">Kepler provides students with free live and recorded classes and lectures to help with Semester Exam preparation.</div>
                        {popupitems[`${listname}`].map((val, index)=>(
                          <div key={index}>
                            <div className="text-xl font-bold  mx-3">{val.question}</div>
                            <div className="text-lg  mx-3 mb-6 font-light">{val.answer}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {listname == "Top Educators" ? (
                  <>
                    <div className="">
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2 mb-8">
                        <div className="text-black text-3xl  font-bold mb-2">Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  text-black">Watch online coaching classes for College Semester Exams by our best educators. You can watch both recorded classes and live classes</div>
                      </div>
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2">
                        <div className="text-2xl  font-bold">All about Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  mb-8">Kepler provides students with free live and recorded classes and lectures to help with Semester Exam preparation.</div>
                        {popupitems[`${listname}`].map((val, index)=>(
                          <div key={index}>
                            <div className="text-xl font-bold  mx-3">{val.question}</div>
                            <div className="text-lg  mx-3 mb-6 font-light">{val.answer}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {listname == "Practice" ? (
                  <>
                    <div className="">
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2 mb-8">
                        <div className="text-black text-3xl  font-bold mb-2">Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  text-black">Watch online coaching classes for College Semester Exams by our best educators. You can watch both recorded classes and live classes</div>
                      </div>
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2">
                        <div className="text-2xl  font-bold">All about Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  mb-8">Kepler provides students with free live and recorded classes and lectures to help with Semester Exam preparation.</div>
                        {popupitems[`${listname}`].map((val, index)=>(
                          <div key={index}>
                            <div className="text-xl font-bold  mx-3">{val.question}</div>
                            <div className="text-lg  mx-3 mb-6 font-light">{val.answer}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {listname == "Doubts and Solutions" ? (
                  <>
                    <div className="">
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2 mb-8">
                        <div className="text-black text-3xl  font-bold mb-2">Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  text-black">Watch online coaching classes for College Semester Exams by our best educators. You can watch both recorded classes and live classes</div>
                      </div>
                      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-4 m-2">
                        <div className="text-2xl  font-bold">All about Online Live Classes for College Semester Exams</div>
                        <div className="text-xl  mb-8">Kepler provides students with free live and recorded classes and lectures to help with Semester Exam preparation.</div>
                        {popupitems[`${listname}`].map((val, index)=>(
                          <div key={index}>
                            <div className="text-xl font-bold  mx-3">{val.question}</div>
                            <div className="text-lg  mx-3 mb-6 font-light">{val.answer}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="m-14 flex flex-col">
          <div className="text-3xl  font-bold">Explore Courses</div>
          <div className="grid grid-cols-2 mb-4 py-4 gap-y-6 gap-x-10">
            {exams.map((val, index) => (
              <div
                key={index}
                className="flex-col border-gray-300 border flex justify-center items-center rounded-lg shadow-sm hover:shadow-lg hover:border-orange-600 transition-transform hover:scale-105 p-10 cursor-pointer bg-indigo-200"
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
                <div className="font-bold  text-2xl mt-4">
                  {val.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Rules;
