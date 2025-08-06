import React, { useEffect, useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { componentPropsInterfacePaymentProfile } from "./Interfaces/ComponentProps.interface";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CourseInterface {
  name: string;
  salutation: string;
  value: number;
}
interface courseDetailsInterface {
  admittedCourses: [string];
  selectedCourses: [CourseInterface];
  preventedCourses: [string]
}

const getAllCourses = async (emailId: string) => {
  const { data } = await api.post<courseDetailsInterface>( apiRoutes.courses.payment.currentCourses, {
    email: emailId,
  });
  return data;
};

const Profile_Courses: React.FC<componentPropsInterfacePaymentProfile> = (props) => {
  const [admittedCourses, setAdmittedCourses] = useState<{
    JEE: string[];
    CAT: string[];
    GATE: string[];
    "Mathematics And Computer Science": string[];
  }>({
    JEE: [],
    CAT: [],
    GATE: [],
    "Mathematics And Computer Science": [],
  });
  const [choices, setChoices] = useState<{
    JEE: string[];
    CAT: string[];
    GATE: string[];
    "Mathematics And Computer Science": string[];
  }>({
    JEE: [],
    CAT: [],
    GATE: [],
    "Mathematics And Computer Science": [],
  });
  const [dropdowns, setDropdowns] = useState({
    AllCourses: false,
    JEE: false,
    JEE_Class11: false,
    JEE_Class12: false,
    CAT: false,
    GATE: false,
    GATE_1: false,
    GATE_2: false,
    "Mathematics And Computer Science": false,
  });

  const [preventedCourses, setPreventedCourses] = useState<string[]>([]);

  const { mutate: getCoursesMutation } = useMutation({
    mutationFn: (emailId: string) => getAllCourses(emailId),
    onSuccess: (data) => {
      const admittedCourses = data.admittedCourses;
      const filteredAdmittedCourses = {
        JEE: admittedCourses.filter((val) => String(val).startsWith("JEE")),
        CAT: admittedCourses.filter((val) => String(val).startsWith("CAT")),
        GATE: admittedCourses.filter((val) => String(val).startsWith("GATE")),
        "Mathematics And Computer Science": admittedCourses.filter((val) => String(val).startsWith("Mathematics And Computer Science")),
      };
      setAdmittedCourses(filteredAdmittedCourses);
      const selectedCourses = data.selectedCourses;
      const filteredChoices = {
        JEE: selectedCourses.filter((val) => String(val.name).startsWith("JEE")).map((val) => val.name),
        CAT: selectedCourses.filter((val) => String(val.name).startsWith("CAT")).map((val) => val.name),
        GATE: selectedCourses.filter((val) => String(val.name).startsWith("GATE")).map((val) => val.name),
        "Mathematics And Computer Science": selectedCourses.filter((val) => String(val.name).startsWith("Mathematics And Computer Science")).map((val) => val.name),
      };
      setChoices(filteredChoices);
      setPreventedCourses(data.preventedCourses)
    },
  });

  useEffect(() => {
    getCoursesMutation(props.details?.email ?? "");
  }, []);

  const [search, setsearch] = useState("");

  const [courses, setCourses] = useState([
    "JEE",
    "CAT",
    "Mathematics And Computer Science",
    "GATE",
  ]);

  const applied_courses = courses.filter((val) => {
    return val.toLowerCase().includes(search.toLowerCase());
  });

  const handleChoiceChange = (category, value) => {
    setChoices((prev) => {
      const updated_list = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updated_list };
    });
  };

  const handleApplyCourses = async () => {
    const subjectList = courses.flatMap((category) => choices[category]);
    const response = await api.post(apiRoutes.courses.payment.appliedCourses, {
      name: props.details?.name,
      email: props.details?.email,
      selectedCourses: subjectList,
    });
    if (response.status == 200) {
      props.goToPage("dashboard");
    } 
    else if(response.status == 303){
      toast.error("Please Remove selection for courses you are admitted in whose deadline has not yet arrived")
    }
    else {
      alert(response.status);
    }
  };

  useEffect(() => {
    console.log(choices);
  }, []);

  return (
    <div className="flex justify-between p-6">
      <div className="w-[49%] max-w-3xl bg-white shadow-lg rounded-lg p-6 h-fit pb-12">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4 p-8">
          <div className="">Select Courses to Pursue</div>
        </h1>
        <div className="flex gap-0">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
              setDropdowns((prev) => ({
                ...prev,
                AllCourses: true,
              }));
            }}
            placeholder="Search Your Course"
            className="p-2 mb-4 text-black border border-black rounded-l-lg placeholder-gray-400 placeholder:italic bg-indigo-200"
          />
          <div
            className="bg-blue-500 rounded-r-lg flex justify-center items-center p-4 h-[2.62rem] border border-black cursor-pointer"
            onClick={() => {
              setDropdowns((prev) => ({
                ...prev,
                AllCourses: !prev.AllCourses,
              }));
            }}
          >
            {dropdowns.AllCourses ? "▲" : "▼"}
          </div>
        </div>
        {dropdowns.AllCourses && (
          <div>
            {applied_courses.map((category) => (
              <div key={category} className="mb-6">
                <h2
                  className={`text-lg font-semibold text-gray-700 mb-3 bg-gray-50 p-4 rounded-lg flex justify-between px-8 cursor-pointer`}
                  onClick={() => {
                    setDropdowns((prev) => ({
                      ...prev,
                      [category]: !prev[category],
                    }));
                  }}
                >
                  <div className="">{category}</div>
                  <div className="">{dropdowns[category] ? "▲" : "▼"}</div>
                </h2>
                <div className="bg-gray-50 rounded-lg shadow-sm">
                  {category === "JEE" && dropdowns.JEE && (
                    <div className="bg-gray-50 rounded-lg shadow-sm p-2">
                      <h3
                        className="cursor-pointer p-2 bg-gray-200 rounded-lg"
                        onClick={() =>
                          setDropdowns((prev) => ({
                            ...prev,
                            JEE_Class11: !prev.JEE_Class11,
                          }))
                        }
                      >
                        Class 11 {dropdowns.JEE_Class11 ? "▲" : "▼"}
                      </h3>
                      {dropdowns.JEE_Class11 &&
                        ["Physics", "Chemistry", "Mathematics"].map(
                          (course) => (
                            <label className="flex items-center cursor-pointer p-4">
                              <input
                                type="checkbox"
                                className="form-checkbox text-blue-600 disabled:text-gray-400 h-5 w-5 mr-3"
                                checked={choices[category].includes(
                                  `JEE ${course} - Class 11`
                                )}
                                disabled = {preventedCourses.includes(`JEE ${course} - Class 11`)}
                                onChange={() =>
                                  handleChoiceChange(
                                    category,
                                    `JEE ${course} - Class 11`
                                  )
                                }
                              />
                              <span className="flex justify-between w-full">
                                {course}
                                <span className="text-green-600 font-medium">
                                  {" "}
                                  - INR {1000}
                                </span>
                              </span>
                            </label>
                          )
                        )}
                      <h3
                        className="cursor-pointer p-2 bg-gray-200 rounded-lg mt-2"
                        onClick={() =>
                          setDropdowns((prev) => ({
                            ...prev,
                            JEE_Class12: !prev.JEE_Class12,
                          }))
                        }
                      >
                        Class 12 {dropdowns.JEE_Class12 ? "▲" : "▼"}
                      </h3>
                      {dropdowns.JEE_Class12 &&
                        ["Physics", "Chemistry", "Mathematics"].map(
                          (course) => (
                            <label className="flex items-center cursor-pointer p-4">
                              <input
                                type="checkbox"
                                className="form-checkbox disabled:text-gray-400 text-blue-600 h-5 w-5 mr-3"
                                checked={choices[category].includes(
                                  `JEE ${course} - Class 12`
                                )}
                                disabled = {preventedCourses.includes(`JEE ${course} - Class 12`)}
                                onChange={() =>
                                  handleChoiceChange(
                                    category,
                                    `JEE ${course} - Class 12`
                                  )
                                }
                              />
                              <span className="flex justify-between w-full">
                                {course}
                                <span className="text-green-600 font-medium">
                                  {" "}
                                  - INR {1000}
                                </span>
                              </span>
                            </label>
                          )
                        )}
                    </div>
                  )}

                  {dropdowns.CAT &&
                    category === "CAT" &&
                    ["2025"].map((course) => (
                      <label className="flex items-center cursor-pointer p-4">
                        <input
                          type="checkbox"
                          className="form-checkbox disabled:text-gray-400 text-blue-600 h-5 w-5 mr-3"
                          checked={choices[category].includes(
                            `CAT - ${course}`
                          )}
                          disabled = {preventedCourses.includes(`CAT - ${course}`)}
                          onChange={() =>
                            handleChoiceChange(category, `CAT - ${course}`)
                          }
                        />
                        <span className="flex justify-between w-full">
                          CAT - {course}
                          <span className="text-green-600 font-medium">
                            {" "}
                            - INR {3000}
                          </span>
                        </span>
                      </label>
                    ))}

                  {dropdowns["Mathematics And Computer Science"] &&
                    category === "Mathematics And Computer Science" &&
                    [
                      "Engineering Mathematics 1",
                      "Engineering Mathematics 2",
                      "Engineering Mathematics 3",
                      "Engineering Mathematics 4",
                      "Computer Languages",
                      "Computer Science Fundamentals",
                      "Data Structures And Algorithms",
                      "Artificial Intelligence And Machine Learning",
                    ].map((sem) => (
                      <label className="flex items-center cursor-pointer p-4">
                        <input
                          type="checkbox"
                          className="form-checkbox disabled:text-gray-400 text-blue-600 h-5 w-5 mr-3"
                          checked={choices[category].includes(
                            `Mathematics And Computer Science - ${sem}`
                          )}
                          disabled = {preventedCourses.includes(`Mathematics And Computer Science - ${sem}`)}
                          onChange={() =>
                            handleChoiceChange(
                              category,
                              `Mathematics And Computer Science - ${sem}`
                            )
                          }
                        />
                        <span className="flex justify-between w-full">
                          {sem}
                          <span className="text-green-600 font-medium">
                            {" "}
                            - INR {1000}
                          </span>
                        </span>
                      </label>
                    ))}

                  {category === "GATE" && dropdowns.GATE && (
                    <div className="bg-gray-50 rounded-lg shadow-sm p-2">
                      <h3
                        className="cursor-pointer p-2 bg-gray-200 rounded-lg"
                        onClick={() =>
                          setDropdowns((prev) => ({
                            ...prev,
                            GATE_1: !prev.GATE_1,
                          }))
                        }
                      >
                        GATE - 2025 {dropdowns.GATE_1 ? "▲" : "▼"}
                      </h3>
                      {dropdowns.GATE_1 &&
                        [
                          "Computer Science and Information Technology",
                          "Electronics and Communication",
                          "Electrical",
                          "Instrumentation",
                        ].map((course) => (
                          <label className="flex items-center cursor-pointer p-4">
                            <input
                              type="checkbox"
                              className="form-checkbox disabled:text-gray-400 text-blue-600 h-5 w-5 mr-3"
                              checked={choices[category].includes(
                                `GATE - 2025 ${course}`
                              )}
                              disabled = {preventedCourses.includes(`GATE - 2025 ${course}`)}
                              onChange={() =>
                                handleChoiceChange(
                                  category,
                                  `GATE - 2025 ${course}`
                                )
                              }
                            />
                            <span className="flex justify-between w-full">
                              {course}
                              <span className="text-green-600 font-medium">
                                {" "}
                                - INR {1000}
                              </span>
                            </span>
                          </label>
                        ))}
                      <h3
                        className="cursor-pointer p-2 bg-gray-200 rounded-lg mt-2"
                        onClick={() =>
                          setDropdowns((prev) => ({
                            ...prev,
                            GATE_2: !prev.GATE_2,
                          }))
                        }
                      >
                        GATE - 2026 {dropdowns.GATE_2 ? "▲" : "▼"}
                      </h3>
                      {dropdowns.GATE_2 &&
                        [
                          "Computer Science and Information Technology",
                          "Electronics and Communication",
                          "Electrical",
                          "Instrumentation",
                        ].map((course) => (
                          <label className="flex items-center cursor-pointer p-4">
                            <input
                              type="checkbox"
                              className="form-checkbox disabled:text-gray-400 text-blue-600 h-5 w-5 mr-3"
                              checked={choices[category].includes(
                                `GATE - 2026 ${course}`
                              )}
                              disabled = {preventedCourses.includes(`GATE - 2026 ${course}`)}
                              onChange={() =>
                                handleChoiceChange(
                                  category,
                                  `GATE - 2026 ${course}`
                                )
                              }
                            />
                            <span className="flex justify-between w-full">
                              {course}
                              <span className="text-green-600 font-medium">
                                {" "}
                                - INR {1000}
                              </span>
                            </span>
                          </label>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Clear and Applied */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg w-1/3"
            onClick={() =>
              setChoices({
                CAT: [],
                JEE: [],
                "Mathematics And Computer Science": [],
                GATE: [],
              })
            }
          >
            Clear
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg w-1/3"
            onClick={handleApplyCourses}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10 w-[49%] max-w-3xl h-fit">
        {/* All Admitted Courses */}
        <div className="bg-white rounded-lg shadow-lg p-6 ">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4 ">
            Admitted Courses
          </h2>
          {Object.entries(admittedCourses).some(
            ([_, courses]) => courses.length > 0
          ) ? (
            <div className="space-y-4">
              {Object.entries(admittedCourses).map(([category, courses]) =>
                courses.length > 0 ? (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-700 capitalize border-b pb-2 mb-2">
                      {category.replace(/_/g, " ")}
                    </h3>
                    <ul className="list-disc pl-6 text-gray-600">
                      {courses.map((val, key) => (
                        <li key={key} className="py-1">
                          {val?.startsWith("Mathematics And Computer Science")
                            ? val.split("-")[1]
                            : val}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center mt-6">
              Not admitted in any courses.
            </p>
          )}
        </div>
        {/* Cart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
            Selected Courses Kart
          </h2>
          {Object.entries(choices).some(
            ([_, courses]) => courses.length > 0
          ) ? (
            <div className="space-y-4">
              {Object.entries(choices).map(([category, courses]) =>
                courses.length > 0 ? (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-700 capitalize border-b pb-2 mb-2">
                      {category.replace(/_/g, " ")}
                    </h3>
                    <ul className="list-disc pl-6 text-gray-600">
                      {courses.map((val, key) => (
                        <li key={key} className="py-1">
                          {val?.startsWith("Mathematics And Computer Science")
                            ? val.split("-")[1]
                            : val}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )}
              <div className="text-gray-600 text-sm mt-4 border-t border-gray-300 pt-4">The items in this cart is temporary, and shall not be reflected as the final list of your selected courses. Please click the Apply button to ensure that these courses are deemed as final. You may modify your selection of selected courses here.
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic text-center mt-6">
              No courses selected.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile_Courses;
