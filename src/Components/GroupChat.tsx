import React, { useEffect, useState, useContext, useRef } from "react";
import { MyContext } from "../main";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import SearchIcon from "@mui/icons-material/Search";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

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
      setNewGroupName("");
      setNewDescription("");
      setShowAddForm(false);
    } else {
      event.target.disabled = false;
      toast.error("Failed to add New Group");
    }
  };

  const handleRemoveClick = async (groupName: string) => {
    const result = await Swal.fire({
      title: "Delete Group",
      text: `Are you sure you want to delete "${groupName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      allowOutsideClick: true,
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'rounded-lg',
        cancelButton: 'rounded-lg'
      }
    });
    if (result.isConfirmed) {
      const email = props.details?.email ?? "";
      deleteGroupMutation({ emailId: email, groupName: groupName });
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

  const filteredGroups = groups?.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`flex bg-gradient-to-br from-slate-50 to-slate-100 ${
        fs ? "h-[90vh]" : "min-h-[90vh]"
      }`}
      ref={fullscreenref}
    >
      {/* Left Sidebar - Groups List */}
      <div
        className={`w-80 bg-white border-r border-gray-200 shadow-xl flex flex-col ${
          fs ? "h-[90vh]" : "h-[90vh]"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <GroupIcon className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Group Chats</h1>
                <p className="text-emerald-100 text-sm">
                  {groups?.length || 0} groups available
                </p>
              </div>
            </div>
            <button
              onClick={handleFullScreen}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
              title={fs ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {fs ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/90 text-gray-700 placeholder-gray-500 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Groups List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-2 space-y-1">
            {filteredGroups?.map((val, index) => (
              <div
                key={index}
                onClick={() => {
                  setName(val.name);
                  setGroupdescription(val.description);
                }}
                title={val.name}
                className={`group relative flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  val.name === name 
                    ? "bg-emerald-50 border-2 border-emerald-200 shadow-md" 
                    : "hover:shadow-sm"
                }`}
              >
                {/* Group Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <GroupIcon className="text-white text-lg" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                {/* Group Info */}
                <div className="flex-1 ml-3 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold truncate ${
                      val.name === name ? "text-emerald-700" : "text-gray-800"
                    }`}>
                      {val.name}
                    </h3>
                    <span className="text-xs text-gray-500">12:34 PM</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {val.description || "No description available"}
                  </p>
                </div>

                {/* Delete Button for Admins */}
                {adminemails?.includes(props.details?.email!) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveClick(val.name);
                    }}
                    className="opacity-0 group-hover:opacity-100 ml-2 p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-all duration-200"
                    title="Delete Group"
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Group Section for Admins */}
        {adminemails?.includes(props.details?.email ?? "") && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <AddIcon />
                <span>Create New Group</span>
              </button>
            ) : (
              <div className="space-y-3 animate-in slide-in-from-bottom duration-200">
                <input
                  type="text"
                  placeholder="Group name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="text"
                  placeholder="Group description (optional)"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddClick}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewGroupName("");
                      setNewDescription("");
                    }}
                    className="flex-1 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col h-[74vh]">
        {name ? (
          <Talk
            key={name}
            details={props.details!}
            groupName={name}
            ref={scrollref}
            groupDescription={groupdescription}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <GroupIcon sx={{ fontSize: 40, color: 'white' }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Welcome to Group Chats
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Select a group from the sidebar to start chatting with your classmates and instructors. 
                Collaborate, learn, and grow together in our educational community.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupChat;