import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userdetails } from "./Interfaces/Details.interface";
import { Link } from "react-router-dom"; // Assuming you're using React Router

interface CodingDetailsInterface {
  details: userdetails | undefined;
  goToPage: Dispatch<SetStateAction<string>>;
}

interface userCodingDetails {
  email: string;
  name: string;
  streak: number;
  highestStreak: number;
  lastSolved: Date;
  numberSolved: number;
  keplerBits: number;
  submissions: {
    name: string;
    date: Date;
    difficulty: string;
    status: string;
  }[];
}

const fetchUserCodingDetails = async (
  emailId: string
): Promise<userCodingDetails> => {
  const { data } = await api.post<userCodingDetails>(
    apiRoutes.problems.codingProfile,
    {
      email: emailId,
    }
  );
  return data;
};

const CodingDetails: React.FC<CodingDetailsInterface> = ({ details, goToPage }) => {
  const [codingDetails, setCodingDetails] = useState<userCodingDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const { mutate: codingDetailsMutation } = useMutation({
    mutationFn: (emailId: string) => fetchUserCodingDetails(emailId),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLoading(false);
      setCodingDetails(data);
    },
    onError: () => {
      setLoading(false);
      toast.error("Failed to Load Coding Details. Please refresh");
    },
  });

  useEffect(() => {
    codingDetailsMutation(details?.email || "");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📊 Code Tracker</h1>
        <div className="text-blue-600 hover:underline text-sm font-medium cursor-pointer" onClick={() => goToPage("leaderboard")}>
          🔥 View Leaderboard
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {codingDetails?.name}
        </h2>
        <p className="text-sm text-gray-500">{codingDetails?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 h-[20vh]">
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center justify-center">
          <p className="text-gray-500">🔥 Current Streak</p>
          <p className="text-2xl font-bold text-orange-500">
            {codingDetails?.streak} Days
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center justify-center">
          <p className="text-gray-500">🏆 Highest Streak</p>
          <p className="text-2xl font-bold text-green-600">
            {codingDetails?.highestStreak} Days
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center justify-center">
          <p className="text-gray-500">💡 Kepler Bits</p>
          <p className="text-2xl font-bold text-purple-600">
            {codingDetails?.keplerBits}
          </p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📄 Submission History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 border-b bg-gray-50">
                <th className="p-3 rounded-tl-lg">#</th>
                <th className="p-3">Problem</th>
                <th className="p-3">Difficulty</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-tr-lg">Date</th>
              </tr>
            </thead>
            <tbody>
              {codingDetails?.submissions.map((submission, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium text-gray-700">
                    {submission.name}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        submission.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : submission.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {submission.difficulty}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        submission.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(submission.date).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CodingDetails;
