import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userdetails } from "./Interfaces/Details.interface";
import { Link } from "react-router-dom";

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

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return '🟢';
    case 'medium': return '🟡';
    case 'hard': return '🔴';
    default: return '⚪';
  }
};

const getStatusIcon = (status: string) => {
  return status === 'Accepted' ? '✅' : '❌';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading your coding journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Code Analytics Dashboard
              </h1>
            </div>
            <button 
              onClick={() => goToPage("leaderboard")}
              className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-sm">🏆</span>
              <span>Leaderboard</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Card with Advanced Styling */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">
                  {codingDetails?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                  {codingDetails?.name || 'Loading...'}
                </h2>
                <p className="text-slate-500 font-medium mb-3">{codingDetails?.email}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                    💪 {codingDetails?.numberSolved || 0} Problems Solved
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 rounded-full text-sm font-semibold border border-purple-200">
                    🚀 {codingDetails?.keplerBits || 0} Kepler Bits
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {codingDetails?.streak || 0}
                  </p>
                  <p className="text-sm text-slate-500 font-medium">Days</p>
                </div>
              </div>
              <p className="text-slate-600 font-medium">Current Streak</p>
              <p className="text-xs text-slate-400 mt-1">Keep the momentum going!</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    {codingDetails?.highestStreak || 0}
                  </p>
                  <p className="text-sm text-slate-500 font-medium">Days</p>
                </div>
              </div>
              <p className="text-slate-600 font-medium">Best Streak</p>
              <p className="text-xs text-slate-400 mt-1">Personal record achieved</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">💎</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
                    {codingDetails?.keplerBits || 0}
                  </p>
                  <p className="text-sm text-slate-500 font-medium">Points</p>
                </div>
              </div>
              <p className="text-slate-600 font-medium">Kepler Bits</p>
              <p className="text-xs text-slate-400 mt-1">Your coding currency</p>
            </div>
          </div>
        </div>

        {/* Modern Submissions Table */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-blue-100 rounded-3xl blur-2xl opacity-50"></div>
          <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Submission History</h3>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {codingDetails?.submissions?.length || 0} submissions
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                <table className="w-full">
                  <thead className="sticky top-0 bg-gradient-to-r from-slate-50 to-blue-50 backdrop-blur-sm border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">#</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Problem</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Difficulty</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {codingDetails?.submissions && codingDetails?.submissions.map((submission, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium group-hover:text-slate-700">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                              {submission.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getDifficultyIcon(submission.difficulty)}</span>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                                submission.difficulty === "Easy"
                                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                                  : submission.difficulty === "Medium"
                                  ? "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200"
                                  : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                              }`}
                            >
                              {submission.difficulty}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getStatusIcon(submission.status)}</span>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                                submission.status === "Accepted"
                                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                                  : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                              }`}
                            >
                              {submission.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                          {new Date(submission.date).toLocaleString("en-IN", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {(!codingDetails?.submissions || codingDetails.submissions.length === 0) && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-4xl opacity-50">📝</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">No submissions yet</h3>
                    <p className="text-slate-400 max-w-sm">Start solving problems to see your submission history here. Your coding journey awaits!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingDetails;