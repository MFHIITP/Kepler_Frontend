import React, { useEffect } from "react";
import toast from 'react-hot-toast'
import Swal from "sweetalert2";

function Part1() {
  useEffect(() => {
    if(localStorage.getItem('toast_message')){
      const value = localStorage.getItem('toast_message')
      toast.success(value)
    }
    localStorage.removeItem('toast_message')
  }, [])

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("sendAlert")) {
        const courses: string[] = JSON.parse(localStorage.getItem("pendingCourses")!) || [];
        const lastDate = localStorage.getItem("paymentLastDate")!
        await Swal.fire({
          title: "Payment Pending",
          text: `The Deadline for the courses ${courses.length > 0 ? courses.join(", ") : ""} is ${lastDate}. Positively make the payment before the deadline to ensure smooth continuation of these courses. Failure to make payment before deadline will result in getting these courses removed from your account`,
          icon: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK",
        });
        localStorage.removeItem("sendAlert");
        localStorage.removeItem("pendingCourses");
        localStorage.removeItem("paymentLastDate")
      }
    })();
  }, [])
  

  return (
    <div className="relative w-full">
      <div className="relative">
        <img
          src="/Images/Kepler_Image.webp"
          alt=""
          className="object-cover w-full h-[calc(100vh-10vh)] bright-image"
        />
        <div className="absolute top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 font-bold text-9xl ">
          <span className="text-7xl sm:text-8xl block text-center sm:text-left italic mb-6">WELCOME TO</span>
          <img src="/Images/Kepler_Logo.png" alt="Image not found" height={350} width={350} className="m-auto mt-[-20px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default Part1;
