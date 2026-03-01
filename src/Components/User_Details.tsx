import React, { useEffect, useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import loadRazorPayScript from "../utils/Razorpay/RazorpayPayments";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { componentPropsInterfacePaymentProfile } from "./Interfaces/ComponentProps.interface";
import { userInformation } from "./Interfaces/UserInformation.interface";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useMutation } from "@tanstack/react-query";
const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

const MySwal = withReactContent(Swal);

const getUserDetails = async ({
  emailId,
  name,
}: {
  emailId: string;
  name: string;
}) => {
  const { data } = await api.post(apiRoutes.courses.payment.userInformation, {
    email: emailId,
    name: name,
  });
  return data;
};

// Icon Components
const UserIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const BookOpenIcon = () => (
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
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const CreditCardIcon = () => (
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
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

const ClipboardListIcon = () => (
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
      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CalendarIcon = () => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const BanknotesIcon = () => (
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
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ClockIcon = () => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const User_Details: React.FC<componentPropsInterfacePaymentProfile> = (props) => {
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState<userInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [coursesBought, setCoursesBought] = useState<String[] | []>([]);
  const [additionalCourses, setAdditionalCourses] = useState<String[] | []>([])
  const [amountPayment, setAmountPayment] = useState<number | undefined>(undefined)

  const handlecopyclick = async (val: string) => {
    await navigator.clipboard.writeText(val);
    toast.success("Copied");
  };

  const { mutate: getUserDetailsMutation } = useMutation({
    mutationFn: ({ emailId, name }: { emailId: string; name: string }) =>
      getUserDetails({ emailId: emailId, name: name }),
    onMutate: () => setLoading(true),
    onSuccess: async(data) => {
      setLoading(false);
      setUserdetails(data.data);
      const courses = await data.data.applied_course_details.map((course) => course.name);
      setCoursesBought(courses ?? []);
      setAdditionalCourses(data.data.additionalCoursesApplied ?? [])
      setAmountPayment(data.data.amount.value)
    },
    onError: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    getUserDetailsMutation({
      emailId: props.details?.email ?? "",
      name: props.details?.name ?? "",
    });
  }, []);

  useEffect(() => {
    if (!userdetails?.amount?.value) return;

  const baseAmount = userdetails.amount.value;

  if (referralCode && (referralCode.length === 8 || referralCode.length === 11)) {
    setAmountPayment(Number((Number(baseAmount) * 0.75).toFixed(2)));
  } else {
    setAmountPayment(Number(baseAmount));
  }
  }, [referralCode, userdetails])
  

  const handleRazorpayPayment = async () => {
    const scriptLoaded = await loadRazorPayScript();
    if (!scriptLoaded) {
      toast.error(
        "Failed to Load Razorpay Payment Interface. Please try again with stable internet"
      );
      return;
    }

    const orderRes = await api.post(apiRoutes.razorpay.payment.createOrder, {
      amount: Math.round(amountPayment ?? 0) * 100,
    });
    console.log(orderRes.data.data.id);
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
            referralCode_giver: referralCode,
            coursesBought: coursesBought,
            additionalCoursesApplied: additionalCourses
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

  const handlePayment = async () => {
    if(referralCode == userdetails?.referCode){
      toast.error("Referral Code is Not Valid. Please do not try to be too clever!");
      return;
    }

    const dt = new Date();

    dt.setDate(dt.getDate() + 30);
    const result = await MySwal.fire({
      title: "",
      html: (
        <div className="payment-confirmation-modal">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Confirm Your Payment
            </h2>
            <p className="text-gray-600">
              Review your order details before proceeding
            </p>
          </div>

          {/* Payment Details Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-700">
                Payment Amount
              </span>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  ₹{Number(Math.round(Number(amountPayment))).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">Including all taxes</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-blue-200">
              <span className="text-sm font-medium text-gray-600">
                Valid Until
              </span>
              <div className="flex items-center text-sm font-semibold text-blue-600">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {dt.toDateString()}
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-lg font-bold text-gray-900">
                Selected Courses
              </h3>
            </div>

            <div className="space-y-3">
              {userdetails?.applied_course_details.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">
                    {course.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-green-500 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure Payment
            </div>
          </div>
        </div>
      ),
      background: "white",
      color: "#333",
      icon: false,
      showCancelButton: true,
      confirmButtonText: "Complete Payment",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "payment-modal-popup",
        confirmButton: "payment-confirm-btn",
        cancelButton: "payment-cancel-btn",
        htmlContainer: "payment-html-container",
      },
      didOpen: () => {
        // Add custom styles when modal opens
        const style = document.createElement("style");
        style.textContent = `
      .payment-modal-popup {
        border-radius: 24px !important;
        padding: 2rem !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(20px) !important;
        max-width: 500px !important;
        width: 90% !important;
      }
      
      .payment-html-container {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      .payment-confirm-btn {
        background: linear-gradient(to right, #2563eb, #4f46e5) !important;
        color: white !important;
        border: none !important;
        border-radius: 12px !important;
        padding: 12px 32px !important;
        font-weight: 600 !important;
        font-size: 16px !important;
        transition: all 0.2s ease !important;
        box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.3) !important;
        margin: 0 8px !important;
      }
      
      .payment-confirm-btn:hover {
        background: linear-gradient(to right, #1d4ed8, #4338ca) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px 0 rgba(37, 99, 235, 0.4) !important;
      }
      
      .payment-cancel-btn {
        background: transparent !important;
        color: #6b7280 !important;
        border: 2px solid #e5e7eb !important;
        border-radius: 12px !important;
        padding: 12px 32px !important;
        font-weight: 600 !important;
        font-size: 16px !important;
        transition: all 0.2s ease !important;
        margin: 0 8px !important;
      }
      
      .payment-cancel-btn:hover {
        background: #f9fafb !important;
        border-color: #d1d5db !important;
        color: #374151 !important;
        transform: translateY(-2px) !important;
      }
      
      .payment-confirmation-modal {
        text-align: left;
      }
      
      .swal2-actions {
        margin-top: 2rem !important;
        justify-content: center !important;
        gap: 1rem !important;
      }
      
      .swal2-title {
        display: none !important;
      }
    `;
        document.head.appendChild(style);
      },
    });

    if (result.isConfirmed) {
      handleRazorpayPayment();
    } else {
      toast.error("Payment Cancelled");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-screen md:max-w-[78rem] mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white">
                  <UserIcon />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {props.details?.name}
                  </h1>
                  <p className="text-gray-600">
                    Welcome back, {props.details?.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 border border-purple-200">
                  <div className="text-sm text-gray-600 font-medium">
                    Referral Code
                  </div>
                  <div className="text-lg font-bold text-purple-700">
                    {userdetails?.referCode ?? "N/A"}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-3 border border-blue-200">
                  <div className="text-sm text-gray-600 font-medium">
                    Student Name
                  </div>
                  <div className="text-lg font-bold text-blue-700">
                    {props.details?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        {userdetails?.transaction_details &&
          userdetails.transaction_details.length > 0 && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
                    <BanknotesIcon />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Transaction Summary
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {userdetails.transaction_details.map((val, key) => (
                    <div
                      key={key}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600 font-medium">
                            {val.name}
                          </div>
                          <div
                            className={`text-lg font-bold ${
                              val.color ? "text-green-700" : "text-gray-900"
                            }`}
                          >
                            {val.salutation} {val.value}
                          </div>
                        </div>
                        {val.copy && (
                          <button
                            onClick={() => handlecopyclick(val.value as string)}
                            className="p-2 hover:bg-white rounded-lg transition-colors duration-200 text-gray-500 hover:text-gray-700"
                          >
                            <CopyIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        {userdetails?.transaction_details &&
          userdetails.transaction_details.length === 0 && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-6 text-center">
                <div className="inline-flex p-3 bg-green-100 rounded-full mb-4">
                  <BookOpenIcon />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Ready to Start Learning?
                </h3>
                <p className="text-green-700">
                  Buy courses and begin your educational journey with us!
                </p>
              </div>
            </div>
          )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Pursuing Courses */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6 h-full overflow-x-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
                  <BookOpenIcon />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Pursuing Courses
                </h2>
              </div>

              {userdetails?.course_details &&
              userdetails.course_details.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpenIcon />
                  </div>
                  <p className="text-gray-600 text-lg">
                    No courses currently enrolled
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Start your learning journey by selecting courses!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 min-w-max">
                  {/* Header */}
                  <div className="grid grid-cols-5 gap-4 p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border border-gray-300">
                    <div className="font-semibold text-gray-700 text-sm">
                      Course Name
                    </div>
                    <div className="font-semibold text-gray-700 text-sm">
                      Payment Date
                    </div>
                    <div className="font-semibold text-gray-700 text-sm">
                      Validity
                    </div>
                    <div className="font-semibold text-gray-700 text-sm">
                      Next Payment
                    </div>
                    <div className="font-semibold text-gray-700 text-sm">
                      Last Date
                    </div>
                  </div>

                  {/* Course Rows */}
                  <div className="space-y-2">
                    {userdetails?.course_details.map((val, key) => (
                      <div
                        key={key}
                        className={`grid grid-cols-5 gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                          val.color
                            ? "bg-red-50 border-red-200"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <div
                          className={`font-medium text-sm ${
                            val.color ? "text-red-800" : "text-gray-800"
                          }`}
                        >
                          {val.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {val.coursePaymentDate}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(val.validity).toLocaleDateString("en-IN")}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(val.upcomingPaymentDate).toLocaleDateString(
                            "en-IN"
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(val.lastDateToPay).toLocaleDateString(
                            "en-IN"
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Details */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                  <CreditCardIcon />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Payment Details
                </h2>
              </div>

              {userdetails?.payment_details &&
              userdetails.payment_details.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCardIcon />
                  </div>
                  <p className="text-gray-600">No payments made yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userdetails?.payment_details?.map((val, key) => (
                    <div
                      key={key}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600 font-medium">
                            {val.name}
                          </div>
                          <div
                            className={`font-bold text-lg ${
                              val.color ? val.color : "text-gray-800"
                            }`}
                          >
                            {val.salutation} {val.value}
                          </div>
                        </div>
                        {val.copy && (
                          <button
                            onClick={() => handlecopyclick(val.value as string)}
                            className="p-2 hover:bg-white rounded-lg transition-colors duration-200 text-gray-500 hover:text-gray-700"
                          >
                            <CopyIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Applied Courses and Upcoming Payment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Applied Courses */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
                <ClipboardListIcon />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Applied Courses for Upcoming Month
              </h2>
            </div>

            {userdetails?.applied_course_details &&
            userdetails.applied_course_details.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ClipboardListIcon />
                </div>
                <p className="text-gray-600">
                  No courses applied for next month
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {userdetails?.applied_course_details.map((val, key) => (
                  <div
                    key={key}
                    className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-800">
                          {val.name}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`font-bold ${
                            val.color ? val.color : "text-gray-800"
                          }`}
                        >
                          {val.salutation} {val.value}
                        </div>
                        {val.copy && (
                          <button
                            onClick={() => handlecopyclick(val.value as string)}
                            className="p-1 hover:bg-white rounded transition-colors duration-200 text-gray-500 hover:text-gray-700"
                          >
                            <CopyIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Payment */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6">
            <div className="grid grid-cols-[3fr_1fr] items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
                  <CalendarIcon />
                </div>
                <h2 className="text-xl flex-nowrap font-bold text-gray-800">
                  Upcoming Payment
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text" 
                    placeholder="Enter Referral Code (if any)..."
                    onChange={(e) => setReferralCode(e.target.value)}
                    value={referralCode}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md min-w-[220px]" 
                  />
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={userdetails?.amount.value == 0 || true}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  (userdetails?.amount.value == 0 ||  true)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-105 hover:shadow-lg"
                }`}
              >
                Pay Now
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userdetails?.upcoming_payments.map((val, key) => (
                  <div
                    key={key}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="text-sm text-gray-600 font-medium">
                        {val.name}
                      </div>
                      <div className="flex items-center justify-between">
                        <div
                          className={`font-bold ${
                            val.color ? "text-purple-900" : "text-gray-800"
                          }`}
                        >
                          {val.salutation} {val.value}
                        </div>
                        {val.copy && (
                          <button
                            onClick={() => handlecopyclick(val.value as string)}
                            className="p-1 hover:bg-white rounded transition-colors duration-200 text-gray-500 hover:text-gray-700"
                          >
                            <CopyIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Amount */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 border-2 border-green-300">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-gray-800">
                    Total Amount Due
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      userdetails?.amount.color || "text-green-600"
                    }`}
                  >
                    {userdetails?.amount.salutation} {Number(Math.round(Number(amountPayment))).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Logs */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg text-white">
              <ClockIcon />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Transaction Logs
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-300">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Time
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Messages
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userdetails?.log_details &&
                  userdetails.log_details.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <ClockIcon />
                        <p className="mt-2">No transaction logs yet</p>
                      </td>
                    </tr>
                  ) : (
                    userdetails?.log_details.map((val, key) => (
                      <tr
                        key={key}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-gray-800">
                          {val.value1}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {val.value2}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {val.value3}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Details;
