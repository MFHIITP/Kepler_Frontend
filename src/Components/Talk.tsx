import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  FC,
  MutableRefObject,
} from "react";
import { MyContext } from "../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faInfo,
  faTimes,
  faUsers,
  faPaperclip,
  faPaperPlane,
  faFile,
  faDownload,
  faChevronDown,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import PdfPreview from "./PdfPreview";
import Group_Members from "./Group_Members";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { userdetails } from "./Interfaces/Details.interface";
import { useNavigate } from "react-router-dom";
import { groupChatMessages } from "./Interfaces/GroupMessages.interface";
import { useMutation } from "@tanstack/react-query";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

interface TalkInterface {
  key: string | null;
  details: userdetails;
  groupName: string | null;
  ref: MutableRefObject<HTMLDivElement | null>;
  groupDescription: string;
  changeView: React.Dispatch<React.SetStateAction<string>>;
  mobileView: string;
}

const getChats = async (groupName: string) => {
  const { data } = await api.post(apiRoutes.chat.Talk.getPastChats, {
    groupName: groupName,
  });
  return data;
};

const deleteMessage = async ({
  removerEmail,
  groupName,
  dateToDelete,
  removedEmail,
}: {
  removerEmail: string;
  groupName: string;
  dateToDelete: string;
  removedEmail: string;
}) => {
  const { data } = await api.post(apiRoutes.chat.Talk.deleteMessage, {
    removerEmail: removerEmail,
    groupName: groupName,
    dateToDelete: dateToDelete,
    removedEmail: removedEmail,
  });
  return data;
};

const Talk: FC<TalkInterface> = ({
  key,
  details,
  groupName,
  ref,
  groupDescription,
  changeView,
  mobileView,
}) => {
  const scrollref = useRef<HTMLDivElement | null>(null);
  const [group, setGroup] = useState(groupName);
  const [opendetails, setOpendetails] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [allmessages, setAllmessages] = useState<groupChatMessages[]>([]);
  const [Socket, setSocket] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const context = useContext(MyContext);
  const adminemails = context?.adminemails;
  const webs_addr = import.meta.env.VITE_WEBS_ADDR;
  const wsRef = useRef<WebSocket | null>(null);
  const navigate = useNavigate();

  const { mutate: getChatsMutation } = useMutation({
    mutationFn: (groupName: string) => getChats(groupName),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLoading(false);
      setAllmessages(data);
    },
    onError: () => {
      setLoading(false);
      console.log("No Messages Found");
    },
  });

  const { mutate: deleteMessageMutation } = useMutation({
    mutationFn: ({
      removerEmail,
      groupName,
      dateToDelete,
      removedEmail,
    }: {
      removerEmail: string;
      groupName: string;
      dateToDelete: string;
      removedEmail: string;
    }) =>
      deleteMessage({ removerEmail, groupName, dateToDelete, removedEmail }),
    onSuccess: () => {
      toast.success("Message Deleted Successfully");
    },
    onError: () => {
      toast.error("Failed to Delete Message");
    },
  });

  useEffect(() => {
    if (scrollref.current) {
      scrollref.current.scrollTop = scrollref.current.scrollHeight;
    }
  }, [allmessages]);

  useEffect(() => {
    if(wsRef.current){
      return;
    }
    const ws = new WebSocket(`${webs_addr}`);
    wsRef.current = ws;

    setSocket(ws);
    ws.onmessage = async (event) => {
      const data = await JSON.parse(event.data);
      setAllmessages((prevmessages) => [...prevmessages, data]);
    };
    return () => {
      ws.close();
    };
  }, [webs_addr]);

  useEffect(() => {
    if (group) {
      getChatsMutation(group);
    }
  }, []);

  const handlePdfClick = (bookUrl: string) => {
    console.log(bookUrl);
    const listed = bookUrl.split("/");
    const newUrl = listed[listed.length - 1];
    localStorage.setItem("before_url", "image/upload/v1735395980");
    navigate(`/readbook/${newUrl}`);
  };

  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    if (!message.trim() && !file) return;

    if (Socket) {
      setIsTyping(true);
      const formdata = new FormData();
      formdata.append("format", "GroupChat");
      formdata.append("email", details.email);
      formdata.append("group_name", group as unknown as string);
      formdata.append("name", details.name);
      formdata.append("message", message);
      if (file) {
        const imageform = new FormData();
        imageform.append("name", details.name);
        imageform.append("image", file);
        console.log(imageform);
        const response = await api.post(apiRoutes.imagePosting, imageform, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60_000,
        });
        console.log(response);
        const resp = await response.data;
        formdata.append("image", resp.url);
        formdata.append("image_title", file.name);
      } else {
        formdata.append("image", "");
      }
      const formattedDate = new Date().toLocaleString("en-IN");
      formdata.append("date", formattedDate);
      const socketData: { [key: string]: string | number } = {};
      formdata.forEach((val, key) => {
        socketData[key] = val as string;
      });
      Socket.send(JSON.stringify(socketData));
      setIsTyping(false);
    }
    setMessage("");
    setFile(undefined);
  };

  const handleDelete = async (posts: groupChatMessages, index: number) => {
    confirmAlert({
      title: "Delete Message",
      message:
        "Are you sure you want to delete this message? This action cannot be undone.",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            deleteMessageMutation({
              removerEmail: details.email,
              groupName: group!,
              dateToDelete: posts.date,
              removedEmail: posts.email,
            });
            setAllmessages((prevMessages) =>
              prevMessages.filter((_, i) => i !== index)
            );
          },
        },
        {
          label: "Cancel",
          onClick: () => {
            toast.error("Deletion Cancelled");
          },
        },
      ],
      customUI: ({ onClose, title, message, buttons }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-red-600 text-xl"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    buttons?.[1].onClick?.();
                    onClose();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    buttons?.[0].onClick?.();
                    onClose();
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    });
  };

  const generateAvatar = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-teal-500",
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;
    return colors[colorIndex];
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">
            Loading messages...
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Please wait while we fetch your conversations
          </p>
        </div>
      </div>
    );
  }

  if (groupName == null) {
    return (
      <div className="flex-1 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <FontAwesomeIcon icon={faUsers} className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Welcome to Group Chats
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Select a group from the sidebar to start chatting with your
            classmates and instructors. Collaborate, learn, and grow together in
            our educational community.
          </p>
        </div>
      </div>
    );
  }

  if (!details.name) {
    return (
      <div className="flex-1 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span className="text-white text-3xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Authentication Required
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Please log in to access the group chat and start collaborating with
            your peers.
          </p>
          <button className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex bg-white">
      <div
        className={`flex flex-col transition-all duration-300 ${
          opendetails ? "md:flex md:w-2/3" : "md:flex md:w-full"
        } ${mobileView == "description" ? "hidden" : "w-screen"}`}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-full md:hidden text-white shadow-lg"
                onClick={() => changeView("chatList")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{groupName}</h1>
                <p className="text-emerald-100 text-sm">
                  {allmessages.length} messages • Online
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setOpendetails(!opendetails);
                changeView("description");
              }}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
              title={opendetails ? "Hide Details" : "Show Details"}
            >
              {/* Desktop icons */}
              <span className="hidden sm:inline">
                <FontAwesomeIcon icon={opendetails ? faTimes : faInfo} />
              </span>

              {/* Mobile icons */}
              <span className="inline sm:hidden">
                <FontAwesomeIcon
                  icon={opendetails ? faChevronDown : faEllipsisH}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className="p-4 overflow-y-auto wp_body scrollbar-thin"
          style={{ height: "67vh" }}
          ref={scrollref}
        >
          <div className="space-y-4 max-w-4xl mx-auto">
            {allmessages.map((post, index) => {
              const isOwnMessage = details.email === post.email;
              const showAvatar =
                index === 0 || allmessages[index - 1]?.email !== post.email;

              return (
                <div
                  key={index}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  } group`}
                >
                  <div
                    className={`relative max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
                      isOwnMessage ? "order-2" : "order-1"
                    }`}
                  >
                    {/* Avatar */}
                    {!isOwnMessage && showAvatar && (
                      <div
                        className={`w-8 h-8 ${generateAvatar(
                          post.name
                        )} rounded-full flex items-center justify-center text-white font-bold text-sm mb-1`}
                      >
                        {post.name[0].toUpperCase()}
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`relative p-3 rounded-2xl shadow-sm ${
                        isOwnMessage
                          ? "bg-emerald-600 text-white ml-4"
                          : "bg-white text-gray-800 mr-4 border border-gray-200"
                      } ${showAvatar || isOwnMessage ? "mt-2" : "mt-1"}`}
                    >
                      {/* Delete Button */}
                      {(details.email === post.email ||
                        adminemails?.includes(details.email)) && (
                        <button
                          onClick={() => handleDelete(post, index)}
                          className={`absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg ${
                            isOwnMessage ? "text-white" : "text-white"
                          }`}
                          title="Delete message"
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="text-xs"
                          />
                        </button>
                      )}

                      {/* Sender Name (for others' messages) */}
                      {!isOwnMessage && showAvatar && (
                        <p className="text-sm font-semibold text-emerald-600 mb-1">
                          {post.name}
                        </p>
                      )}

                      {/* Message Content */}
                      <div className="space-y-2">
                        {post.message && (
                          <p className="whitespace-pre-wrap break-words">
                            {post.message.startsWith("http") ||
                            post.message.startsWith("https") ? (
                              <a
                                href={post.message}
                                className={`underline hover:no-underline ${
                                  isOwnMessage
                                    ? "text-emerald-100"
                                    : "text-emerald-600"
                                }`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {post.message}
                              </a>
                            ) : (
                              post.message
                            )}
                          </p>
                        )}

                        {/* Image/File Display */}
                        {post.image && (
                          <div className="mt-2">
                            {post.image.endsWith(".pdf") ? (
                              <div
                                className="relative cursor-pointer group/pdf"
                                onClick={() => handlePdfClick(post.image ?? "")}
                              >
                                <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300 hover:border-emerald-400 transition-colors">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                                      <FontAwesomeIcon
                                        icon={faFile}
                                        className="text-white"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium text-gray-800 truncate">
                                        {post.image_title || "Document.pdf"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        PDF Document
                                      </p>
                                    </div>
                                    <FontAwesomeIcon
                                      icon={faDownload}
                                      className="text-gray-400 group-hover/pdf:text-emerald-600 transition-colors"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <img
                                src={post.image}
                                alt="Shared image"
                                className="max-w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                style={{
                                  maxHeight: "300px",
                                  objectFit: "cover",
                                }}
                                onError={(
                                  e: React.SyntheticEvent<
                                    HTMLImageElement,
                                    Event
                                  >
                                ) => {
                                  e.currentTarget.style.display = "none";
                                }}
                                onClick={() =>
                                  window.open(post.image, "_blank")
                                }
                              />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Message Tail */}
                      <div
                        className={`absolute top-0 w-0 h-0 ${
                          isOwnMessage
                            ? "right-0 translate-x-2 border-l-8 border-l-emerald-600 border-t-8 border-t-transparent"
                            : "left-0 -translate-x-2 border-r-8 border-r-white border-t-8 border-t-transparent"
                        }`}
                      />
                    </div>
                    {/* Message Time */}
                    <div
                      className={`flex justify-end mt-2 ${
                        isOwnMessage ? "text-emerald-200" : "text-gray-200"
                      }`}
                    >
                      <span className="text-xs">
                        {post.date}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            {/* File Upload */}
            <div className="relative">
              <input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFile(e.target.files?.[0])
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*,.pdf,.doc,.docx"
              />
              <button
                type="button"
                className="w-12 h-12 bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 rounded-full flex items-center justify-center transition-colors duration-200"
                title="Attach file"
              >
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
            </div>

            {/* File Preview */}
            {file && (
              <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                <FontAwesomeIcon icon={faFile} className="text-emerald-600" />
                <span className="text-sm text-emerald-700 font-medium truncate max-w-32">
                  {file.name}
                </span>
                <button
                  onClick={() => setFile(undefined)}
                  className="text-emerald-600 hover:text-emerald-800"
                  type="button"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xs" />
                </button>
              </div>
            )}

            {/* Message Input */}
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all duration-200"
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!message.trim() && !file}
              className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
              title="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>

      {/* Group Details Sidebar */}
      <div
        className={`${mobileView != "description" ? "hidden" : ""} ${
          opendetails ? "md:flex md:w-1/3" : "md:hidden"
        } border-l border-gray-200 bg-white`}
      >
        <Group_Members
          key={groupName!}
          groupName={groupName!}
          details={details}
          groupDescription={groupDescription}
          mobileView={mobileView}
          changeView={changeView}
        />
      </div>
    </div>
  );
};

export default Talk;
