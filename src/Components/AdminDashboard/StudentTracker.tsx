import React, { useEffect, useMemo, useState } from "react";
import { componentPropsInterface } from "../Interfaces/ComponentProps.interface";
import api from "../../utils/api";
import apiRoutes from "../../utils/Routes/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const getAllCourses = async () => {
  const { data } = await api.get(apiRoutes.getAllCourses);
  return data;
};

const getUsersWithoutCourse = async (
  emailId: string,
): Promise<StudentWithoutCourse[]> => {
  const { data } = await api.post(
    apiRoutes.admins.loggedInStudentsWithoutPurchase,
    {
      emailId,
    },
  );
  return data;
};

const getStudentFromCourseOrOrg = async ({
  emailId,
  course,
  organization,
}: {
  emailId: string;
  course: string[];
  organization: string;
}): Promise<StudentDetails[]> => {
  const { data } = await api.post(
    apiRoutes.admins.studentInformationFromCourseAndOrganization,
    {
      emailId,
      courseName: course,
      organizationName: organization,
    },
  );
  return data;
};

const getStudentDetailsFromStudentData = async ({
  emailId,
  phone,
  email,
}: {
  emailId: string;
  phone: string;
  email: string;
}): Promise<StudentDetails> => {
  const { data } = await api.post(
    apiRoutes.admins.studentDetailFromStudentData,
    {
      emailId,
      email,
      phone,
    },
  );
  return data;
};

interface StudentDetails {
  name: string;
  email: string;
  phoneNumber: string;
  educationType: string;
  country: string;
  state: string;
  city: string;
  referCode: string;
  referral_giver: string;
  admittedCourses:
    | {
        name: string;
        coursePaymentDate: string;
        validity: string;
      }[]
    | string;
}

interface StudentWithoutCourse extends StudentDetails {}

// const COURSES = ["Course1", "Course2", "Course3", "Course4", "Course5"];

