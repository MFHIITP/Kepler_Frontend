import React, {useEffect, useState, useContext, useRef, FC, MutableRefObject} from "react";
import { MyContext } from "../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PdfPreview from "./PdfPreview";
import Group_Members from "./Group_Members";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { userdetails } from "./Interfaces/Details.interface";
import { useNavigate } from "react-router-dom";
import { groupChatMessages } from "./Interfaces/GroupMessages.interface";
import { useMutation } from "@tanstack/react-query";
import {confirmAlert} from "react-confirm-alert"
import 'react-confirm-alert/src/react-confirm-alert.css'
import toast from "react-hot-toast";

interface TalkInterface {
  key: string | null;
  details: userdetails;
  groupName: string | null;
  ref: MutableRefObject<HTMLDivElement | null>;
  groupDescription: string;
}

const getChats = async(groupName: string) => {
  const { data } = await api.post(apiRoutes.chat.Talk.getPastChats, {
    groupName: groupName,
  })
  return data;
}

const deleteMessage = async({removerEmail, groupName, dateToDelete, removedEmail}: {removerEmail: string, groupName: string, dateToDelete: string, removedEmail: string}) => {
  const { data } = await api.post(apiRoutes.chat.Talk.deleteMessage, {
    removerEmail: removerEmail,
    groupName: groupName,
    dateToDelete: dateToDelete,
    removedEmail: removedEmail
  }) 
  return data;
}

const Talk: FC<TalkInterface> = ({key, details, groupName, ref, groupDescription}) => {
  const scrollref = useRef<HTMLDivElement | null>(null);
  const [group, setGroup] = useState(groupName);
  const [opendetails, setOpendetails] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [allmessages, setAllmessages] = useState<groupChatMessages[]>([]);
  const [Socket, setSocket] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState(false);
  const context = useContext(MyContext);
  const adminemails = context?.adminemails;
  const webs_addr = import.meta.env.VITE_WEBS_ADDR;
  const navigate = useNavigate();

  const {mutate: getChatsMutation} = useMutation({
    mutationFn: (groupName: string) => getChats(groupName),
    onMutate: ()=>setLoading(true),
    onSuccess: (data) => {
      setLoading(false);
      setAllmessages(data);
    },
    onError: ()=>{
      setLoading(false);
      console.log("No Messages Found")
    }
  })

  const { mutate: deleteMessageMutation } = useMutation({
    mutationFn: ({removerEmail, groupName, dateToDelete, removedEmail}: {removerEmail: string, groupName: string, dateToDelete: string, removedEmail: string}) => deleteMessage({removerEmail, groupName, dateToDelete, removedEmail}),
    onSuccess: () => {
      toast.success("Message Deleted Successfully");
    },
    onError: ()=>{
      toast.error("Failed to Delete Message")
    }
  })

  useEffect(() => {
    if (scrollref.current) {
      scrollref.current.scrollTop = scrollref.current.scrollHeight;
    }
  }, [allmessages]);

  useEffect(() => {
    const ws = new WebSocket(`${webs_addr}`);
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
    if(group){
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault(); // Prevents the page from refreshing

    if (Socket) {
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
          timeout: 60_000
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
      const socketData: {[key: string]: string | number} = {};
      formdata.forEach((val, key) => {
        socketData[key] = val as string;
      });
      Socket.send(JSON.stringify(socketData));
    }
    setMessage("");
    setFile(undefined);
  };

  const handleDelete = async (posts: groupChatMessages, index: number) => {
    confirmAlert({
      title: 'Confirmation To Delete Message',
      message: 'Do you want to Delete this Message from this Group ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteMessageMutation({removerEmail: details.email, groupName: group!, dateToDelete: posts.date, removedEmail: posts.email});
            setAllmessages((prevMessages) =>
              prevMessages.filter((_, i) => i !== index)
            );
          }
        },
        {
          label: 'No',
          onClick: () => {
            toast.error("Deletion Cancelled");
          }
        }
      ]
    })
  };

  if (loading) {
    return (
      <div className="bg-black h-[90vh] w-screen flex justify-center items-center text-white  text-4xl">
        Loading ...
      </div>
    );
  }
  if (groupName == null) {
    return (
      <div
        className="flex flex-col bg-gray-900 w-full h-[90vh] justify-center items-center text-4xl overflow-y-auto wp_body rounded-lg shadow-md scrollbar-thin text-white"
        style={{ height: "78vh", borderRadius: "12px" }}
        ref={scrollref}
      >
        Select a group to start chatting...
      </div>
    );
  }
  if (!details.name) {
    return (
      <div className="bg-black text-white h-screen flex justify-center items-center  text-4xl">
        Please Log In
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 h-[90vh] flex">
      <div className={`flex flex-col ${opendetails ? "w-[80%]" : "w-[100%]"}`}>
        <div className="h-14 mx-12 text-2xl flex justify-between items-center text-white font-bold">
          <div className="">{groupName}</div>
          {!opendetails && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-blue-300 cursor-pointer`}
              onClick={() => setOpendetails(!opendetails)}
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
          {opendetails && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-300 cursor-pointer"
              onClick={() => setOpendetails(!opendetails)}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <div
          className="p-4 overflow-y-auto wp_body rounded-lg shadow-md scrollbar-thin"
          style={{ height: "74vh", borderRadius: "12px" }}
          ref={scrollref}
        >
          <ul className="space-y-6">
            {allmessages.map((post, index) => (
              <li
                key={index}
                className={`p-4 rounded-lg shadow-lg relative transition-all duration-300 transform ${
                  details.email === post.email
                    ? "ml-auto bg-blue-600 hover:bg-blue-800 text-white border-black"
                    : "mr-auto ml-4 bg-gray-300 hover:bg-gray-400 border-black"
                } w-1/3`}
              >
                <div className="absolute left-[-22px] top-[2px] flex items-center justify-center w-8 h-8 rounded-full bg-orange-300 text-black font-bold">
                  {post.name[0].toUpperCase()}
                </div>
                <button
                  onClick={() => handleDelete(post, index)}
                  className={`absolute top-2 right-1 text-white hover:text-red-500 transition ${
                    details.email === post.email ||
                    adminemails?.includes(details.email)
                      ? ""
                      : "hidden"
                  }`}
                  aria-label="Delete message"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <div className="overflow-auto scrollbar-thin">
                  <div className="flex flex-col sm:flex-row justify-between w-full my-1">
                    <div className="text-sm my-1">
                      <div>{post.name}</div>
                    </div>
                  </div>
                  <p style={{ whiteSpace: "pre-line" }} className={``}>
                    {post.message.startsWith('http') || post.message.startsWith('https') ? <a href={post.message} className="underline" target="_blank" rel="noopener noreferrer">{post.message}</a> : post.message}
                  </p>
                  {post.image && !post.image.endsWith(".pdf") && (
                    <img
                      className="mt-4 rounded-lg"
                      src={`${post.image}`}
                      alt="File not found"
                      style={{ maxHeight: 300 }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.style.display = "none"; // Hide image if not found
                      }}
                    />
                  )}
                  {post.image && post.image.endsWith(".pdf") && (
                    <div
                      className="relative cursor-pointer"
                      onClick={() => {
                        handlePdfClick(post.image ?? "");
                      }}
                    >
                      <PdfPreview
                        pdfUrl={post.image}
                      />
                      <div className="absolute bottom-0 h-20 opacity-85 w-fit bg-black text-white flex justify-center items-center font-xl  p-2 rounded-lg">
                        {post.image_title}
                      </div>
                    </div>
                  )}

                  <div className=" flex justify-end mt-2">{post.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-auto">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              handleSubmit(e); // Pass the event to handleSubmit
            }}
          >
            <div className="grid grid-cols-[3%,60%,3%] gap-4 h-8 justify-center">
              <div className="relative flex items-center cursor-pointer w-full bg-blue-800 rounded-lg hover:bg-blue-700 transition duration-200">
                <input
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="text-white py-2 px-1 text-center w-full cursor-pointer">
                  {file?.name ? (
                    <>{file.name}</>
                  ) : (
                    <>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </>
                  )}
                </div>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg resize-none scrollbar-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                className="p-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.1"
                  x="0px"
                  y="0px"
                >
                  <title>send</title>
                  <path
                    fill="currentColor"
                    d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      {opendetails && (
        <Group_Members
          key={groupName!}
          groupName={groupName!}
          details={details}
          groupDescription={groupDescription}
        />
      )}
    </div>
  );
};

export default Talk;
