import React, { useEffect, useState, useContext } from "react";
import { Box, Heading, Spinner, Center, Divider } from "@chakra-ui/react";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";
import apiRoutes from "../utils/Routes/apiRoutes";
import api from "../utils/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {user,userMoreInformationInterface} from "./Interfaces/user.interface";
import {Trash2, Users, Mail, Calendar, CreditCard, BookOpen, UserX, ChevronDown, ChevronRight, Info} from 'lucide-react'

const getAllUsers = async (emailId: string) => {
  const { data } = await api.post(apiRoutes.admins.userlist, {
    email: emailId,
  });
  return data;
};

const removeUser = async (emailId: string) => {
  const { data } = await api.post(apiRoutes.admins.removeUser, {
    email: emailId,
  });
  return data;
};

const getUserInformation = async (emailId: string) => {
  const { data } = await api.post(apiRoutes.admins.getInformation, {
    email: emailId,
  });
  return data;
};

const removeUserCourse = async({course, emailId}: {course: string, emailId: string}) => {
  const { data } = await api.post(apiRoutes.admins.removeUserCourse, {
    email: emailId,
    courseName: course
  }) 
  return data;
}

const UsersTable: React.FC<componentPropsInterface> = (props) => {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(false);
  const [userMoreInformation, setUserMoreInformation] = useState<userMoreInformationInterface | null>(null);
  const [dropdownEmail, setDropdownEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("Searching");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const { mutate: getUsersMutation } = useMutation({
    mutationFn: (email: string) => getAllUsers(email),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setUsers(data.allUsers);
      setLoading(false);
    },
    onError: (err) => {
      toast.error("You are not an admin. Please leave immediately");
      setLoading(false);
      navigate("/");
    },
  });

  const { mutate: removeUserMutation } = useMutation({
    mutationFn: (email: string) => removeUser(email),
    onMutate: () => setLoading(true),
    onSuccess: () => {
      setLoading(false);
      toast.success("Deleted user from Kepler Educations");
      getUsersMutation(props.details?.email!);
    },
    onError: () => {
      setLoading(false);
      toast.error("Failed to remove this User from Kepler Educations");
    },
  });

  const { mutate: getUserInformationMutation } = useMutation({
    mutationFn: (email: string) => getUserInformation(email),
    onMutate: () => setMessage("Searching"),
    onSuccess: (data) => {
      setUserMoreInformation(data.details);
      setAmount(data.amount);
    },
    onError: () => {
      setMessage("User has not taken any course");
      setUserMoreInformation(null);
      setAmount(0);
    },
  });

  const { mutate: RemoveCourseMutation } = useMutation({
    mutationFn: ({course, email}: {course: string, email: string}) => removeUserCourse({course: course, emailId: email}),
    onMutate: ()=> {setUserMoreInformation(null); setMessage("Searching")},
    onSuccess: (data) => {
      toast.success("Course for this user is deleted successfully")
      setDropdownEmail(null);
    },
    onError: (err) => {
      toast.error("Failed to delete course for this user")
    }
  })

  useEffect(() => {
    getUsersMutation(props.details?.email!);
  }, []);

  const deleteAccount = async (emailId: string) => {
    const result = await Swal.fire({
      title: "Confirmation for Deletion of Account",
      text: "Do you want to remove this person from Kepler Education ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: true,
    });
    if (result.isConfirmed) {
      removeUserMutation(emailId);
    } else {
      toast.error("Deletion Cancelled");
    }
  };

  const handleUserInformation = (emailID: string) => {
    getUserInformationMutation(emailID);
  };

  const handleRemoveAdmittedCourse = async (course: string, emailId: string) => {
    const result = await Swal.fire({
      title: "Confirmation for deletion of course",
      text: 'Do you wish to remove this user from studying this course ?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: true,
    })
    if(result.isConfirmed){
      RemoveCourseMutation({course: course, email: emailId});
      getUserInformationMutation(emailId);
    }
    else{
      toast.error("This user is still studying this course")
    }
  }

  const formatFieldName = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const getFieldIcon = (key: string) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('email')) return <Mail className="w-4 h-4" />;
    if (lowerKey.includes('name')) return <Users className="w-4 h-4" />;
    if (lowerKey.includes('phone')) return <span className="w-4 h-4 flex items-center justify-center text-xs">📱</span>;
    if (lowerKey.includes('date') || lowerKey.includes('time')) return <Calendar className="w-4 h-4" />;
    return <Info className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-400 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl mb-4">👨‍💼</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Student Management Dashboard
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive user management system for Kepler 22B Education Platform
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Loading student data...</p>
              <p className="text-gray-500 text-sm">Please wait while we fetch the information</p>
            </div>
          </div>
        ) : (
          <div>
            {/* Statistics Header */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Total Students</h2>
                      <p className="text-gray-600">Registered users in the system</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-blue-600">{users.length}</div>
                    <div className="text-sm text-gray-500">Active learners</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-6">
              {users.map((user, index) => (
                <div
                  key={user._id.toString()}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* User Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {user.name || 'Student'}
                          </h3>
                          <p className="text-gray-600 flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            if (dropdownEmail == null || dropdownEmail != user.email) {
                              handleUserInformation(user.email);
                              setDropdownEmail(user.email);
                            } else {
                              setDropdownEmail(null);
                            }
                          }}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          {dropdownEmail === user.email ? (
                            <>
                              <ChevronDown className="w-4 h-4 mr-2" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronRight className="w-4 h-4 mr-2" />
                              View Details
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => deleteAccount(user.email)}
                          className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          <UserX className="w-4 h-4 mr-2" />
                          Remove User
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* User Basic Information */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.keys(user).map(
                        (key) =>
                          !["password", "_id", "__v"].includes(key.toLowerCase()) && (
                            <div key={key} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="text-blue-600 mt-0.5">
                                {getFieldIcon(key)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-700">
                                  {formatFieldName(key)}
                                </p>
                                <p className="text-gray-900 break-words">
                                  {String(user[key as keyof typeof user])}
                                </p>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>

                  {/* Detailed Information Dropdown */}
                  {dropdownEmail === user.email && (
                    <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-blue-50 p-6">
                      {!userMoreInformation ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-blue-400 rounded-full animate-spin border-t-transparent mx-auto mb-3"></div>
                            <p className="text-gray-600 font-medium">{message}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Left Column */}
                          <div className="space-y-6">
                            {/* User Details */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                              <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                  <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800">Student Information</h4>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Name:</span>
                                  <span className="text-gray-900 font-semibold">{userMoreInformation.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Email:</span>
                                  <span className="text-blue-600 font-semibold">{userMoreInformation.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Payment Due Date:</span>
                                  <span className="text-gray-900 font-semibold">
                                    {new Date(userMoreInformation.lastDate).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Paid This Month:</span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    userMoreInformation.paidForMonth 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {userMoreInformation.paidForMonth ? "Yes" : "No"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Last Paid Month:</span>
                                  <span className="text-gray-900 font-semibold">
                                    {new Date(0, userMoreInformation.paidMonth).toLocaleString("default", { month: "long" })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Payment Information */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                              <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                  <CreditCard className="w-5 h-5 text-green-600" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800">Payment Details</h4>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Last Payment:</h5>
                                  <div className="space-y-1">
                                    {userMoreInformation.payment_details.map((val, i) => (
                                      <div key={i} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{val.name}:</span>
                                        <span className="text-gray-900">{val.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Upcoming Payment:</h5>
                                  <div className="space-y-1">
                                    {userMoreInformation.upcoming_payment_details.map((val, i) => (
                                      <div key={i} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{val.name}:</span>
                                        <span className="text-gray-900">{val.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="pt-3 border-t border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-800 font-bold">Upcoming Amount:</span>
                                    <span className="text-2xl font-bold text-green-600">₹{amount}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-6">
                            {/* Admitted Courses */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                              <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                  <BookOpen className="w-5 h-5 text-purple-600" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800">Admitted Courses</h4>
                              </div>
                              <div className="space-y-4">
                                {userMoreInformation.admittedCourses.map((val, i) => (
                                  <div key={i} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <h5 className="font-semibold text-gray-800">{val.name}</h5>
                                      <button
                                        onClick={() => handleRemoveAdmittedCourse(val.name, userMoreInformation.email)}
                                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                        title="Remove course"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <div className="space-y-1 text-sm text-gray-600">
                                      <div className="flex justify-between">
                                        <span>Payment Date:</span>
                                        <span>{val.coursePaymentDate || "N/A"}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Next Payment:</span>
                                        <span>{val.upcomingPaymentDate ? new Date(val.upcomingPaymentDate).toLocaleDateString("en-IN") : "N/A"}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Last Date to Pay:</span>
                                        <span>{val.lastDateToPay ? new Date(val.lastDateToPay).toLocaleDateString("en-IN") : "N/A"}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Valid Until:</span>
                                        <span>{val.validity ? new Date(val.validity).toLocaleDateString("en-IN") : "N/A"}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Selected Courses */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                              <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                  <BookOpen className="w-5 h-5 text-orange-600" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800">Selected Courses</h4>
                              </div>
                              <div className="space-y-2">
                                {userMoreInformation.selectedCourses.map((val, i) => (
                                  <div key={i} className="flex items-center p-3 bg-orange-50 rounded-lg">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                    <span className="text-gray-800 font-medium">{val}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;