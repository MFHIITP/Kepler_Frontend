import React, { useEffect, useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import loadRazorPayScript from "../utils/Razorpay/RazorpayPayments";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID

function User_Details(props) {
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({})
  const [loading, setLoading] = useState(true);

  const handlecopyclick = async (val) => {
    await navigator.clipboard.writeText(val);
    alert("Copied");
  };

  useEffect(() => {
    const fetchUserDetails = async()=>{
      const response = await api.post(apiRoutes.courses.payment.userInformation, {
          email: props.details.email,
          name: props.details.name
        })
      if(response.status == 200){
        const resp = await response.data
        console.log(resp);
        setUserdetails(resp.data);
        setLoading(false);
      }
      else{
        console.log("Falied to Load User Details")
      }
    }
    fetchUserDetails()
  }, [])


  const handleRazorpayPayment = async() => {
    const scriptLoaded = await loadRazorPayScript();
    if(!scriptLoaded){
      toast.error("Failed to Load Razorpay Payment Interface. Please try again with stable internet");
      return;
    }

    const amountPayment = userdetails?.upcoming_payments?.find(val => val.name == "Payment Amount")?.value;
    const orderRes = await api.post(apiRoutes.razorpay.payment.createOrder, {
      amount: parseInt(amountPayment)
    })
    const orderData = orderRes.data.data;

    const options = {
      key: razorpayKeyId,
      amount: orderData.amount,
      currency: 'INR',
      name: props.details.name,
      description: "Course Payment",
      order_id: orderData.id,
      handler: async function (response){
        const verifyRes = await api.post(apiRoutes.razorpay.payment.verifyPayment, {
          userEmail: props.details.email,
          userName: props.details.name,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        })
        if(verifyRes.status == 200){
          toast.success("Payment Successful! Enjoy your studies with Kepler")
          navigate('/')
        }
        else{
          toast.error("Payment failed! Please try again");
        }
      },
      theme: {
        color: "#0d9488"
      }
    }
    const razorPayInstance = new window.Razorpay(options);
    razorPayInstance.open();
  }

  return (
    <div className={`flex flex-col min-h-screen`}>
      {!loading && <div className="flex-1 bg-gray-200 p-6">
        <div className="flex justify-between font-semibold text-xl">
          <div>Student Referral Code - {props.details.refercode}</div>
          <div className="">Student Name - {props.details.name}</div>
        </div>
        {/* translaction part */}
        <div className="bg-white flex justify-between items-center py-6 w-full my-2 rounded-lg p-4">
          {userdetails.transaction_details.map((val, key) => (
            <div key={key}>
              <div className="flex gap-3 justify-center items-center">
                <div className="text-sm text-gray-600">{val.name}</div>
                <div
                  className={`text-md font-semibold ${
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
                      className="cursor-pointer"
                      onClick={() => handlecopyclick(val.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* volunteer and payment details */}
        <div className="flex justify-between">
          {/* course details */}
          <div className="flex flex-col w-[49%] bg-white rounded-lg p-6">
            <div className="text-lg text-black font-semibold">
              Persuing Courses:
            </div>
            <div className="border border-gray-300 w-full"></div>
            <div className="flex flex-col pr-12 gap-4 mt-4">
              {userdetails.course_details.map((val, key) => (
                <div key={key}>
                  <div className="flex justify-between">
                    <div className="text-gray-600 text-sm">
                      {val.name}
                    </div>
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
                            onClick={() => handlecopyclick(val.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* payment details */}
          <div className="flex flex-col w-[49%] bg-white rounded-lg p-6">
            <div className="text-lg text-black font-semibold">
              Payment Details:
            </div>
            <div className="border border-gray-300 w-full"></div>
            <div className="flex flex-col pr-12 gap-4 mt-4">
              {userdetails.payment_details.length > 0 &&
                userdetails.payment_details.map((val, key) => (
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
                              onClick={() => handlecopyclick(val.value)}
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
              {userdetails.applied_course_details.map((val, key) => (
                <div key={key}>
                  <div className="flex justify-between">
                    <div className="text-gray-600 text-sm">
                      {val.name}
                    </div>
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
                            onClick={() => handlecopyclick(val.value)}
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
          <div className="flex flex-col w-[49%] bg-white rounded-lg p-6 my-8">
            <div className="text-lg text-black font-semibold flex justify-between items-center">
              <div className="">Upcoming Payment Details:</div>
              <div
                onClick={handleRazorpayPayment}
                className={`text-white p-2 w-[20%] mb-2 rounded-lg flex justify-center items-center ${(() => {
                  const paymentDateStr = userdetails.upcoming_payments.find(
                    (val) => val.name === "Upcoming Payment Date"
                  )?.value;
                  if (!paymentDateStr) return "bg-gray-900";

                  const paymentDate = new Date(Date.parse(paymentDateStr));
                  return paymentDate < new Date()
                    ? "bg-blue-700 hover:bg-blue-900 cursor-pointer hover:shadow-md hover:shadow-blue-300"
                    : "bg-gray-700";
                })()}`}
              >
                Pay Now
              </div>
            </div>
            <div className="border border-gray-300 w-full"></div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-4">
              {userdetails.upcoming_payments.map((val, key) => (
                <div key={key}>
                  <div className="flex justify-between gap-4 min-w-max">
                    <div className="text-gray-600 text-sm">{val.name}:</div>
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
                            className="cursor-pointer ml-[8px]"
                            onClick={() => handlecopyclick(val.value)}
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
        {/* transaction logs */}
        <div className="flex flex-col bg-white p-5 rounded-lg">
          <div className="font-semibold text-xl">Transaction Logs</div>
          <div className="border border-gray-300 my-1"></div>
          <div className="bg-gray-300 rounded-lg pb-6 pt-1 my-2">
            <table className="w-full rounded-lg bg-gray-300">
              <thead className="">
                <tr className="text-gray-900">
                  <th className="p-3 text-left font-semibold">Amount</th>
                  <th className="p-3 text-left font-semibold">Time</th>
                  <th className="p-3 text-left font-semibold">Messages</th>
                </tr>
              </thead>
              <tbody className="divide-y-8 divide-gray-300">
                {userdetails.log_details.map((val, key) => (
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
      </div>}
    </div>
  );
}

export default User_Details;
