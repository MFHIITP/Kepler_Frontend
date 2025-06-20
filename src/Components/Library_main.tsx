import React, { useEffect, useState } from "react";
import { librarylist } from "../lists";
import { useNavigate } from "react-router-dom";

function Library_main() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const filteredlist = librarylist.filter((val) => {
    return val.toLowerCase().includes(search.toLowerCase());
  });
  const handleclick = (course: string) => {
    navigate(`/library/resources/${course}`);
  };
  return (
    <div className="libbd h-[90vh]">
      <div className="mx-12 py-12">
        <div className="flex justify-center items-center text-3xl">
          Find your Course
        </div>
        <div className="flex flex-row gap-x-3 w-fit my-4">
          <div className="text-xl my-auto">Search</div>
          <input
            className="px-2 py-2 border border-black bg-indigo-300 rounded-lg shadow-md placeholder-white"
            type="text"
            placeholder="Type course name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6 p-2">
          {filteredlist.map((val, index) => (
            <div
              key={index}
              className="border border-red-700 rounded-lg p-4 cursor-pointer flex justify-center h-40 text-4xl bg-gray-800 text-white opacity-80 hover:shadow-blue-950 hover:shadow-2xl shadow-lg transition-transform hover:scale-105 items-center"
              onClick={() => {
                handleclick(val);
              }}
            >
              <div className="">{val}</div>
            </div>
          ))}
        </div>
        <div
          className="block mx-auto my-4 bg-gray-800 text-white transition-transform hover:scale-105 cursor-pointer items-center border border-red-700 p-4 w-fit rounded-lg"
          onClick={() => {
            handleclick("executives");
          }}
        >
          Executives
        </div>
      </div>
    </div>
  );
}

export default Library_main;
