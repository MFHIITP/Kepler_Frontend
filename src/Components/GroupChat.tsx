import React, { useEffect, useState, useContext, useRef } from "react";
import { MyContext } from "../main";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import Talk from "./Talk";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { groupChatInterface } from "./Interfaces/groupChat.interface";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const getAllGroups = async (emailId: string) => {
  const { data } = await api.post(apiRoutes.chat.groupChat.getGroups, {
    email: emailId,
  });
  return data;
};

const deleteGroup = async ({emailId, groupName}: {emailId: string, groupName: string}) => {
  const { data } = await api.post(apiRoutes.chat.groupChat.removeGroup, {
    email: emailId,
    groupName: groupName,
  });
  return data;
};

const GroupChat: React.FC<componentPropsInterface> = (props) => {
  const [fs, setfs] = useState(false);
  const fullscreenref = useRef(null);
  const scrollref = useRef<HTMLDivElement | null>(null);
  const [groupdescription, setGroupdescription] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [name, setName] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState("");

  const context = useContext(MyContext);
  const adminemails = context?.adminemails;
  const [groups, setGroups] = useState<groupChatInterface[] | null>(null);

  const { mutate: getGroupsMutation } = useMutation({
    mutationFn: (emailId: string) => getAllGroups(emailId),
    onSuccess: (data) => {
      setGroups(data.list);
    },
    onError: () => {
      setGroups(null);
    },
  });

  const { mutate: deleteGroupMutation } = useMutation({
    mutationFn: ({emailId, groupName}: {emailId: string, groupName: string}) => deleteGroup({ emailId, groupName }),
    onSuccess: () => {
      toast.success("Group Deleted Successfully");
      getGroupsMutation(props.details?.email ?? "");
    },
    onError: () => {
      toast.error("Failed to Delete Group");
    },
  });

  useEffect(() => {
    getGroupsMutation(props.details?.email ?? "");
    if (scrollref.current) {
      scrollref.current.scrollTop = scrollref.current.scrollHeight;
    }
  }, []);

  const handleAddClick = async (event) => {
    if (newGroupName.length == 0) {
      toast.error("A New Group must have a Name");
      return;
    }
    event.target.disabled = true;
    const response = await api.post(apiRoutes.chat.groupChat.addGroup, {
      email: props.details?.email ?? "",
      name: newGroupName,
      description: newDescription,
      visibility: "none",
    });
    if (response.status === 200) {
      event.target.disabled = false;
      toast.success("New Group Added Successfully");
      getGroupsMutation(props.details?.email ?? "");
      setNewGroupName("")
      setNewDescription("");
    } else {
      event.target.disabled = false;
      toast.error("Failed to add New Group");
    }
  };

  const handleRemoveClick = async (groupName: string) => {
    const result = await Swal.fire({
      title: "Confirmation for Deletion of Group",
      text: "Do you want to remove group from Kepler Education ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: true,
    });
    if (result.isConfirmed) {
      const email = props.details?.email ?? "";
      deleteGroupMutation({ emailId: email, groupName: groupName });
    } else {
      toast.error("Deletion Cancelled");
    }
  };

  const isFullScreen = () => {
    setfs(document.fullscreenElement == fullscreenref.current);
  };

  const handleFullScreen = () => {
    isFullScreen();
    if (fs) {
      document.exitFullscreen();
    } else {
      fullscreenref.current.requestFullscreen();
    }
  };

  return (
    <div
      className={`wp_body flex ${
        fs ? "h-[100vh] overflow-auto" : "min-h-[90vh]"
      }`}
      ref={fullscreenref}
    >
      <div
        className={`shadow-xl w-[35vw] p-8 bg-gray-300 overflow-auto scrollbar-thin ${
          fs ? "h-[100vh]" : "h-[90vh]"
        }`}
      >
        <div className="bg-red-400" onClick={handleFullScreen}>
          FullScreen
        </div>
        <h2 className="text-2xl font-semibold flex justify-center mb-6">
          Group Chats
        </h2>
        <div className="space-y-4">
          {groups?.map((val, index) => (
            <div
              key={index}
              className={`flex items-center bg-gray-600 justify-between px-4 py-3 border rounded-lg shadow-lg ${
                val.name == name ? "border border-red-800 bg-orange-500" : ""
              } ${val.visibility}`}
            >
              <img
                src={"/Images/Monitoring.webp"}
                alt=""
                className="rounded-full w-12"
              />
              <div
                onClick={() => {
                  setName(val.name);
                  setGroupdescription(val.description);
                }}
                className="text-lg py-3 text-white font-medium hover:underline hover:scale-105 transition-transform cursor-pointer w-[50%]"
              >
                {val.name}
              </div>
              {adminemails?.includes(props.details?.email!) && (
                <div className="">
                  <button
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition"
                    onClick={() => handleRemoveClick(val.name)}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {adminemails?.includes(props.details?.email ?? "") && (
          <div className="flex flex-col">
            <div className="flex gap-4">
              <input
                type="text"
                className="mt-6 px-2 rounded-lg py-2 border border-gray-800"
                placeholder="Enter name of group"
                name="Input box"
                value={newGroupName}
                onChange={(e) => {
                  setNewGroupName(e.target.value);
                }}
              />
              <button
                className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                onClick={handleAddClick}
              >
                Add Group
              </button>
            </div>
            <input
              type="text"
              className="mt-6 px-2 rounded-lg py-2 border border-gray-800"
              placeholder="Enter group description"
              name="Description box"
              value={newDescription}
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            />
          </div>
        )}
      </div>
      <Talk
        key={name}
        details={props.details!}
        groupName={name}
        ref={scrollref}
        groupDescription={groupdescription}
      />
    </div>
  );
};

export default GroupChat;
