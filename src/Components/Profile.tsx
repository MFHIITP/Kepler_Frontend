import React, { useState } from "react";
import Student_Details from "./Student_Details";

function Profile(props) {
  const [dashboard, setDashboard] = useState(true);
  return (
    <div className="flex">
      <div className="flex flex-col w-[15%] h-[91vh] bg-blue-950 text-white">
        <div className="flex flex-col">
          <img
            src="../../../Images/Kepler_Logo.png"
            alt="Here should be the image"
            className="px-4 rounded-full mt-4"
          />
          <div className="flex justify-center">Kepler Educations</div>
        </div>
        <div className="w-full border border-white my-4 px-2"></div>
        <div className="flex flex-col">
          <div className="flex pl-4 my-5 text-2xl">Quick Access</div>
          <div className="flex flex-col gap-2">
            <div className={`flex justify-center text-xl p-2 mx-2 cursor-pointer ${dashboard ? 'bg-gray-600 rounded-lg' : ''}`} onClick={()=>{setDashboard(true)}}>DashBorard</div>
            <div className={`flex justify-center text-xl p-2 mx-2 cursor-pointer ${!dashboard ? 'bg-gray-600 rounded-lg' : ''}`} onClick={()=>{setDashboard(false)}}>Payments</div>
          </div>
        </div>
      </div>
      {dashboard && 
      <div className="">
        <Student_Details details = {props.details}/>  
      </div>}
    </div>
  );
}

export default Profile;