const StudentTracker: React.FC<componentPropsInterface> = ({ details }) => {
  const [category, setcategory] = useState<
    | "UsersWithoutCourse"
    | "StudentDetailsFromStudentData"
    | "StudentDetailsFromCourseOrg"
  >("UsersWithoutCourse");

  const [loading, setLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState<StudentDetails[]>([]);

  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [organization, setOrganization] = useState("");
  const [universities, setUniversities] = useState<string[]>([]);

  // const query = useQuery({
  //   queryKey: ["allCourses", details?.email],
  //   queryFn: () => getAllCourses(),
  //   enabled: !!details?.email,
  // });

  // const COURSES = useMemo(() => {
  //   if (!query.data) return [];
  //   return query.data.responseData?.map((c: any) => c.name) ?? [];
  // }, [query.data]);

  const COURSES = [
    "DSA for Placement and Contests",
    "Artificial Intelligence: Explore the Future",
    "Development Crash Course: Projects Made Easier",
    "Fundamentals Course: Crack GATE With Ease",
    "Placements Made Easier",
  ];

  useEffect(() => {
    fetch("/universityLists.json")
      .then((res) => res.json())
      .then((data) => {
        const unique = Array.from(
          new Set(data.map((val: any) => val.name)),
        ).sort();
        setUniversities(unique as string[]);
      })
      .catch(() => toast.error("Failed to load countries"));
  }, []);

  const { mutate: getUsersWithoutCourseMutation } = useMutation({
    mutationFn: () => getUsersWithoutCourse(details?.email ?? ""),
    onMutate: () => setLoading(true),
    onSuccess: (data: any) => {
      setStudentDetails(data.responseData);
      setLoading(false);
    },
  });

  const { mutate: getStudentFromCourseOrgMutation } = useMutation({
    mutationFn: () =>
      getStudentFromCourseOrOrg({
        emailId: details?.email ?? "",
        course: selectedCourses,
        organization,
      }),
    onMutate: () => setLoading(true),
    onSuccess: (data: any) => {
      setStudentDetails(data.responseData);
      setLoading(false);
    },
  });

  const { mutate: getSingleStudentMutation } = useMutation({
    mutationFn: () =>
      getStudentDetailsFromStudentData({
        emailId: details?.email ?? "",
        email: emailInput,
        phone: phoneInput,
      }),
    onMutate: () => setLoading(true),
    onSuccess: (data: any) => {
      setStudentDetails([data.responseData]);
      setLoading(false);
    },
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      if (
        category === "StudentDetailsFromStudentData" &&
        (emailInput || phoneInput)
      ) {
        getSingleStudentMutation();
      }
    }, 600);

    return () => clearTimeout(delay);
  }, [emailInput, phoneInput]);

  const getCourseInfo = (student: StudentDetails, course: string) => {
    if (!Array.isArray(student.admittedCourses)) {
      return { enrolled: "No", purchase: "-", validity: "-" };
    }

    const found = student.admittedCourses.find(
      (c) => c.name === `Computer Science - ${course}`,
    );

    if (!found) return { enrolled: "No", purchase: "-", validity: "-" };

    return {
      enrolled: "Yes",
      purchase: new Date(found.coursePaymentDate).toLocaleDateString("en-IN"),
      validity: new Date(found.validity).toLocaleDateString("en-IN"),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-4 rounded-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Student Tracker
              </h1>
              <p className="text-gray-600">
                Track and manage student enrollments and course data
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">
                  {studentDetails.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Courses</p>
                <p className="text-3xl font-bold text-gray-900">
                  {COURSES.length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Filter Active</p>
                <p className="text-3xl font-bold text-gray-900 capitalize text-sm">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Filter Options
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Category
              </label>
              <select
                value={category}
                onChange={(e) => setcategory(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="UsersWithoutCourse">
                  👥 Users Without Course
                </option>
                <option value="StudentDetailsFromStudentData">
                  🔍 Single Student Search
                </option>
                <option value="StudentDetailsFromCourseOrg">
                  📚 Course / University Filter
                </option>
              </select>
            </div>

            {category === "StudentDetailsFromStudentData" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter student email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </>
            )}

            {category === "StudentDetailsFromCourseOrg" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Courses (Hold Ctrl/Cmd)
                  </label>
                  <select
                    multiple
                    onChange={(e) =>
                      setSelectedCourses(
                        Array.from(
                          e.target.selectedOptions,
                          (opt) => opt.value,
                        ),
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-32"
                  >
                    {COURSES.map((course) => (
                      <option key={course} value={course} className="py-1">
                        {course}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedCourses.length} course(s) selected
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University
                  </label>
                  <select
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select University</option>
                    {universities.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => getStudentFromCourseOrgMutation()}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Apply Filters
                  </button>
                </div>
              </>
            )}

            {category === "UsersWithoutCourse" && (
              <div className="md:col-span-3 flex items-end">
                <button
                  onClick={() => getUsersWithoutCourseMutation()}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Fetch Data
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center mb-6">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading student data...</p>
          </div>
        )}

        {/* Table Section */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Student Records
                {studentDetails.length > 0 && (
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {studentDetails.length} Records
                  </span>
                )}
              </h2>
            </div>

            {studentDetails.length === 0 ? (
              <div className="p-12 text-center">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Data Available
                </h3>
                <p className="text-gray-600">
                  Select filters and fetch data to view student records
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm min-w-max">
                  <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky left-0 bg-blue-50 z-10">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Country
                      </th>
                      {COURSES.map((course) => (
                        <React.Fragment key={course}>
                          <th className="px-6 py-4 text-center text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50">
                            {course} Enrolled
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50">
                            {course} Purchase
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-bold text-purple-700 uppercase tracking-wider bg-purple-50">
                            {course} Validity
                          </th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentDetails.map((student, index) => {
                      const info = COURSES.map((course) =>
                        getCourseInfo(student, course),
                      );

                      return (
                        <tr
                          key={index}
                          className="hover:bg-blue-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {student.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {student.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {student.phoneNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {student.country}
                            </div>
                          </td>

                          {COURSES.map((course, idx) => {
                            const courseInfo = info[idx];
                            return (
                              <React.Fragment key={course}>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  {courseInfo.enrolled === "Yes" ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      ✓ Yes
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      ✗ No
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  <span className="text-sm text-gray-900">
                                    {courseInfo.purchase}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  <span className="text-sm text-gray-900">
                                    {courseInfo.validity}
                                  </span>
                                </td>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTracker;
