import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { userdetails } from './Interfaces/Details.interface'
import api from '../utils/api'
import apiRoutes from '../utils/Routes/apiRoutes'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface leaderboardInterface {
    details: userdetails,
    goToPage: Dispatch<SetStateAction<string>>
}

interface responseInterface {
    instituteRank: number,
    overallRank: number,
    rankList: {
        name: string,
        numberSolved: number,
        highestStreak: number,
        email: string,
        college: string,
        school: string,
        streak: number,
        keplerBits: number
    }[]
}

const getLeaderboardDetails = async({emailId, param}:{emailId: string, param: string}): Promise<responseInterface> => {
    const { data } = await api.post<responseInterface>(`${apiRoutes.problems.leaderboard}?param=${param}`, {
        email: emailId,
    })
    return data;
}

const getRankIcon = (rank: number) => {
    switch (rank) {
        case 1: return '🥇';
        case 2: return '🥈';
        case 3: return '🥉';
        default: return rank;
    }
};

const getRankStyling = (rank: number) => {
    switch (rank) {
        case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold';
        case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white font-bold';
        case 3: return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold';
        default: return 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 font-semibold';
    }
};

const Leaderboard: React.FC<leaderboardInterface> = ({ details, goToPage }) => {
    const [loading, setLoading] = useState(false);
    const [leaderboardDetails, setLeaderboardDetails] = useState<responseInterface | null>(null)
    const [param, setParam] = useState("")

    const {mutate: getLeaderboardMutation} = useMutation({
        mutationFn: ({email, param}:{email: string, param: string}) => getLeaderboardDetails({emailId: email, param: param}),
        onMutate: () => setLoading(true),
        onSuccess: (data) => {
            setLoading(false);
            setLeaderboardDetails(data);
        },
        onError: () => {
            setLoading(false);
            toast.error("Failed to fetch leaderboard. Please try again.")
        }
    })

    useEffect(() => {
      const delay = setTimeout(() => {
        getLeaderboardMutation({email: details.email ?? "", param: param})
      }, 500);

      return () => clearTimeout(delay)

    }, [param])
    

    useEffect(() => {
      getLeaderboardMutation({email: details.email ?? "", param: param});
    }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="w-screen md:max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🏆</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Global Leaderboard
              </h1>
            </div>
            <button 
              onClick={() => goToPage("keplerBoard")}
              className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-screen md:max-w-7xl mx-auto px-6 py-8">
        {/* User Rank Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">🎓</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    #{leaderboardDetails?.instituteRank ?? '-'}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Institute Rank</h3>
              <p className="text-sm text-slate-500">Your position among peers</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">🌐</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    #{leaderboardDetails?.overallRank ?? '-'}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Global Rank</h3>
              <p className="text-sm text-slate-500">Worldwide standing</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-white/20">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or institute..."
                className="block w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                onChange={(e) => setParam(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-blue-100 rounded-3xl blur-2xl opacity-50"></div>
          <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Rankings</h3>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  {leaderboardDetails?.rankList?.length || 0} competitors
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="max-h-[70vh] overflow-y-auto scrollbar-thin">
                <table className="w-full">
                  <thead className="sticky top-0 bg-gradient-to-r from-slate-50 to-blue-50 backdrop-blur-sm border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Competitor</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Institute</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Problems</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Best Streak</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading
                      ? [...Array(10)].map((_, i) => (
                          <tr key={i} className="animate-pulse">
                            <td className="px-6 py-4">
                              <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                                <div className="h-4 bg-slate-200 rounded w-24"></div>
                              </div>
                            </td>
                            <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20"></div></td>
                            <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-12"></div></td>
                            <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-12"></div></td>
                            <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-16"></div></td>
                          </tr>
                        ))
                      : leaderboardDetails?.rankList?.map((entry, index) => {
                          const rank = index + 1;
                          const isCurrentUser = entry.email === details.email;
                          
                          return (
                            <tr
                              key={index}
                              className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 group ${
                                isCurrentUser 
                                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 ring-2 ring-yellow-200 ring-inset' 
                                  : ''
                              }`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm shadow-sm ${getRankStyling(rank)}`}>
                                  {typeof getRankIcon(rank) === 'string' ? getRankIcon(rank) : `#${rank}`}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-sm">
                                      {entry.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                  </div>
                                  <div>
                                    <div className={`text-sm font-semibold ${isCurrentUser ? 'text-amber-800' : 'text-slate-800'} group-hover:text-blue-700 transition-colors duration-200`}>
                                      {entry.name}
                                      {isCurrentUser && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                          You
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-slate-600 font-medium">
                                  {entry.college || entry.school || 'Not specified'}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200">
                                    {entry.numberSolved}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <span className="text-orange-500">🔥</span>
                                  <span className="text-sm font-semibold text-slate-700">
                                    {entry.highestStreak}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <span className="text-purple-500">💎</span>
                                  <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                                    {entry.keplerBits || 0}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                  </tbody>
                </table>
                
                {(!loading && (!leaderboardDetails?.rankList || leaderboardDetails.rankList.length === 0)) && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-4xl opacity-50">🏆</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">No competitors found</h3>
                    <p className="text-slate-400 max-w-sm">
                      {param ? "Try adjusting your search terms" : "Be the first to make it to the leaderboard!"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Compete with the best minds in tech education • Rankings updated in real-time
          </p>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard