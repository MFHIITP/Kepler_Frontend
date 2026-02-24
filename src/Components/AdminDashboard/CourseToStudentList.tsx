import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import apiRoutes from "../../utils/Routes/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { componentPropsInterface } from "../Interfaces/ComponentProps.interface";

const getAllCourses = async () => {
  const { data } = await api.get(apiRoutes.getAllCourses);
  return data;
};

const getStudentsFromCourse = async ({
  emailId,
  courseName,
}: {
  emailId: string;
  courseName: string;
}) => {
  const { data } = await api.post(apiRoutes.admins.courseToStudentList, {
    emailId: emailId,
    courseName: courseName,
    courseId: "Mock Id",
  });
  return data;
};

interface CourseStudentInterface {
  name: string;
  emailId: string;
  phoneNumber: string;
  educationType: string;
  education: string;
  coursePurchaseDate: string;
  validity: string;
}

const CourseToStudentList: React.FC<componentPropsInterface> = ({
  details,
}) => {
  const [courseName, setCourseName] = useState<string | null>(null);
  const [studentList, setStudentList] = useState<CourseStudentInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const query = useQuery({
    queryKey: ["allCourses", details?.email],
    queryFn: () => getAllCourses(),
    enabled: !!details?.email,
  });

  const { mutate: getAllStudentsInCourseMutation } = useMutation({
    mutationFn: (courseName: string) =>
      getStudentsFromCourse({
        emailId: details?.email ?? "",
        courseName: courseName,
      }),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setStudentList(data.responseData);
      setLoading(false);
      toast.success("Students fetched successfully");
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
      toast.error("Cannot fetch students from this course");
    },
  });

  useEffect(() => {
    if (courseName) {
      getAllStudentsInCourseMutation(courseName);
    }
  }, [courseName]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Course → Student Management
        </h1>

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: Course List */}
          <div className="col-span-4 border-r pr-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Available Courses
            </h2>

            <div className="space-y-2">
              {query.data?.map((course: any) => (
                <button
                  key={course._id}
                  onClick={() => setCourseName(course.name)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 
                  ${
                    courseName === course.name
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-100 hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  {course.name}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Student List */}
          <div className="col-span-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Students Enrolled
            </h2>

            {loading ? (
              <div className="text-gray-500">Fetching students...</div>
            ) : studentList.length === 0 ? (
              <div className="text-gray-400 border rounded-lg p-6 text-center">
                Select a course to view enrolled students
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <div className="overflow-x-auto scrollbar-thin border rounded-lg">
                  <div className="min-w-max">
                    <table className="text-sm whitespace-nowrap">
                      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                          <th className="px-6 py-3 text-left">Name</th>
                          <th className="px-6 py-3 text-left">Email</th>
                          <th className="px-6 py-3 text-left">Phone</th>
                          <th className="px-6 py-3 text-left">Education</th>
                          <th className="px-6 py-3 text-left">Purchase Date</th>
                          <th className="px-6 py-3 text-left">Validity</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y">
                        {studentList.map((student, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition"
                          >
                            <td className="px-6 py-4 font-medium text-gray-800">
                              {student.name}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {student.emailId}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {student.phoneNumber}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {student.educationType} - {student.education}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {new Date(student.coursePurchaseDate).toLocaleDateString("en-IN")}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {new Date(student.validity).toLocaleDateString("en-In")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseToStudentList;
