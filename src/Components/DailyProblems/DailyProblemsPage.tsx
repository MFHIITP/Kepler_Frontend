import React, { useEffect, useState } from "react";
import { componentPropsInterface } from "../Interfaces/ComponentProps.interface";
import api from "../../utils/api";
import apiRoutes from "../../utils/Routes/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { problemInterface } from "../Interfaces/problem.interface";
import IDEPage from "./IDEPage";
import { commentDataInterface } from "../Interfaces/CommentData.interface";
import toast from "react-hot-toast";
const webSocketAddress = import.meta.env.VITE_WEBS_ADDR

const todayIsSameDay = (givenDate: Date) => {
    const PastDate = new Date(givenDate);
    const today = new Date();
    PastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return PastDate.getTime() == today.getTime();
};

const getProblem = async (): Promise<problemInterface> => {
  const { data } = await api.get<problemInterface>(
    apiRoutes.problems.getProblem
  );
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

  const {data: problem, isLoading, isError} = useQuery({
    queryKey: ["dailyProblem"],
    queryFn: getProblem,
  });

  useEffect(() => {
    if(localStorage.getItem("dailyProblemDate")){
      const solutionDate = JSON.parse(localStorage.getItem("dailyProblemDate") ?? "");
      if(todayIsSameDay(solutionDate)){
        setDailyProblemStatus(localStorage.getItem("dailyProblemStatus") ?? "");
      }
      else{
        localStorage.removeItem("dailyProblemDate");
        localStorage.removeItem("dailyProblemStatus");
      }
    }
  }, [])
  

  useEffect(() => {
    const ws = new WebSocket(webSocketAddress);
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

  if (isLoading) {
    return <div className="justify-center">Loading</div>;
  }
 
  return (
    <div className="h-fit p-4 font-mono bg-blue-500">
      <div className="flex flex-col lg:flex-row gap-4 ">
        {/* Left Panel */}
        <div className="lg:w-[35%] bg-indigo-950 shadow-md rounded-xl h-[88vh] overflow-y-auto scrollbar-thin text-gray-100">
          {/* Top Bar with Tabs and Difficulty */}
          <div className="flex items-center justify-between p-4 border-b">
            {/* Difficulty Tag */}
            {["Easy", "Medium", "Hard"].map((level) => (
              <span
                key={level}
                className={`py-1 px-2 rounded-md text-sm font-semibold ${
                  problem?.difficulty === level ? level === "Easy" ? "bg-green-200 text-green-800" : level === "Medium" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800" : "hidden"
                }`}
              >
                {problem?.difficulty}
              </span>
            ))}

            {/* Tabs */}
            <div className="flex space-x-6">
              <div className="">
                {dailyProblemStatus !== "" && (
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-md ${
                      dailyProblemStatus === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dailyProblemStatus}
                  </span>
                )}
              </div>
              <button
                onClick={() => setFormat("problem")}
                className={`text-sm font-medium border-b-2 pb-1 ${
                  format === "problem"
                    ? "border-blue-100 text-blue-100"
                    : "border-transparent text-gray-300 hover:text-gray-300"
                }`}
              >
                Problem
              </button>
              <button
                onClick={() => {setFormat("comment"); getCommentsMutation(problem?.name ?? "")}}
                className={`text-sm font-medium border-b-2 pb-1 ${
                  format === "comment"
                    ? "border-blue-100 text-blue-100"
                    : "border-transparent text-gray-100 hover:text-gray-300"
                }`}
              >
                Comments
              </button>
            </div>
          </div>

          {/* Problem Content */}
          {format === "problem" && (
            <div className="p-4 space-y-4">
              <h1 className="text-2xl font-bold text-gray-100 text-center">
                {problem?.name}
              </h1>

              <p className="text-gray-100 whitespace-pre-wrap">
                {problem?.description}
              </p>

              <div className="text-gray-100">
                <h2 className="font-semibold text-lg">Input Format</h2>
                <p>{problem?.inputFormat}</p>
              </div>

              <div className="text-gray-100">
                <h2 className="font-semibold text-lg">Output Format</h2>
                <p>{problem?.outputFormat}</p>
              </div>

              <div className="text-gray-100">
                <h2 className="font-semibold text-lg">Constraints</h2>
                <p>Time: {problem?.constraintsTime}</p>
                <p>Space: {problem?.constraintsSpace}</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-semibold text-lg">Test Cases</h2>
                {problem?.displayTestCases.map((test, key) => (
                  <div
                    key={key}
                    className="bg-green-300 hover:bg-green-400 text-black border rounded-lg p-3 text-md"
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
          )}

          {/* Comments Placeholder */}
          {format === "comment" && (
            <div className="h-[88%] flex flex-col">
              <div className="flex-1 overflow-auto scrollbar-thin border-b border-gray-300 p-4 text-gray-700 text-center">
                {commentData.length > 0 ? (
                  commentData.map((comment, index) => ( 
                    <div key={index} className="bg-pink-200 hover:bg-pink-400 px-2 py-2 my-3 rounded-md flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                        <div className="">{comment.name}</div>
                        <div className="">{comment.date}</div>
                      </div>
                      <div className="text-left text-black whitespace-pre-wrap">{comment.message}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-300">💬 No comments yet. Be the first one to write!</div>
                )}
              </div>

              <div className="flex items-center gap-4 px-4 py-3 bg-indigo-950">
                <textarea
                  name="commentText"
                  value = {comment}
                  placeholder="Write your comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={handlePostClick}>
                  Post
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel - IDE */}
        <div className="lg:w-[70%] bg-blue-500 shadow-md p-2">
          {!isLoading && (
            <IDEPage problem={problem} email={details?.email} name={details?.name}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyProblemsPage;
function onError(error: Error, variables: string, context: any): unknown {
  throw new Error("Function not implemented.");
}

