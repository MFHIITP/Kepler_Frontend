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
import {Trash2} from 'lucide-react'

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

  return (
    <Box maxW="80vw" mx="auto" mt={8} p={4}>
      <Heading mb={6} textAlign="center">
        {/* User Data */}
      </Heading>
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <div>
          <div className="flex justify-center items-center text-4xl">
            UserList ({users.length})
          </div>
          <div>
            {users.map((user, _id) => (
              <div
                key={user._id.toString()}
                className="text-white m-4 p-4 bg-gray-700 rounded-lg relative "
              >
                {Object.keys(user).map(
                  (key) =>
                    !["password", "_id", "__v"].includes(key.toLowerCase()) && (
                      <div key={key}>
                        {key.toLocaleUpperCase()}:{" "}
                        <span className="ml-4 text-xl">
                          {String(user[key as keyof typeof user])}
                        </span>
                      </div>
                    )
                )}
                <div
                  onClick={() => {
                    deleteAccount(user.email);
                  }}
                  className={`absolute top-1 right-1 cursor-pointer bg-red-500 m-2 p-2 rounded-lg hover:bg-red-700`}
                >
                  RemoveUser
                </div>
                <div
                  className="bg-blue-500 px-4 py-2 my-2 cursor-pointer rounded-lg hover:bg-blue-700 w-fit"
                  onClick={() => {
                    if (dropdownEmail == null || dropdownEmail != user.email) {
                      handleUserInformation(user.email);
                      setDropdownEmail(user.email);
                    } else {
                      setDropdownEmail(null);
                    }
                  }}
                >
                  More Information
                </div>
                {dropdownEmail === user.email && (
                  <Box bg="white" borderRadius="lg" mt={4} p={4} color="black">
                    {!userMoreInformation ? (
                      <div>{message}</div>
                    ) : (
                      <Box>
                        <div className="font-bold mt-2">
                          User Details
                        </div>
                        <div>
                          <b>Name:</b> {userMoreInformation.name}
                        </div>
                        <div>
                          <b>Email:</b> {userMoreInformation.email}
                        </div>
                        <div>
                          <b>Payment Due Date:</b>{" "}
                          {new Date(userMoreInformation.lastDate).toLocaleString()}
                        </div>
                        <div>
                          <b>Paid For This Month:</b>{" "}
                          {userMoreInformation.paidForMonth ? "Yes" : "No"}
                        </div>
                        <div>
                          <b>Last Paid Month:</b>{" "}
                          {new Date(
                            0,
                            userMoreInformation.paidMonth
                          ).toLocaleString("default", { month: "long" })}
                        </div>

                        <Divider my={3} />

                        <div className="font-bold mt-2">
                          Admitted Courses:
                        </div>
                        <Box pl={4}>
                          {userMoreInformation.admittedCourses.map((val, i) => (
                            <div key={i} className="flex gap-2">• {val} <Trash2 className="w-4 cursor-pointer hover:text-red-800 hover:scale-105"onClick={()=>{handleRemoveAdmittedCourse(val, userMoreInformation.email)}}/></div>
                          ))}
                        </Box>

                        <div className="font-bold mt-3">
                          Selected Courses:
                        </div>
                        <Box pl={4}>
                          {userMoreInformation.selectedCourses.map((val, i) => (
                            <div key={i}>• {val}</div>
                          ))}
                        </Box>

                        <Divider my={3} />

                        <div className="font-bold mt-2">
                          Last Payment Details:
                        </div>
                        <Box pl={4}>
                          {userMoreInformation.payment_details.map((val, i) => (
                            <div key={i}>
                              {val.name}: {val.value}
                            </div>
                          ))}
                        </Box>

                        <div className="font-bold mt-3">
                          Upcoming Payment Details:
                        </div>
                        <Box pl={4}>
                          {userMoreInformation.upcoming_payment_details.map(
                            (val, i) => (
                              <div key={i}>
                                {val.name}: {val.value}
                              </div>
                            )
                          )}
                        </Box>

                        <Divider my={3} />

                        <div className="font-bold">
                          Upcoming Payment Amount: ₹{amount}
                        </div>
                      </Box>
                    )}
                  </Box>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Box>
  );
};

export default UsersTable;
