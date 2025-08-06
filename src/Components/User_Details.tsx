import React, { useEffect, useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import loadRazorPayScript from "../utils/Razorpay/RazorpayPayments";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { componentPropsInterfacePaymentProfile } from "./Interfaces/ComponentProps.interface";
import { userInformation } from "./Interfaces/UserInformation.interface";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation } from "@tanstack/react-query";
const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

const MySwal = withReactContent(Swal)

const getUserDetails = async({emailId, name}: {emailId: string, name: string}) => {
  const { data } = await api.post(apiRoutes.courses.payment.userInformation,{
    email: emailId,
    name: name,
  })
  return data;
}

const User_Details: React.FC<componentPropsInterfacePaymentProfile> = (props) => {
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState<userInformation | null>(null);
  const [loading, setLoading] = useState(true);

  const handlecopyclick = async (val: string) => {
    await navigator.clipboard.writeText(val);
    toast.success("Copied");
  };

  const {mutate: getUserDetailsMutation} = useMutation({
    mutationFn: ({emailId, name}: {emailId: string, name: string}) => getUserDetails({emailId: emailId, name: name}),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLoading(false);
      setUserdetails(data.data);
    },
    onError: () => {
      setLoading(false);
    }
  })

  useEffect(() => {
    getUserDetailsMutation({emailId: props.details?.email ?? "", name: props.details?.name ?? ""})
  }, []);

  const handleRazorpayPayment = async () => {
    const scriptLoaded = await loadRazorPayScript();
    if (!scriptLoaded) {
      toast.error(
        "Failed to Load Razorpay Payment Interface. Please try again with stable internet"
      );
      return;
    }

    const amountPayment = userdetails?.amount?.value;
    const orderRes = await api.post(apiRoutes.razorpay.payment.createOrder, {
      amount: parseInt(amountPayment as unknown as string),
    });
    const orderData = orderRes.data.data;

    const options = {
      key: razorpayKeyId,
      amount: orderData.amount,
      currency: "INR",
      name: props.details?.name,
      description: "Course Payment",
      order_id: orderData.id,
      handler: async function (response) {
        const verifyRes = await api.post(
          apiRoutes.razorpay.payment.verifyPayment,
          {
            userEmail: props.details?.email,
            userName: props.details?.name,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }
        );
        if (verifyRes.status == 200) {
          toast.success("Payment Successful! Enjoy your studies with Kepler");
          navigate("/");
        } else {
          toast.error("Payment failed! Please try again");
        }
      },
      theme: {
        color: "#0d9488",
      },
    };
    const razorPayInstance = new window.Razorpay(options);
    razorPayInstance.open();
  };


  const handlePayment = async() => {
    const amount = userdetails?.amount.value
    const dt = new Date();
    dt.setDate(dt.getDate() + 30);
    const result = await MySwal.fire({
      title: 'Are you sure you want to proceed to payment ?',
      html: (
        <>
          <p className="mb-2">
            Your payment amount is <strong>INR {amount}</strong>
          </p>
          <p className="mb-2">Your payment shall be valid till {dt.toDateString()}</p>
          <p className="mb-1">
            Courses you are choosing:
          </p>
          <ul style={{ textAlign: 'left', paddingLeft: '1.2rem' }}>
            {userdetails?.applied_course_details.map((val, id) => (
              <li key={id}>• {val.name}</li>
            ))}
          </ul>
        </>
      ),
      background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
      color: '#333',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Proceed',
      cancelButtonText: 'No, Cancel',
      customClass: {
        popup: 'swal2-border-radius'
      }
    });
    if(result.isConfirmed){
      handleRazorpayPayment();
    }
    else{
      toast.error("Payment Cancelled")
    }
  }

  return (
    <div className={`flex flex-col min-h-screen`}>
      {!loading && (
        <div className="flex-1 bg-gray-200 p-6">
          <div className="flex justify-between font-semibold text-xl">
            <div>Student Referral Code - {props.details?.refercode}</div>
            <div className="">Student Name - {props.details?.name}</div>
          </div>
          {/* translaction part */}
          <div className="bg-white flex justify-between items-center py-6 w-full my-4 mb-8 rounded-lg p-4">
            {userdetails?.transaction_details &&
            userdetails?.transaction_details.length < 1 ? (
              <div className="my-[-10px] text-green-950">
                Buy Courses and Start Learning
              </div>
            ) : (
              <></>
            )}
            {userdetails?.transaction_details.map((val, key) => (
              <div key={key}>
                <div className="flex gap-3 justify-center items-center">
                  <div className="text-sm text-gray-600">{val.name}</div>
                  <div
                    className={`text-md font-semibold ${
                      val.color ? `text-green-700` : "text-gray-900"
                    }`}
                  >
                    {val?.salutation} {val.value}
                  </div>
                  {val.copy && (
                    <div>
                      <img
                        src="/Images/Copy_Icon.png"
                        alt=""
                        className="cursor-pointer h-7"
                        onClick={() => handlecopyclick(val.value as string)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* volunteer and payment details */}
          <div className="flex flex-col justify-between gap-8">
            {/* course details */}
            <div className="flex flex-col bg-white rounded-lg p-6">
              <div className="text-lg text-black font-semibold">
                Persuing Courses:
              </div>
              <div className="border border-gray-300 w-full"></div>
              <div className="flex flex-col pr-12 gap-4 mt-4 overflow-x-auto">
                {userdetails?.course_details &&
                userdetails.course_details.length < 1 ? (
                  <div className="text-green-950">
                    No Course Pursuing Currently
                  </div>
                ) : (
                  <div className="grid grid-cols-5">
                    <div className="">Course Name</div>
                    <div className="">Course Payment Date</div>
                    <div className="">Course Validity</div>
                    <div className="">Upcoming Payment Date</div>
                    <div className="">Upcoming Payment Last Date</div>
                  </div>
                )}
                {userdetails?.course_details.map((val, key) => (
                  <div key={key}>
                    <div className={`font-semibold text-md ${val.color ? `text-red-800` : "text-gray-800"} grid grid-cols-5`}>
                      <div className="text-sm">{val.name}</div>
                      <div className="text-sm">{val.coursePaymentDate}</div>
                      <div className="text-sm">{new Date(val.validity).toLocaleDateString("en-IN")}</div>
                      <div className="text-sm">{new Date(val.upcomingPaymentDate).toLocaleDateString("en-IN")}</div>
                      <div className="text-sm">{new Date(val.lastDateToPay).toLocaleDateString("en-IN")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* payment details */}
            <div className="flex flex-col bg-white rounded-lg p-6">
              <div className="text-lg text-black font-semibold">
                Payment Details:
              </div>
              <div className="border border-gray-300 w-full"></div>
              <div className="flex flex-col pr-12 gap-4 mt-4">
                {userdetails?.payment_details &&
                userdetails.payment_details.length < 1 ? (
                  <div className="text-green-950">No Payment Done Yet</div>
                ) : (
                  <></>
                )}
                {userdetails?.payment_details &&
                  userdetails?.payment_details.length > 0 &&
                  userdetails?.payment_details.map((val, key) => (
                    <div key={key}>
                      <div className="grid grid-cols-2 gap-[30%]">
                        <div className="text-gray-600 text-sm">{val.name}</div>
                        <div className="flex">
                          <div
                            className={`text-black font-semibold text-md ${
                              val.color ? `${val.color}` : "text-gray-800"
                            }`}
                          >
                            {val.salutation} {val.value}
                          </div>
                          {val.copy && (
                            <div>
                              <img
                                src="/Images/Copy_Icon.png"
                                alt=""
                                className="cursor-pointer ml-[10px] h-5"
                                onClick={() =>
                                  handlecopyclick(val.value as string)
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* upcoming payments and applied courses section */}
          <div className="flex justify-between">
            {/* applied courses section */}
            <div className="flex flex-col w-[49%] bg-white rounded-lg p-6 my-8">
              <div className="text-lg text-black font-semibold">
                Applied Courses for Upcoming Month:
              </div>
              <div className="border border-gray-300 w-full"></div>
              <div className="flex flex-col pr-12 gap-4 mt-4 overflow-auto">
                {userdetails?.applied_course_details.map((val, key) => (
                  <div key={key}>
                    <div className="flex justify-between">
                      <div className="text-gray-600 text-sm">{val.name}</div>
                      <div className="flex">
                        <div
                          className={`text-black font-semibold text-md ${
                            val.color ? `${val.color}` : "text-gray-800"
                          }`}
                        >
                          {val.salutation} {val.value}
                        </div>
                        {val.copy && (
                          <div>
                            <img
                              src="/Images/Copy_Icon.png"
                              alt=""
                              className="cursor-pointer ml-[10px]"
                              onClick={() =>
                                handlecopyclick(val.value as string)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* upcoming payment portion portion */}
            <div className="flex flex-col w-[49%] bg-white rounded-lg p-6 my-8 h-fit pb-12">
              <div className="text-lg text-black font-semibold flex justify-between items-center">
                <div className="">Upcoming Payment Details:</div>
                <button
                  onClick={handlePayment}
                  disabled = {userdetails?.amount.value == 0}
                  className={`text-white p-2 w-[20%] mb-2 rounded-lg flex justify-center items-center hover:shadow-md hover:shadow-blue-300 ${userdetails?.amount.value == 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-900 cursor-pointer '}`}
                >
                  Pay Now
                </button>
              </div>
              <div className="border border-gray-300 w-full"></div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-4">
                {userdetails?.upcoming_payments.map((val, key) => (
                  <div key={key}>
                    <div className="flex justify-between gap-4 min-w-max">
                      <div className="text-gray-600 text-sm">{val.name}:</div>
                      <div className="flex">
                        <div
                          className={`text-black font-semibold text-md ${
                            val.color ? `text-purple-900` : "text-gray-800"
                          }`}
                        >
                          {val.salutation} {val.value}
                        </div>
                        {val.copy && (
                          <div>
                            <img
                              src="/Images/Copy_Icon.png"
                              alt=""
                              className="cursor-pointer ml-[8px]"
                              onClick={() =>
                                handlecopyclick(val.value as string)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className={`${
                    userdetails?.amount.color
                      ? `${userdetails.amount.color}`
                      : "text-gray-950"
                  }`}
                >
                  {userdetails?.amount.name}: {userdetails?.amount.salutation}{" "}
                  {userdetails?.amount.value as unknown as string}
                </div>
              </div>
            </div>
          </div>
          {/* transaction logs */}
          <div className="flex flex-col bg-white p-5 rounded-lg">
            <div className="font-semibold text-xl">Transaction Logs</div>
            <div className="border border-gray-300 my-1"></div>
            <div className="bg-gray-300 rounded-lg pb-6 pt-1 my-2">
              <table className="w-full rounded-lg bg-gray-300">
                <thead className="">
                  <tr className="text-gray-900">
                    <th className="p-3 text-left font-semibold">Time</th>
                    <th className="p-3 text-left font-semibold">Amount</th>
                    <th className="p-3 text-left font-semibold">Messages</th>
                  </tr>
                </thead>
                <tbody className="divide-y-8 divide-gray-300">
                  {userdetails?.log_details.map((val, key) => (
                    <tr key={key} className="bg-white">
                      <td className="p-3">{val.value1}</td>
                      <td className="p-3">{val.value2}</td>
                      <td className="p-3">{val.value3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User_Details;
