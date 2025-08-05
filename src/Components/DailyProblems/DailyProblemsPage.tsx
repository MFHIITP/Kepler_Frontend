import React, { useState } from "react";
import { componentPropsInterface } from "../Interfaces/ComponentProps.interface";
import api from "../../utils/api";
import apiRoutes from "../../utils/Routes/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { problemInterface } from "../Interfaces/problem.interface";
import IDEPage from "./IDEPage";

const getProblem = async (): Promise<problemInterface> => {
  const { data } = await api.get<problemInterface>(apiRoutes.problems.getProblem);
  return data;
};

const DailyProblemsPage: React.FC<componentPropsInterface> = ({ details }) => {
  const {data: problem, isLoading, isError} = useQuery({
    queryKey: ["dailyProblem"],
    queryFn: getProblem,
  });

  if(isLoading){
    return (
      <div className="justify-center">
        Loading
      </div>
    )
  }

  return (
    <div className="h-[88vh] bg-gray-50 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-[35%] bg-white shadow-md rounded-xl p-4 relative overflow-y-auto h-[88vh] scrollbar-thin">
          <div
            className={`absolute top-4 left-2 py-1 px-2 rounded-md text-sm font-semibold ${
              problem?.difficulty == "Easy"
                ? "bg-green-200 text-green-800"
                : "hidden"
            }`}
          >
            {problem?.difficulty}
          </div>
          <div
            className={`absolute top-4 left-2 py-1 px-2 rounded-md text-sm font-semibold ${
              problem?.difficulty == "Medium"
                ? " bg-yellow-200 text-yellow-800"
                : "hidden"
            }`}
          >
            {problem?.difficulty}
          </div>
          <div
            className={`absolute top-4 left-2 py-1 px-2 rounded-md text-sm font-semibold ${
              problem?.difficulty == "Hard"
                ? "bg-red-200 text-red-800"
                : "hidden"
            }`}
          >
            {problem?.difficulty}
          </div>

          <div className="mt-10 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              {problem?.name}
            </h1>

            <p className="text-gray-700 whitespace-pre-wrap">
              {problem?.description}
            </p>

            <div className="text-gray-800">
              <h2 className="font-semibold text-lg">Input Format</h2>
              <p>{problem?.inputFormat}</p>
            </div>

            <div className="text-gray-800">
              <h2 className="font-semibold text-lg">Output Format</h2>
              <p>{problem?.outputFormat}</p>
            </div>

            <div className="text-gray-800">
              <h2 className="font-semibold text-lg">Constraints</h2>
              <p>Time: {problem?.constraintsTime}</p>
              <p>Space: {problem?.constraintsSpace}</p>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold text-lg">Test Cases</h2>
              {problem?.displayTestCases.map((test, key) => (
                <div
                  key={key}
                  className="bg-gray-100 border rounded-lg p-3 text-md"
                >
                  <p>
                    <span className="font-semibold">Input:</span>{" "}
                    {Object.entries(test.input).map(([key, val]) => (
                      <div key={key}>
                        {key}: {val}
                      </div>
                    ))}
                  </p>
                  <p>
                    <span className="font-semibold">Output:</span>{" "}
                    {test.outputReal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-[70%] bg-white shadow-md rounded-xl p-2 ">
          {!isLoading && <IDEPage problem={problem} email = {details?.email} name={details?.name}/>}
        </div>
      </div>
    </div>
  );
};

export default DailyProblemsPage;
