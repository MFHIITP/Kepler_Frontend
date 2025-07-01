import React, { useState } from "react";
import Student_Details from "./Student_Details";

function Profile(props) {
  const [dashboard, setDashboard] = useState(true);
  return (
    <div className="flex">
      {dashboard && 
      <div className="w-full">
        <Student_Details details = {props.details}/>  
      </div>}
    </div>
  );
}

export default Profile;
