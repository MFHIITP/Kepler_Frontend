import React, { useEffect, useRef, useState } from "react";
import { componentPropsInterface } from "../Interfaces/ComponentProps.interface";
import api from "../../utils/api";
import apiRoutes from "../../utils/Routes/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { problemInterface } from "../Interfaces/problem.interface";
import IDEPage from "./IDEPage";
import { commentDataInterface } from "../Interfaces/CommentData.interface";
import toast from "react-hot-toast";
import { Clock, MessageSquare, Code2, Trophy, CheckCircle2, XCircle, AlertCircle, Send, User, Calendar, Zap, Target, Timer, HardDrive } from "lucide-react";
import { useParams } from "react-router-dom";

const webSocketAddress = import.meta.env.VITE_WEBS_ADDR

const getProblem = async ({problemName}: {problemName: string}): Promise<problemInterface> => {
  const { data } = await api.get<problemInterface>(`${apiRoutes.problems.getProblem}/${problemName}`);
  return data;
};

const fetchComments = async(problem_name: string) => {
  const { data } = await api.post(apiRoutes.problems.getComments, {
    problem_name: problem_name,
  });
  return data;
}

const DailyProblemsPage: React.FC<componentPropsInterface> = ({ details }) => {
  const [format, setFormat] = useState<"problem" | "comment">("problem");
  const [commentData, setCommentData] = useState<commentDataInterface[] | []>([])
  const [comment, setComment] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [loading, setLoading] = useState(false);
  const [dailyProblemStatus, setDailyProblemStatus] = useState<string>("");
  const {problemName} = useParams();
  const wsRef = useRef<WebSocket | null>(null);

  const {data: problem, isLoading, isError} = useQuery({
    queryKey: ["dailyProblem"],
    queryFn: () => getProblem({ problemName: problemName ?? "" }),
  });

  useEffect(() => {
    
  }, [])
  

  useEffect(() => {
    if(wsRef.current){
      return;
    }

    const ws = new WebSocket(webSocketAddress);
    wsRef.current = ws;

    setSocket(ws);
    ws.onmessage = async(event) => {
      const data = await JSON.parse(event.data);
      setCommentData((prevComments) => [data, ...prevComments]);
    }
    return () => {
      ws.close();
    }
  }, [webSocketAddress])

  const {mutate: getCommentsMutation} = useMutation({
    mutationFn: (problem_name: string) => fetchComments(problem_name),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLoading(false);
      setCommentData(data);
    }
  })

  const handlePostClick = () => {
    if(comment == ""){
      return;
    }
    if(socket){
      const postData = {
        format: 'commentPost',
        problem_name: problem?.name,
        name: details?.name,
        date: new Date().toLocaleString("en-IN"),
        message: comment,
        email: details?.email
      }
      socket.send(JSON.stringify(postData));
    }
    setComment("");
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "from-emerald-500 to-teal-500";
      case "Medium": return "from-amber-500 to-orange-500";
      case "Hard": return "from-rose-500 to-red-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "from-emerald-500 to-teal-500";
      case "Wrong Answer": return "from-rose-500 to-red-500";
      case "Time Limit Exceeded": return "from-amber-500 to-orange-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="text-white text-lg font-medium">Loading Daily Challenge...</span>
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 font-inter">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Panel - Problem & Comments */}
          <div className="lg:w-[40%]">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-auto h-[86vh]">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-white">Daily Challenge</h1>
                      <p className="text-blue-200 text-sm">Problem of the Day</p>
                    </div>
                  </div>
                  
                  {/* Status & Difficulty */}
                  <div className="flex items-center space-x-3">
                    {dailyProblemStatus !== "" && (
                      <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getStatusColor(dailyProblemStatus)} shadow-lg`}>
                        <div className="flex items-center space-x-1 text-white text-sm font-semibold">
                          {dailyProblemStatus === "Accepted" ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          <span>{dailyProblemStatus}</span>
                        </div>
                      </div>
                    )}
                    
                    {problem?.difficulty && (
                      <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getDifficultyColor(problem.difficulty)} shadow-lg`}>
                        <div className="flex items-center space-x-1 text-white text-sm font-semibold">
                          <AlertCircle className="w-4 h-4" />
                          <span>{problem.difficulty}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-1 bg-white/5 rounded-xl p-1">
                  <button
                    onClick={() => setFormat("problem")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      format === "problem"
                        ? "bg-white/20 text-white shadow-lg"
                        : "text-blue-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Problem</span>
                  </button>
                  <button
                    onClick={() => {setFormat("comment"); getCommentsMutation(problem?.name ?? "")}}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      format === "comment"
                        ? "bg-white/20 text-white shadow-lg"
                        : "text-blue-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Comments</span>
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-hidden">
                {/* Problem Content */}
                {format === "problem" && (
                  <div className="h-full overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {problem?.name}
                      </h2>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-semibold text-lg text-blue-300 mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Problem Description
                      </h3>
                      <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">
                        {problem?.description}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h3 className="font-semibold text-lg text-green-300 mb-2">Input Format</h3>
                        <p className="text-gray-100 font-mono bg-black/20 p-3 rounded-lg">{problem?.inputFormat}</p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h3 className="font-semibold text-lg text-purple-300 mb-2">Output Format</h3>
                        <p className="text-gray-100 font-mono bg-black/20 p-3 rounded-lg">{problem?.outputFormat}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-semibold text-lg text-orange-300 mb-3 flex items-center">
                        <Timer className="w-5 h-5 mr-2" />
                        Constraints
                      </h3>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                          <span className="text-gray-300 flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Time Complexity:
                          </span>
                          <span className="text-white font-mono">{problem?.constraintsTime}</span>
                        </div>
                        <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                          <span className="text-gray-300 flex items-center">
                            <HardDrive className="w-4 h-4 mr-2" />
                            Space Complexity:
                          </span>
                          <span className="text-white font-mono">{problem?.constraintsSpace}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-semibold text-lg text-cyan-300 mb-4 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Test Cases
                      </h3>
                      <div className="space-y-3">
                        {problem?.displayTestCases.map((test, key) => (
                          <div
                            key={key}
                            className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg p-4 hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-200"
                          >
                            <div className="space-y-2">
                              <div>
                                <span className="font-semibold text-emerald-300">Input:</span>
                                <div className="mt-1 bg-black/30 p-2 rounded font-mono text-sm text-gray-100">
                                  {Object.entries(test.input).map(([key, val]) => (
                                    <div key={key}>
                                      {key}: {val}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="font-semibold text-teal-300">Output:</span>
                                <div className="mt-1 bg-black/30 p-2 rounded font-mono text-sm text-gray-100">
                                  {`${test.outputReal}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                {format === "comment" && (
                  <div className="h-[64vh] flex flex-col">
                    {/* Comments List */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                      {commentData.length > 0 ? (
                        <div className="space-y-4">
                          {commentData.map((comment, index) => (
                            <div key={index} className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-4 hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-200">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="font-semibold text-pink-300">{comment.name}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                                  <Calendar className="w-3 h-3" />
                                  <span>{comment.date}</span>
                                </div>
                              </div>
                              <p className="text-gray-100 leading-relaxed whitespace-pre-wrap pl-10">
                                {comment.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">No comments yet</p>
                            <p className="text-gray-500 text-sm">Be the first one to share your thoughts!</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Comment Input */}
                    <div className="border-t border-white/10 p-4 bg-white/5">
                      <div className="flex items-end space-x-3">
                        <div className="flex-1">
                          <textarea
                            name="commentText"
                            value={comment}
                            placeholder="Share your thoughts, approach, or ask questions..."
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none transition-all duration-200"
                            rows={3}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <button
                          onClick={handlePostClick}
                          disabled={!comment.trim()}
                          className={`p-3 rounded-xl font-semibold transition-all duration-200 ${
                            comment.trim()
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg"
                              : "bg-gray-600 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - IDE */}
          <div className="lg:w-[65%]">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
              {!isLoading && (
                <IDEPage problem={problem} email={details?.email} name={details?.name}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyProblemsPage;