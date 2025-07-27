import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";

interface LibraryResponseInterface{
  data: [string]
}

const getLibraryList = async (email: string) => {
  const { data } = await api.post<LibraryResponseInterface | null>(apiRoutes.library.getCourses, {
    emailId: email,
  });
  return data?.data;
};

const Library_main: React.FC<componentPropsInterface> = (props) => {
  const [search, setSearch] = useState<string>("");

  const { data: libraryList, isLoading, error } = useQuery({
    queryKey: ["libraryCourses", props.details?.email],
    queryFn: () => getLibraryList(props.details.email),
    staleTime: 30 * 60 * 1000,
  });

  const navigate = useNavigate();

  const filteredlist = libraryList ? libraryList.filter((val: string) =>val.toLowerCase().includes(search.toLowerCase())) : [];

  const handleclick = (course: string) => {
    navigate(`/library/resources/${course}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-4xl font-bold text-indigo-900 mb-8">
          Explore Your Library
        </h1>

        <div className="flex justify-center mb-10">
          <input
            className="px-4 py-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full max-w-md transition"
            type="text"
            placeholder="Search for your course"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredlist.map((val, index) => (
            <div
              key={index}
              onClick={() => handleclick(val)}
              className={`cursor-pointer rounded-lg p-6 ${val == 'Executive Group' ? 'bg-indigo-700 text-white text-xl font-semibold hover:bg-indigo-800' : 'bg-white'} shadow hover:shadow-xl transition hover:scale-105 border border-indigo-300 flex items-center justify-center text-2xl font-medium text-indigo-800`}
            >
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Library_main;
