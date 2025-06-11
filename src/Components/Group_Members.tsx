import React, { FC, useEffect, useState } from "react";
import api from "../utils/api";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";
import apiRoutes from "../utils/Routes/apiRoutes";

const Group_Members = (props) => {
  const [Participants, setParticipants] = useState([]);
  const serv_addr = import.meta.env.VITE_SERV_ADDR;

  useEffect(() => {
    const participant_find = async () => {
      const response = await api.post(apiRoutes.chat.groupMembers.memberList, {
        groupname: props.groupname,
      });
      if (response.status === 200) {
        console.log(response.data);
        setParticipants(response.data.participant_list);
      }
    };
    participant_find();
  }, [serv_addr, props.groupname]);

  return (
    <div className="bg-gray-100 w-[50%] mx-auto shadow-lg overflow-auto scrollbar-thin">
      <div className="bg-green-600 text-white py-4 text-center text-3xl font-semibold">
        {props.groupname}
      </div>
      <img
        src="../../../Images/Monitoring.webp"
        alt="Image not found"
        className="w-32 h-32 mx-auto mt-4 rounded-full transition-transform hover:scale-110"
      />
      <div className="flex justify-center items-center mt-4">
        <div className="bg-gray-200 rounded-lg px-4 py-2 text-gray-700 text-sm w-[90%] text-center shadow-sm">
          <span className="font-semibold">Group Description:</span>{" "}
          {props.groupdescription}
        </div>
      </div>
      <div className="text-xl font-semibold text-center mt-4 mb-2 text-gray-800">
        Participants ({Participants.length})
      </div>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {Participants.map((participant, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 shadow-md flex items-center space-x-4 transition-transform duration-200 hover:scale-105"
          >
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              {participant[0]}
            </div>
            <div className="text-lg font-medium text-gray-800">
              {participant}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group_Members;
