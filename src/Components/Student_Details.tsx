import React, { useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";

function Student_Details(props) {
  const [newname, setNewname] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [newphone, setNewphone] = useState("");
  const [newcollege, setNewcollege] = useState("");
  const [newcollege_year, setNewcollege_year] = useState("");
  const [newcollege_stream, setNewcollege_stream] = useState("");
  const [newschool, setNewschool] = useState("");
  const [newschool_year, setNewschool_year] = useState("");

  const [changename, setChangename] = useState(false);
  const [changepassword, setChangepassword] = useState(false);
  const [changephone, setChangephone] = useState(false);
  const [changecollege, setChangecollege] = useState("");
  const [changecollege_year, setChangecollege_year] = useState("");
  const [changecollege_stream, setChangecollege_stream] = useState("");
  const [changeschool, setChangeschool] = useState("");
  const [changeschool_year, setChangeschool_year] = useState("");
  const serv_addr = import.meta.env.VITE_SERV_ADDR;

  const handleupdate = async (type, val) => {
    const response = await api.post(apiRoutes.user.updateProfile, {
        email: props.details.email,
        old: type,
        name: val,
      });
    if (response.status === 200) {
      const data = await response.data;
      document.cookie = `ProfileInfo=${encodeURIComponent(
        "j:" + JSON.stringify(data.profileinfo)
      )}; path=/; domain=${
        window.location.hostname
      }; secure=true; sameSite=None;`;
      window.location.reload();
    } else {
      console.log("Internal Server Error");
    }
  };

  const handleremove = async () => {
    alert("Are you sure you want to remove your profile?");
    const response = await api.post(apiRoutes.user.removeProfile, {
        email: props.details.email,
      });
    if (response.status === 200) {
      document.cookie = `Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = `ProfileInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      localStorage.setItem("toast_message", "Account Removed Succfully!");
      window.location.href = "/";
    }
  };

  return (
    <div className="text-white rounded-lg shadow-lg shadow-gray-900 w-full max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold my-4 pt-2 text-center text-black underline">
        Profile Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* Name */}
        <div className="bg-gray-800 p-4 rounded-lg my-4">
          <div className="flex justify-between">
            <p className="font-semibold">Name:</p>
            <span
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
              onClick={() => setChangename(!changename)}
            >
              {changename ? "Cancel" : "Edit"}
            </span>
          </div>
          {!changename ? (
            <p className="mt-2 bg-gray-700 p-2 rounded">{props.details.name}</p>
          ) : (
            <div>
              <input
                type="text"
                value={newname}
                onChange={(e) => setNewname(e.target.value)}
                className="w-full mt-2 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className="block mt-2 text-green-400 hover:text-green-500 cursor-pointer text-sm"
                onClick={() => handleupdate("name", newname)}
              >
                Submit
              </span>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="bg-gray-800 p-4 rounded-lg my-4">
          <p className="font-semibold">Email:</p>
          <p className="mt-2 bg-gray-700 p-2 rounded">{props.details.email}</p>
        </div>

        {/* Password */}
        <div className={`bg-gray-800 p-4 rounded-lg my-4 ${props.details.college_name === undefined && props.details.school_name === undefined ? '' : 'hidden'}`}>
          <div className="flex justify-between">
            <p className="font-semibold">Password:</p>
            <span
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
              onClick={() => setChangepassword(!changepassword)}
            >
              {changepassword ? "Cancel" : "Edit"}
            </span>
          </div>
          {!changepassword ? (
            <p className="mt-2 bg-gray-700 p-2 rounded">
              {props.details.password}
            </p>
          ) : (
            <div>
              <input
                type="password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                className="w-full mt-2 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className="block mt-2 text-green-400 hover:text-green-500 cursor-pointer text-sm"
                onClick={() => handleupdate("password", newpassword)}
              >
                Submit
              </span>
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="bg-gray-800 p-4 rounded-lg my-4">
          <div className="flex justify-between">
            <p className="font-semibold">Phone:</p>
            <span
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
              onClick={() => setChangephone(!changephone)}
            >
              {changephone ? "Cancel" : "Edit"}
            </span>
          </div>
          {!changephone ? (
            <p className="mt-2 bg-gray-700 p-2 rounded">
              {props.details.phone}
            </p>
          ) : (
            <div>
              <input
                type="text"
                value={newphone}
                onChange={(e) => setNewphone(e.target.value)}
                className="w-full mt-2 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className="block mt-2 text-green-400 hover:text-green-500 cursor-pointer text-sm"
                onClick={() => handleupdate("phone", newphone)}
              >
                Submit
              </span>
            </div>
          )}
        </div>
        {/* College */}
        <div
          className={`bg-gray-800 p-4 rounded-lg my-4 ${
            props.details.school === undefined ? "" : "hidden"
          } `}
        >
          <div className="flex justify-between">
            <p className="font-semibold">College:</p>
            <span
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
              onClick={() => setChangecollege(!changecollege)}
            >
              {changecollege ? "Cancel" : "Edit"}
            </span>
          </div>
          {!changecollege ? (
            <p className="mt-2 bg-gray-700 p-2 rounded">
              {props.details.college_name}
            </p>
          ) : (
            <div>
              <input
                type="text"
                value={newcollege}
                onChange={(e) => setNewcollege(e.target.value)}
                className="w-full mt-2 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className="block mt-2 text-green-400 hover:text-green-500 cursor-pointer text-sm"
                onClick={() => handleupdate("college", newcollege)}
              >
                Submit
              </span>
            </div>
          )}
        </div>
        {/* College Stream */}
        <div
          className={`bg-gray-800 p-4 rounded-lg my-4 ${
            props.details.school === undefined ? "" : "hidden"
          } `}
        >
          <div className="flex justify-between">
            <p className="font-semibold">College Stream:</p>
            <span
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
              onClick={() => setChangecollege_stream(!changecollege_stream)}
            >
              {changecollege_stream ? "Cancel" : "Edit"}
            </span>
          </div>
          {!changecollege_stream ? (
            <p className="mt-2 bg-gray-700 p-2 rounded">
              {props.details.college_stream}
            </p>
          ) : (
            <div>
              <select
                value={newcollege_stream}
                onChange={(e) => setNewcollege_stream(e.target.value)}
                className="w-full mt-2 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select College Stream</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              <span
                className="block mt-2 text-green-400 hover:text-green-500 cursor-pointer text-sm"
                onClick={() =>
                  handleupdate("college_stream", newcollege_stream)
                }
              >
                Submit
              </span>
            </div>
          )}
        </div>
        {/* College Year */}
        <div
          className={`bg-gray-800 p-4 rounded-lg my-4 ${
            props.details.school === undefined &&
            props.details.college_stream !== "PhD"
              ? ""
              : "hidden"
          } `}
        >
          <div className="flex justify-between">
            <p className="font-semibold">College Year:</p>
            <span
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
              onClick={() => setChangecollege_year(!changecollege_year)}
            >
              {changecollege_year ? "Cancel" : "Edit"}
            </span>
          </div>
          {!changecollege_year ? (
            <p className="mt-2 bg-gray-700 p-2 rounded">
              {props.details.college_year}
            </p>
          ) : (
            <div>
              <select
                value={newcollege_year}
                onChange={(e) => setNewcollege_year(e.target.value)}
                className="w-full mt-2 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select College Year</option>
                {props.details.college_stream === "Bachelor's" &&
                  ["1st", "2nd", "3rd", "4th", "5th"].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                {props.details.college_stream === "Master's" &&
                  ["1st", "2nd"].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
              <span
                className="block mt-2 text-green-400 hover:text-green-500 cursor-pointer text-sm"
                onClick={() => handleupdate("college_year", newcollege_year)}
              >
                Submit
              </span>
            </div>
          )}
        </div>

        {/* School */}
        <div
          className={`bg-gray-800 p-4 rounded-lg my-4 ${
            props.details.college_name === undefined ? "" : "hidden"
          } `}
        >
          <div className="flex justify-between">
            <p className="font-semibold">School:</p>
            <span
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
              onClick={() => setChangeschool(!changeschool)}
            >
              {changeschool ? "Cancel" : "Edit"}
            </span>
          </div>
          {!changeschool ? (
            <p className="mt-2 bg-gray-700 p-2 rounded">
              {props.details.school_name}
            </p>
          ) : (
            <div>
              <input
                type="text"
                value={newschool}
                onChange={(e) => setNewschool(e.target.value)}
                className="w-full mt-2 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className="block mt-2 text-green-400 hover:text-green-500 cursor-pointer text-sm"
                onClick={() => handleupdate("school", newschool)}
              >
                Submit
              </span>
            </div>
          )}
        </div>
        {/* School Year */}
        <div
          className={`bg-gray-800 p-4 rounded-lg my-4 ${
            props.details.college_name === undefined ? "" : "hidden"
          } `}
        >
          <div className="flex justify-between">
            <p className="font-semibold">School Year:</p>
            <span
              className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
              onClick={() => setChangeschool_year(!changeschool_year)}
            >
              {changeschool_year ? "Cancel" : "Edit"}
            </span>
          </div>
          {!changeschool_year ? (
            <p className="mt-2 bg-gray-700 p-2 rounded">
              {props.details.school_year}
            </p>
          ) : (
            <div>
              <select
                value={newschool_year}
                onChange={(e) => setNewschool_year(e.target.value)}
                className="w-full mt-2 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select School Year</option>
                {[9, 10, 11, 12].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <span
                className="block mt-2 text-green-400 hover:text-green-500 cursor-pointer text-sm"
                onClick={() => handleupdate("school_year", newschool_year)}
              >
                Submit
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Remove Profile Button */}
      <div className="flex justify-center mt-5 pb-2">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleremove}
        >
          Remove Profile
        </button>
      </div>
    </div>
  );
}

export default Student_Details;
