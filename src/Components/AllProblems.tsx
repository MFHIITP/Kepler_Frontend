import React, { useEffect, useState } from "react";
import { userdetails } from "./Interfaces/Details.interface";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  Search,
  Filter,
  ChevronRight,
  Star,
  Calendar,
  Code2,
  Zap,
  Trophy,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AllProblemsInterface {
  details: userdetails | undefined;
}

interface problemInterface {
  id: number;
  name: string;
  difficulty: string;
  topics: string[];
}
interface AllProblemsTypeInterface {
  problemList: problemInterface[];
  dailyProblem: problemInterface;
  streak: number,
  keplerBits: number,
  solved: number
}

const getAllProblems = async ({ email, problemName, filter, problemLevel}: { email: string; problemName: string; filter: string[]; problemLevel: string[] }): Promise<AllProblemsTypeInterface | null> => {
  const { data } = await api.post<AllProblemsTypeInterface>(`${apiRoutes.problems.getAllProblems}/${problemName}`, {
      emailId: email,
      filter: filter,
      problemLevel: problemLevel,
    });
  return data;
};

const AllProblems: React.FC<AllProblemsInterface> = ({ details }) => {
  const [problemSet, setProblemSet] = useState<problemInterface[]>([]);
  const [dailyProblem, setDailyProblem] = useState<problemInterface | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [problemLevel, setProblemLevel] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [streakValue, setstreakValue] = useState(0)
  const [keplerBitsValue, setKeplerBitsValue] = useState(0);
  const [solved, setSolved] = useState(0)
  const navigate = useNavigate();

  const { mutate: getAllProblemsMutation } = useMutation({
    mutationFn: ({ email, problemName, filter, problemLevel }: { email: string; problemName: string; filter: string[]; problemLevel: string[] }) =>
      getAllProblems({
        email: email,
        problemName: problemName,
        filter,
        problemLevel,
      }),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setProblemSet(data?.problemList ?? []);
      setDailyProblem(data?.dailyProblem ?? null);
      setstreakValue(data?.streak ?? 0)
      setKeplerBitsValue(data?.keplerBits ?? 0)
      setSolved(data?.solved ?? 0)
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      toast.error("Failed to load problems");
    },
  });

  useEffect(() => {
    getAllProblemsMutation({
      email: details?.email ?? "",
      problemName: "",
      filter: [],
      problemLevel: [],
    });
  }, []);

  useEffect(() => {
    const delayedBounce = setTimeout(() => {
      getAllProblemsMutation({
        email: details?.email ?? "",
        problemName: search,
        filter: filter,
        problemLevel: problemLevel,
      });
    }, 200);

    return () => clearTimeout(delayedBounce);
  }, [search, filter, problemLevel]);

  const handleProblemClick = (problemName: string) => {
    navigate(`dailyProblems/${problemName}`);
  };

  const handleFilterChange = (difficulty: string) => {
    setFilter((prev) =>
      prev.includes(difficulty)
        ? prev.filter((f) => f !== difficulty)
        : [...prev, difficulty]
    );
  };
  const handleProblemLevelChange = (level: string) => {
    setProblemLevel((prev) =>
      prev.includes(level) ? prev.filter((f) => f != level) : [...prev, level]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "hard":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return <Zap className="w-4 h-4" />;
      case "medium":
        return <Clock className="w-4 h-4" />;
      case "hard":
        return <Trophy className="w-4 h-4" />;
      default:
        return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-500">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Problem Practice Hub
              </h1>
              <p className="text-gray-600 text-sm">
                Master coding challenges • Ace your interviews
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-9xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Search & Filter</h3>
              </div>

              {/* Search Input */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Difficulty Filters */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Difficulty
                  </span>
                </div>

                {["Easy", "Medium", "Hard"].map((difficulty) => (
                  <label
                    key={difficulty}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filter.includes(difficulty)}
                        onChange={() => handleFilterChange(difficulty)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                          filter.includes(difficulty)
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-gray-300 group-hover:border-blue-400"
                        }`}
                      >
                        {filter.includes(difficulty) && (
                          <ChevronRight className="w-3 h-3 text-white absolute top-0.5 left-0.5 rotate-90" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDifficultyIcon(difficulty)}
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {difficulty}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              {/* Problem Levels Filters */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Topics
                  </span>
                </div>

                {[
                  "String",
                  "Array",
                  "Dynamic Programming",
                  "Greedy",
                  "Tree",
                  "Graph",
                  "Stack",
                  "Queue",
                  "Trie",
                  "Math",
                ].map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={problemLevel.includes(level)}
                        onChange={() => handleProblemLevelChange(level)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                          problemLevel.includes(level)
                            ? "bg-indigo-600 border-indigo-600"
                            : "bg-white border-gray-300 group-hover:border-indigo-400"
                        }`}
                      >
                        {problemLevel.includes(level) && (
                          <ChevronRight className="w-3 h-3 text-white absolute top-0.5 left-0.5 rotate-90" />
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 px-6 py-4 border-b border-gray-200/50">
                <h2 className="text-lg font-semibold text-gray-900">
                  All Problems
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {problemSet.length} problems available
                </p>
              </div>

              <div className="divide-y divide-gray-200/40 backdrop-blur-sm">
                {problemSet.map((problem, index) => (
                  <div
                    className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
                    key={index}
                    onClick={() => handleProblemClick(problem.name)}
                  >
                    {/* Gradient background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative p-6 bg-white/60 backdrop-blur-sm border border-gray-200/50 group-hover:border-blue-200/60 group-hover:bg-white/80 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          {/* Problem ID */}
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-100 via-white to-slate-50 border border-gray-200/60 rounded-xl flex items-center justify-center font-bold text-gray-800 text-sm shadow-sm group-hover:shadow-md group-hover:border-blue-300/60 transition-all duration-300">
                              {problem.id}
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                          </div>

                          {/* Problem Info */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-700 transition-colors duration-200 mb-1">
                              {problem.name}
                            </h3>

                            {/* Topics */}
                            <div className="flex flex-wrap gap-2 mt-3">
                              {problem.topics.map((topic, topicIndex) => (
                                <span
                                  key={topicIndex}
                                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100/80 text-gray-700 border border-gray-200/50 group-hover:bg-blue-50/80 group-hover:text-blue-700 group-hover:border-blue-200/50 transition-all duration-200"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right side - Difficulty and Arrow */}
                        <div className="flex items-center gap-4 ml-6">
                          <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border shadow-sm transition-all duration-200 ${getDifficultyColor(
                              problem.difficulty
                            )}`}
                          >
                            {getDifficultyIcon(problem.difficulty)}
                            {problem.difficulty}
                          </span>

                          <div className="w-8 h-8 rounded-full bg-gray-100/80 border border-gray-200/50 flex items-center justify-center group-hover:bg-blue-100/80 group-hover:border-blue-300/50 transition-all duration-200">
                            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading State */}
                {loading && (
                  <div className="flex items-center justify-center py-16">
                    <div className="relative">
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 border-t-blue-500"></div>
                          <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse"></div>
                        </div>
                        <div>
                          <span className="text-base font-medium">
                            Loading problems...
                          </span>
                          <div className="flex gap-1 mt-1">
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!loading && problemSet.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 via-white to-gray-50 border-2 border-gray-200/60 rounded-2xl flex items-center justify-center shadow-lg">
                        <Code2 className="w-10 h-10 text-gray-400" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-xl opacity-60"></div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        No problems found
                      </h3>
                      <p className="text-gray-500 max-w-sm">
                        We couldn't find any problems matching your criteria.
                        Try adjusting your search or filters to discover more
                        challenges.
                      </p>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Daily Problem Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-200" />
                  <h3 className="font-semibold text-white">Daily Challenge</h3>
                  <Star className="w-4 h-4 text-yellow-300 ml-auto" />
                </div>

                {dailyProblem ? (
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-white mb-1">
                        #{dailyProblem.id}
                      </div>
                      <h4 className="font-medium text-white mb-2">
                        {dailyProblem.name}
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30`}
                      >
                        {getDifficultyIcon(dailyProblem.difficulty)}
                        {dailyProblem.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() => handleProblemClick(dailyProblem.name)}
                      className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-white/30 hover:border-white/50 flex items-center justify-center gap-2"
                    >
                      Start Challenge
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Clock className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                    <p className="text-blue-100 text-sm">
                      Loading daily challenge...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="font-semibold text-gray-900 mb-4">
                Your Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Submissions</span>
                  <span className="font-semibold text-gray-900">{solved}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-semibold text-gray-900">--%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Streak</span>
                  <span className="font-semibold text-gray-900">{streakValue} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Kepler Bits</span>
                  <span className="font-semibold text-gray-900">{keplerBitsValue} days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProblems;
