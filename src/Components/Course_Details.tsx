import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Footer from "./Footer";
import { courseTeachersInterface } from "./Interfaces/CourseTeachers.interface";

function Course_Details() {
  const { exam } = useParams();
  const navigate = useNavigate();
  const [collegeteachers, setCollegeteachers] = useState<courseTeachersInterface[]>([
    {
      id: 1,
      name: "Shubhayan Ghosal",
      image: "../../../Images/Shubhayan_image.jpg",
      description: `The teacher for <span class = "font-extrabold text-blue-950">Complex Analysis</span> with <span class = "font-extrabold text-blue-950">more than 2 years of experience</span>. Currently at <span class="font-extrabold text-blue-950">final year of Mathematics in Jadavpur University</span>`,
    },
    {
      id: 2,
      name: "Subhajit Fadikar",
      image: "../../../Images/College_Prep.webp",
      description: `The teacher for <span class="font-extrabold text-blue-950">Indefinite Integrals</span> with <span class = "font-extrabold text-blue-950">more than 3 years of experience</span>. Currently at <span class = "text-blue-950 font-extrabold">final year of Mechanical Engineering department of Jadavpur University</span>`,
    },
    {
      id: 3,
      name: "Sagnik Saha",
      image: "../../../Images/College_Prep.webp",
      description: `The teacher for <span class="font-extrabold text-blue-950">Convergence and Divergence</span> with <span class = "font-extrabold text-blue-950">more than 1 years of experience</span>. Currently at <span class = "text-blue-950 font-extrabold">final year of Mathematics department of Jadavpur University</span>`,
    },
  ]);
  const [gateteachers, setGateteachers] = useState<courseTeachersInterface[]>([
    {
      id: 1,
      name: "Sagnik Saha",
      image: "../../../Images/College_Prep.webp",
      description: `The teacher for <span class="font-extrabold text-blue-950">Linear and Abstract Algebra</span> with <span class = "font-extrabold text-blue-950">more than 1 years of experience</span>. Currently at <span class = "text-blue-950 font-extrabold">final year of Mathematics department of Jadavpur University</span>`,
    },
  ]);
  const [jeeteachers, setJeeteachers] = useState<courseTeachersInterface[]>([
    {
      id: 1,
      name: "Shirso Dey",
      image: "../../../Images/College_Prep.webp",
      description: `The teacher for <span class = "font-extrabold text-blue-950">Physics and Mathematics</span> with <span class = "font-extrabold text-blue-950">more than 2 years of experience</span>. Currently at <span class="font-extrabold text-blue-950">final year of Mathematics in Jadavpur University</span>`,
    },
    {
      id: 2,
      image: "../../../Images/College_Prep.webp",
      name: "Arijit Paul",
      description: `The teacher for <span class = "font-extrabold text-blue-950">Complex Analysis</span> with <span class = "font-extrabold text-blue-950">more than 2 years of experience</span>. Currently at <span class="font-extrabold text-blue-950">final year of Mathematics in Jadavpur University</span>`,
    },
  ]);
  const [collegewriteup, setCollegewriteup] = useState({
    image: "../../../Images/Mentorship.webp",
    name: "College Acers Batch 2025",
    line1: "Full upcoming college semester exam syllabus completion",
    line2: "Limitless syllabus notes",
    line3: "Shubhojit Fadikar, Shubhayan Ghosal and Shirso Dey",
  });
  const [sponsorship, setsponsorship] = useState([
    {
      benefit: "Top class educators",
      availability: true,
    },
    {
      benefit: "Interactive live classes",
      availability: true,
    },
    {
      benefit: "Structured courses & PDFs",
      availability: true,
    },
    {
      benefit: "Live tests & quizzes",
      availability: true,
    },
    {
      benefit: "1:1 Live mentorship",
      availability: true,
    },
    {
      benefit: "Physical Notes",
      availability: true,
    },
    {
      benefit: "Customised Doubt Solving",
      availability: true,
    },
    {
      benefit: "Super mentorship program",
      availability: true,
    },
    {
      benefit: "Access to curated test series",
      availability: true,
    },
  ]);

  const handlereferclick = () => {
    navigate("/courses/college/refercode");
  };

  const handlebatchclick = (examname: string) => {
    navigate(`/courses/${examname}/details`);
  };

  const handlesubmitclick = () => {
    navigate(`/profiles`);
  };

  const fees = {
    jee: {
      "jee_+2": {
        jee_physics: "payment_physics",
        jee_chemistry: "payment_chemistry",
      },
      "jee_+1": {
        jee_physics: "payment_physics",
        jee_chemistry: "payment_chemistry",
      },
      "jee_drop": {
        jee_physics: "payment_physics",
        jee_chemistry: "payment_chemistry",
      },
    },
    college: {
      college_1st_sem: "Payment 1st sem",
      college_2nd_sem: "Payment 2nd sem",
    },
  };

  return (
    <>
      <div className="mx-12 my-4">
        <div className="flex flex-col">
          <div className="m-4 text-3xl font-bold">
            Top Educators to Prepare for{" "}
            {exam == "college" ? "every College Semester Exams" : ""}{" "}
            {exam == "jee" ? "all the JEE Exams" : ""}
          </div>
          <div className="flex mx-4 gap-x-32">
            <div className="text-xl flex gap-x-2">
              <CheckCircleOutlineIcon sx={{ color: "blue" }} />
              <div className="">Proven History of Delivering Results</div>
            </div>
            <div className="text-xl flex gap-x-2">
              <CheckCircleOutlineIcon sx={{ color: "blue" }} />
              <div className="">Mentored Past Rankers</div>
            </div>
            <div className="text-xl flex gap-x-2">
              <CheckCircleOutlineIcon sx={{ color: "blue" }} />
              <div className="">Unique Style of Teaching</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-12 gap-y-8 my-10 mx-4">
            {exam == "college"
              ? collegeteachers.map((val, index) => (
                  <div key={val.id}>
                    <div
                      className={`flex border-gray-300 transition-transform hover:scale-105 border rounded-lg cursor-default p-2`}
                    >
                      <img
                        src={val.image}
                        alt=""
                        className="w-1/2 h-auto m-4 p-2 rounded-lg"
                      />
                      <div className="flex flex-col gap-8 my-4 h-[350px]">
                        <div className="text-2xl font-bold">{val.name}</div>
                        <div
                          className="text-md font-light"
                          dangerouslySetInnerHTML={{ __html: val.description }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
            {exam == "jee"
              ? jeeteachers.map((val, index) => (
                  <div key={val.id}>
                    <div
                      className={`flex border-gray-300 transition-transform hover:scale-105 border rounded-lg cursor-default p-2`}
                    >
                      <img
                        src={val.image}
                        alt=""
                        className="w-1/2 h-auto m-4 p-2 rounded-lg"
                      />
                      <div className="flex flex-col gap-8 my-4 h-[350px]">
                        <div className="text-2xl font-bold">{val.name}</div>
                        <div
                          className="text-md font-light"
                          dangerouslySetInnerHTML={{ __html: val.description }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-3xl mx-4 font-bold my-4">
            Crack {exam == "college" ? "All College Level Exams" : ""}{" "}
            {exam == "jee" ? "JEE and Other Engineering Entrance Exams" : ""}{" "}
            with Kepler
          </div>
          <div className="flex mx-4 gap-x-32">
            <div className="text-xl flex gap-x-2">
              <CheckCircleOutlineIcon sx={{ color: "blue" }} />
              <div className="">Best for Full Syllabus Preparation</div>
            </div>
            <div className="text-xl flex gap-x-2">
              <CheckCircleOutlineIcon sx={{ color: "blue" }} />
              <div className="">Live & recorded online classes</div>
            </div>
            <div className="text-xlflex gap-x-2">
              <CheckCircleOutlineIcon sx={{ color: "blue" }} />
              <div className="">Curated by best educators</div>
            </div>
          </div>
          <div className="text-2xl font-bold m-5 mt-10">
            Recommended Batch for You
          </div>
          <div className="m-4 flex">
            <img
              src={collegewriteup.image}
              alt=""
              className="w-[50%] h-72 rounded-lg"
            />
            <div className="flex flex-col">
              <div className="bg-violet-600 p-2 rounded-md mx-12 font-bold text-white w-fit">
                Recommended
              </div>
              <div className="text-violet-700 mx-12 my-2">
                Top rated • Seasoned educators
              </div>
              <div className="font-bold mx-12 my-1 text-3xl">
                {exam == "college" ? `${collegewriteup.name}` : ""}
              </div>
              <div className="flex mx-12 my-2">
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7.60561 4.5C7.96966 4.5 8.26477 4.79166 8.26477 5.15145V6.59996C10.75 6.38122 13.25 6.38122 15.7353 6.59996V5.15145C15.7353 4.79166 16.0304 4.5 16.3944 4.5C16.7585 4.5 17.0536 4.79166 17.0536 5.15145V6.72921C18.3658 6.91258 19.4025 7.93833 19.578 9.24676L19.654 9.81392C19.974 12.1994 19.9463 14.6179 19.572 16.9956C19.3865 18.1734 18.4183 19.0781 17.218 19.1951L16.1695 19.2973C13.3965 19.5676 10.6035 19.5676 7.83054 19.2973L6.78203 19.1951C5.5817 19.0781 4.61347 18.1734 4.42802 16.9956C4.05365 14.6179 4.02602 12.1994 4.34596 9.81392L4.42203 9.24676C4.59753 7.93832 5.63421 6.91255 6.94645 6.7292V5.15145C6.94645 4.79166 7.24157 4.5 7.60561 4.5ZM7.99686 7.93341C10.6592 7.67394 13.3408 7.67394 16.0031 7.93341L16.7989 8.01097C17.5607 8.08521 18.1705 8.66802 18.2711 9.41797L18.3471 9.98513C18.3737 10.1833 18.3978 10.3816 18.4193 10.5802H5.58072C5.60224 10.3816 5.62628 10.1833 5.65286 9.98513L5.72893 9.41797C5.82951 8.66802 6.4393 8.08521 7.20107 8.01097L7.99686 7.93341ZM5.47593 11.8831C5.38964 13.5231 5.47465 15.1692 5.73067 16.7952C5.82369 17.386 6.30934 17.8398 6.91141 17.8985L7.95992 18.0007C10.6468 18.2626 13.3532 18.2626 16.0401 18.0007L17.0886 17.8985C17.6907 17.8398 18.1763 17.386 18.2693 16.7952C18.5253 15.1692 18.6104 13.5231 18.5241 11.8831H5.47593Z"
                    fill="currentcolor"
                  ></path>
                </svg>
                <div className="mx-3 mt-[-4px] text-lg">
                  {exam == "college" ? collegewriteup.line1 : ""}
                </div>
              </div>
              <div className="flex mx-12 my-2">
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.5 15H15.5" stroke="currentcolor"></path>
                  <path d="M8.5 12H15.5" stroke="currentcolor"></path>
                  <path d="M8.5 9H15.5" stroke="currentcolor"></path>
                  <path
                    d="M18 20H6C4.895 20 4 19.105 4 18V6C4 4.895 4.895 4 6 4H18C19.105 4 20 4.895 20 6V18C20 19.105 19.105 20 18 20Z"
                    stroke="currentcolor"
                  ></path>
                </svg>
                <div className="mx-3 mt-[-4px]  text-lg">
                  {exam == "college" ? collegewriteup.line2 : ""}
                </div>
              </div>
              <div className="flex mx-12 my-2">
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7.75 7.5C7.75 5.15279 9.65279 3.25 12 3.25C14.3472 3.25 16.25 5.15279 16.25 7.5C16.25 9.84721 14.3472 11.75 12 11.75C9.65279 11.75 7.75 9.84721 7.75 7.5ZM12 4.75C10.4812 4.75 9.25 5.98122 9.25 7.5C9.25 9.01878 10.4812 10.25 12 10.25C13.5188 10.25 14.75 9.01878 14.75 7.5C14.75 5.98122 13.5188 4.75 12 4.75Z"
                    fill="currentcolor"
                  ></path>
                  <path
                    d="M8 14.75C6.75736 14.75 5.75 15.7574 5.75 17V18.1883C5.75 18.2064 5.76311 18.2218 5.78097 18.2247C9.89972 18.8972 14.1003 18.8972 18.219 18.2247C18.2369 18.2218 18.25 18.2064 18.25 18.1883V17C18.25 15.7574 17.2426 14.75 16 14.75H15.6591C15.6328 14.75 15.6066 14.7542 15.5815 14.7623L14.716 15.045C12.9512 15.6212 11.0488 15.6212 9.28398 15.045L8.41847 14.7623C8.39342 14.7542 8.36722 14.75 8.34087 14.75H8ZM4.25 17C4.25 14.9289 5.92893 13.25 8 13.25H8.34087C8.52536 13.25 8.70869 13.2792 8.88407 13.3364L9.74959 13.6191C11.2119 14.0965 12.7881 14.0965 14.2504 13.6191L15.1159 13.3364C15.2913 13.2792 15.4746 13.25 15.6591 13.25H16C18.0711 13.25 19.75 14.9289 19.75 17V18.1883C19.75 18.9415 19.2041 19.5837 18.4607 19.7051C14.1819 20.4037 9.8181 20.4037 5.53927 19.7051C4.79588 19.5837 4.25 18.9415 4.25 18.1883V17Z"
                    fill="currentcolor"
                  ></path>
                </svg>
                <div className="mx-3 mt-[-4px] text-lg">
                  {exam == "college" ? collegewriteup.line3 : ""}
                </div>
              </div>
              <div className="flex">
                <div
                  className="mx-[3.2rem] text-xl bg-blue-600 rounded-lg p-2 text-white cursor-pointer hover:shadow-lg hover:shadow-blue-800"
                  onClick={() => {
                    handlebatchclick(exam ?? "");
                  }}
                >
                  View Batch Details
                </div>
                <div className="my-2 text-xl">
                  Batch is{" "}
                  <span className="text-red-800">
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      className="inline mx-2"
                    >
                      <circle cx="8" cy="8" r="1" fill="currentcolor"></circle>
                      <path
                        d="M6.15989 5.95635C5.83738 6.24674 5.58818 6.60933 5.43265 7.01449C5.27713 7.41964 5.2197 7.85585 5.26506 8.28745C5.31043 8.71905 5.45729 9.13379 5.69366 9.49776C5.93002 9.86172 6.24916 10.1646 6.625 10.3816"
                        stroke="currentcolor"
                      ></path>
                      <path
                        d="M9.45728 10.3321C9.82531 10.1022 10.1337 9.78835 10.3572 9.41635C10.5807 9.04436 10.713 8.62475 10.7433 8.19183C10.7736 7.75891 10.701 7.32497 10.5314 6.92549C10.3618 6.52601 10.1001 6.17233 9.76767 5.89338"
                        stroke="currentcolor"
                      ></path>
                      <path
                        d="M4.1525 3.72692C3.47816 4.33409 2.9571 5.09224 2.63191 5.93938C2.30673 6.78652 2.18665 7.6986 2.2815 8.60104C2.37635 9.50348 2.68343 10.3707 3.17764 11.1317C3.67185 11.8927 4.33916 12.5259 5.125 12.9796"
                        stroke="currentcolor"
                      ></path>
                      <path
                        d="M11.047 12.8763C11.8166 12.3954 12.4614 11.7393 12.9287 10.9615C13.3961 10.1837 13.6727 9.3063 13.736 8.4011C13.7993 7.4959 13.6475 6.58857 13.2929 5.7533C12.9384 4.91802 12.3911 4.17852 11.696 3.59525"
                        stroke="currentcolor"
                      ></path>
                    </svg>
                    Live now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-indigo-200 shadow-lg p-4 rounded-lg mx-3 my-4 justify-around">
          <div className="flex flex-col mx-4 my-6">
            <div className="text-3xl font-bold">
              Refer to Friends to Win Cashbacks
            </div>
            <div className="text-lg text-gray-800 mt-2">
              For every successful referral to Higher Secondary students, win a
              cashback of upto Rs 200,
            </div>
            <div className="text-lg text-gray-800 mb-2">
              and for every successful referral to College students, win a
              cashback of upto Rs 100.
            </div>
            <div
              className="bg-blue-700 text-white  w-fit p-2 rounded-lg mt-4 cursor-pointer transition-translate hover:translate-y-[-4px] hover:shadow-xl hover:shadow-blue-950"
              onClick={handlereferclick}
            >
              Refer a Friend
            </div>
          </div>
          <img
            src={"../../../Images/Referral_Image.png"}
            alt=""
            height={80}
            width={380}
          />
        </div>
        <div className="flex flex-col mx-4 my-6 border border-gray-200 shadow-lg rounded-lg p-4">
          <div className="text-3xl  font-bold">
            Get Subscription and Start your{" "}
            {exam == "college" ? "College Semester Preparation" : ""} Today
          </div>
          <div className="rounded-lg">
            <table className="table-auto w-full mt-4 rounded-lg">
              <thead>
                <tr className="">
                  <th className="px-4 py-2 text-left text-2xl">Benefit</th>
                  <th className="px-4 py-2 text-left text-2xl text-blue-800">
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody>
                {sponsorship.map((val, index) => (
                  <tr key={index} className="">
                    <td className="px-4 py-2">{val.benefit}</td>
                    <td className="px-4 py-2 flex ml-8">
                      {val.availability == true ? (
                        <>
                          <svg
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="text-blue-800"
                          >
                            <path
                              d="M3.9204 14.9463C2.29322 13.3191 2.29321 10.6809 3.9204 9.05372L9.0539 3.92022C10.6811 2.29303 13.3193 2.29303 14.9465 3.92022L20.08 9.05372C21.7071 10.6809 21.7071 13.3191 20.08 14.9463L14.9465 20.0798C13.3193 21.707 10.6811 21.707 9.0539 20.0798L3.9204 14.9463Z"
                              stroke="currentcolor"
                            ></path>
                            <path
                              d="M14.513 10.7065L11.3727 13.8469L9.48486 11.9651"
                              stroke="currentcolor"
                            ></path>
                          </svg>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td className="mt-4 flex flex-col">
                    <div className="w-fit">
                      <div className="text-xl flex justify-center">
                        Starts from
                      </div>
                      <div className="flex justify-center text-xl">Rs 999</div>
                      <div
                        className="cursor-pointer w-fit p-3 m-2 mb-5 bg-blue-600 hover:shadow-lg hover:shadow-blue-800 rounded-lg text-white"
                        onClick={handlesubmitclick}
                      >
                        Pay Now and Start Learning
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Course_Details;
