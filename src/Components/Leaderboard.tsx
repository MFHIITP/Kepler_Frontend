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

const Leaderboard: React.FC<leaderboardInterface> = ({ details }) => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">🏆 Leaderboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm mb-1">🎓 College Rank</p>
            <p className="text-3xl font-semibold text-blue-600">#{leaderboardDetails?.instituteRank ?? '-'}</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm mb-1">🌐 Overall Rank</p>
            <p className="text-3xl font-semibold text-blue-600">#{leaderboardDetails?.overallRank ?? '-'}</p>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name or institute"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            onChange={(e) => setParam(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-600">Rank</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Institute</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Solved</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Highest Streak</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {[...Array(5)].map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                : leaderboardDetails?.rankList.map((entry, index) => {
                    let rankDisplay: string | number = index + 1
                    if (rankDisplay === 1) rankDisplay = '🥇'
                    else if (rankDisplay === 2) rankDisplay = '🥈'
                    else if (rankDisplay === 3) rankDisplay = '🥉'

                    return (
                      <tr
                        key={index}
                        className={`border-b transition hover:bg-gray-50 ${
                          entry.email === details.email ? 'bg-yellow-50 font-semibold' : ''
                        }`}
                      >
                        <td className="px-6 py-4">{rankDisplay}</td>
                        <td className="px-6 py-4">{entry.name}</td>
                        <td className="px-6 py-4">{entry.college ?? entry.school}</td>
                        <td className="px-6 py-4">{entry.numberSolved}</td>
                        <td className="px-6 py-4">{entry.highestStreak}</td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard