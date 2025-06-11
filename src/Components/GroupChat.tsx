import React, { useEffect, useState, useContext, useRef } from "react";
import { MyContext } from "../main";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import Talk from "./Talk";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";

function GroupChat(props) {
  const [fs, setfs] = useState(false)
  const fullscreenref = useRef(null)
  const scrollref = useRef<HTMLDivElement | null>(null);
  const [groupdescription, setGroupdescription] = useState("");
  const [groupname, setGroupname] = useState("");
  const [number, setNumber] = useState(-1);
  const [name, setName] = useState("");
  const context = useContext(MyContext);
  const adminemails = context?.adminemails
  const [groupnumbers, setGroupnumbers] = useState([]);

  useEffect(() => {
    const output = async () => {
      const response = await api.post(apiRoutes.chat.groupChat.getGroups, {
          email: props.details.email,
        });
      if (response.status === 200) {
        const resp = response.data
        const grouplist = resp.list;
        const combinedset = new Set(grouplist.concat(groupnumbers));
        setGroupnumbers([...combinedset].sort((a, b) => a.id - b.id));
      }
      if (scrollref.current) {
        scrollref.current.scrollTop = scrollref.current.scrollHeight;
      }
    };
    output();
  }, []);

  const handleaddclick = async (event) => {
    if (groupname.length == 0) {
      toast.error("Give a name");
      return;
    }
    setGroupname("");
    event.target.disabled = true;
    const response = await api.post(apiRoutes.chat.groupChat.addGroup, {
        id_num: groupnumbers[groupnumbers.length - 1].id + 1,
        name: groupname,
      });
    if (response.status === 200) {
      event.target.disabled = false;
      setGroupnumbers((prevNumbers) => {
        const existing_name = prevNumbers.find((val) => val.name === groupname);

        if (existing_name) {
          return prevNumbers.map((num) =>
            num.name === groupname ? { ...num, visibility: "none" } : num
          );
        } else {
          return [
            ...prevNumbers,
            {
              id_num:
                prevNumbers.length > 0
                  ? prevNumbers[prevNumbers.length - 1].id_num + 1
                  : 1,
              name: groupname,
            },
          ].sort((a, b) => a.id_num - b.id_num);
        }
      });
    } else {
      event.target.disabled = false;
      toast.error(response.statusText);
    }
  };

  const handleremoveclick = async (id) => {
    const response = await api.post(apiRoutes.chat.groupChat.removeGroup, {
        id_num: id,
      });
    if (response.status === 200) {
      setGroupnumbers((prevNumbers) =>
        prevNumbers.map((num) =>
          num.id === id ? { ...num, visibility: "hidden" } : num
        )
      );
    } else {
      toast.error(response.statusText);
    }
  };
  
  const isFullScreen = ()=>{
    setfs(document.fullscreenElement == fullscreenref.current)
  }

  const handleFullScreen = ()=>{
    isFullScreen()
    if(fs){
      document.exitFullscreen()
    }
    else{
      fullscreenref.current.requestFullscreen()
    }
  }


  return (
    <div className={`wp_body flex ${fs ? 'h-[100vh] overflow-auto' : 'min-h-[90vh]'}`} ref={fullscreenref}>
      <div className={`shadow-xl w-[35vw] p-8 bg-gray-300 overflow-auto scrollbar-thin ${fs ? 'h-[100vh]' : 'h-[90vh]'}`}>
      <div className="bg-red-400" onClick = {handleFullScreen}>FullScreen</div>
        <h2 className="text-2xl font-semibold flex justify-center mb-6">
          Group Chats
        </h2>
        <div className="space-y-4">
          {groupnumbers.map((val, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-4 py-3 border rounded-lg shadow-lg ${
                val.id === 5 && !adminemails?.includes(props.details.email)
                  ? "hidden"
                  : "bg-gray-600"
              } ${
                val.id == number ? "border border-red-800 bg-orange-500" : ""
              } ${val.visibility}`}
            >
              <img
                src={"../../../Images/Monitoring.webp"}
                alt=""
                className="rounded-full w-12"
              />
              <div
                onClick={() => {
                  setNumber(val.id);
                  setName(val.name);
                  setGroupdescription(val.description);
                }}
                className="text-lg py-3 text-white font-medium hover:underline hover:scale-105 transition-transform cursor-pointer w-[50%]"
              >
                {val.name}
              </div>
              {groupnumbers.length > 1 && (
                <div className="">
                  <button
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition"
                    onClick={() => handleremoveclick(val.id)}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {adminemails?.includes(props.details.email) && (
          <div className="flex">
            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              onClick={handleaddclick}
            >
              Add Group
            </button>
            <input
              type="text"
              className="mt-6 px-2 mx-4 rounded-lg py-2 border border-gray-800"
              placeholder="Enter name of group"
              name="Input box"
              value={groupname}
              onChange={(e) => {
                setGroupname(e.target.value);
              }}
            />
          </div>
        )}
      </div>
      <Talk
        key={number}
        details={props.details}
        groupnumber={number}
        groupname={name}
        ref={scrollref}
        groupdescription={groupdescription}
      />
    </div>
  );
}

export default GroupChat;
