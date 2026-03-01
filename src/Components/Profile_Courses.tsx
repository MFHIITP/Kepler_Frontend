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
  preventedCourses: [string];
  allPossibleCourses: {name: string; price: number}[];
}

const getAllCourses = async (emailId: string) => {
  const { data } = await api.post<courseDetailsInterface>( apiRoutes.courses.payment.currentCourses, {
    email: emailId,
  });
  return data;
};

// Icon components for better visual hierarchy
const ChevronDownIcon = ({ isOpen, className = "" }) => (
  <svg 
    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M12 21a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const Profile_Courses: React.FC<componentPropsInterfacePaymentProfile> = (props) => {
  const [admittedCourses, setAdmittedCourses] = useState<{"Computer Science": string[]}>({"Computer Science": []});
  const [choices, setChoices] = useState<{"Computer Science": Array<{name: string; price: number}>}>({"Computer Science": []});
  const [allComputerCourses, setAllComputerCourses] = useState<{"Computer Science": Array<{name: string; price: number}>}>({"Computer Science": []})
  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({
    AllCourses: false,
    "Computer Science": false
  });

  const [preventedCourses, setPreventedCourses] = useState<string[]>([]);

  const { mutate: getCoursesMutation } = useMutation({
    mutationFn: (emailId: string) => getAllCourses(emailId),
    onSuccess: (data) => {
      const admittedCourses = data.admittedCourses;
      const filteredAdmittedCourses = {
        "Computer Science": admittedCourses.filter((val) => String(val).startsWith("Computer Science")),
      };
      setAdmittedCourses(filteredAdmittedCourses);
      const selectedCourses = data.selectedCourses;
      const filteredChoices = {
        "Computer Science": selectedCourses.filter((val) => String(val.name).startsWith("Computer Science")).map((val) => ({name: val.name, price: val.value})),
      };
      setChoices(filteredChoices);
      const allPossibleCourses = data.allPossibleCourses
      const filteredComputerCourses = allPossibleCourses.filter((val) => String(val.name).startsWith("Computer Science")).map(val => {return {name: val.name.replace(/^Computer Science - \s*/, ""), price: val.price}})
      setAllComputerCourses({
        "Computer Science": filteredComputerCourses
      })
      setPreventedCourses(data.preventedCourses)
    },
  });

  useEffect(() => {
    getCoursesMutation(props.details?.email ?? "");
  }, []);

  const [search, setsearch] = useState("");

  const [courses, setCourses] = useState([
    "Computer Science"
  ]);

  const applied_courses = courses.filter((val) => {
    return val.toLowerCase().includes(search.toLowerCase());
  });

  const handleChoiceChange = (category: string, value: string) => {
    setChoices((prev) => {
      const categoryKey = category as keyof typeof allComputerCourses;
      const updated_list = prev[categoryKey].some(item => item.name === value)
        ? prev[categoryKey].filter((item) => item.name !== value)
        : [...prev[categoryKey], { name: value, price: allComputerCourses[categoryKey]?.find(c => `Computer Science - ${c.name}` === value)?.price || 0 }];
      return { ...prev, [categoryKey]: updated_list };
    });
  };

  const handleApplyCourses = async () => {
    const subjectList = courses.flatMap((category) => choices[category as keyof typeof choices].map((course) => course.name));
    let additionalCoursesSelected = []
    if(subjectList.includes("Computer Science - Placements Made Easier")){
      additionalCoursesSelected.push("Computer Science - Development Crash Course: Projects Made Easier")
    }
    const response = await api.post(apiRoutes.courses.payment.appliedCourses, {
      name: props.details?.name,
      email: props.details?.email,
      selectedCourses: subjectList,
      additionalCoursesSelected: additionalCoursesSelected
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

  const getTotalSelectedCourses = () => {
    return Object.values(choices).flat().length;
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.entries(choices).forEach(([category, courseList]) => {
      courseList.forEach(course => {
        total += course.price;
      });
    });
    const numberOfCoursesSelected = getTotalSelectedCourses();
    if(numberOfCoursesSelected >= 2 && !choices["Computer Science"].map((val) => val.name).includes("Computer Science - Placements Made Easier")){
      total = total * 0.8;
    }
    if(choices["Computer Science"].map((val) => val.name).includes("Computer Science - Placements Made Easier") && choices["Computer Science"].map((val) => val.name).includes("Computer Science - Artificial Intelligence: Explore the Future") && choices["Computer Science"].length == 2){
      total = total * 0.8;
    }
    return total;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Course Selection Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive range of courses designed to accelerate your career in technology and competitive exams
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Panel - Course Selection */}
          <div className="flex-1 max-w-4xl">
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <BookOpenIcon />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Select Your Courses</h2>
                  <p className="text-gray-600">Build your learning path with our expert-curated curriculum</p>
                </div>
              </div>

              {/* Enhanced Search Bar */}
              <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
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
                  placeholder="Search courses, subjects, or exam categories..."
                  className="w-full pl-12 pr-16 py-4 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-500"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-2 rounded-lg transition-all duration-200 hover:scale-105"
                  onClick={() => {
                    setDropdowns((prev) => ({
                      ...prev,
                      AllCourses: !prev.AllCourses,
                    }));
                  }}
                >
                  <ChevronDownIcon isOpen={dropdowns.AllCourses} />
                </button>
              </div>

              {/* Course Categories */}
              {dropdowns.AllCourses && (
                <div className="space-y-6">
                  {applied_courses.map((category) => (
                    <div key={category} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-hidden">
                      <div
                        className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/50 transition-all duration-200"
                        onClick={() => {
                          setDropdowns((prev) => ({
                            ...prev,
                            [category]: !prev[category],
                          }));
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            category === 'Computer Science' ? 'bg-purple-500' : 'bg-green-500'
                          }`} />
                          <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                        </div>
                        <ChevronDownIcon isOpen={dropdowns[category]} className="text-gray-600" />
                      </div>

                      {dropdowns["Computer Science"] && category === "Computer Science" && (
                        <div className="px-6 pb-6">
                          <div className="bg-white rounded-lg border border-gray-200">
                            {allComputerCourses["Computer Science"].map((sem) => (
                              <label key={sem.name} className="flex items-center justify-between p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                                      checked={choices[category].some(item => item.name === `Computer Science - ${sem.name}`)}
                                      disabled={preventedCourses.includes(`Computer Science - ${sem.name}`)}
                                      onChange={() => handleChoiceChange(category, `Computer Science - ${sem.name}`)}
                                    />
                                    {choices[category].some(item => item.name === `Computer Science - ${sem.name}`) && (
                                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <CheckIcon />
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-gray-700 font-medium">{sem.name}</span>
                                </div>
                                <span className="text-green-600 font-semibold">₹{sem.price}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  onClick={() =>
                    setChoices({
                      "Computer Science": [],
                    })
                  }
                >
                  Clear Selection
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  onClick={handleApplyCourses}
                >
                  Apply & Continue
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Summary Cards */}
          <div className="w-full xl:w-96 space-y-6">
            {/* Admitted Courses Card */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <CheckIcon />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Admitted Courses</h3>
              </div>
              
              {Object.entries(admittedCourses).some(([_, courses]) => courses.length > 0) ? (
                <div className="space-y-4">
                  {Object.entries(admittedCourses).map(([category, courses]) =>
                    courses.length > 0 ? (
                      <div key={category} className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2 capitalize">
                          {category.replace(/_/g, " ")}
                        </h4>
                        <ul className="space-y-1">
                          {courses.map((val, key) => (
                            <li key={key} className="text-sm text-green-700 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              {val}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpenIcon />
                  </div>
                  <p className="text-gray-500">No admitted courses yet</p>
                </div>
              )}
            </div>

            {/* Course Cart */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <ShoppingCartIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Course Cart</h3>
                  <p className="text-sm text-gray-600">{getTotalSelectedCourses()} courses selected</p>
                </div>
              </div>
              
              {Object.entries(choices).some(([_, courses]) => courses.length > 0) ? (
                <div className="space-y-4">
                  {Object.entries(choices).map(([category, courses]) =>
                    courses.length > 0 ? (
                      <div key={category} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2 capitalize">
                          {category.replace(/_/g, " ")}
                        </h4>
                        <ul className="space-y-1">
                          {courses.map((val, key) => (
                            <li key={key} className="text-sm text-blue-700 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                              {val.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null
                  )}
                  
                  {/* Price Summary */}
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border-2 border-indigo-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Total Courses:</span>
                      <span className="font-semibold text-gray-800">{getTotalSelectedCourses()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Total Amount:</span>
                      <span className="text-2xl font-bold text-indigo-600">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-amber-800 mb-1">Important Notice</p>
                        <p className="text-xs text-amber-700 leading-relaxed">
                          Items in this cart are temporary selections. Click "Apply & Continue" to finalize your course enrollment. You can modify your selection before applying.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCartIcon />
                  </div>
                  <p className="text-gray-500 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Select courses from the left panel to get started</p>
                </div>
              )}
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-950 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{Object.values(admittedCourses).flat().length}</div>
                  <div className="text-sm opacity-90">Admitted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{getTotalSelectedCourses()}</div>
                  <div className="text-sm opacity-90">Selected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Courses;