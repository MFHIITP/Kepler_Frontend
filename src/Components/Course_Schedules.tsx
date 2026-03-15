import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  PlayCircle,
  CheckCircle,
  Star,
  ArrowRight,
  FileText,
  Video,
  Award,
  Target,
  Zap,
  TrendingUp,
  Download,
  Bell,
  ChevronRight,
  Info,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Playlist from "./Playlist";
import Footer from "./Footer";
import { UserDetails } from "./Connections/Connection.interface";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ScheduleItem {
  month: string;
  day: string;
  title: string;
  details: string;
  topic: string;
  type?: "live" | "test" | "assignment";
  status?: "upcoming" | "live" | "completed";
}

interface CourseInfo {
  type: string;
  name: string;
  teachers: string;
  description: string;
  duration: string;
  students: string;
  rating: number;
  startDate: string;
}

const userPurchasedCourse = async ({
  emailId,
  examname,
}: {
  emailId: string;
  examname: string;
}) => {
  const { data } = await api.post(apiRoutes.courses.coursePurchase, {
    email: emailId,
    examname: examname,
  });
  return data;
};

const ProfessionalCourseSchedule = ({
  details,
  authenticated,
}: {
  details: UserDetails;
  authenticated: boolean;
}) => {
  const { examname } = useParams();
  const [purchased, setPurchased] = useState(false);
  const [nextClass, setNextClass] = useState(null);

  const navigate = useNavigate();

  const { mutate: getPurchasedCourseMutation } = useMutation({
    mutationFn: ({
      emailId,
      examname,
    }: {
      emailId: string;
      examname: string;
    }) => userPurchasedCourse({ emailId: emailId, examname: examname }),
    onSuccess: () => {
      setPurchased(true);
    },
    onError: () => {
      setPurchased(false);
    },
  });

  useEffect(() => {
    getPurchasedCourseMutation({
      emailId: details.email,
      examname: examname ?? "",
    });
  }, [details.email, examname]);

  useEffect(() => {
    const nextClassValue = getNextClass();
    setNextClass(nextClassValue);
  }, [examname])
  

  const [courseData] = useState({
    webdev: {
      type: "Web Development",
      name: "Development Crash Course: Projects Made Easier",
      teachers: "Faculty from Tier 1 Institutes",
      description:
        "Learn front-end, back-end, database development, and devops with real-world projects. Covers HTML, CSS, JavaScript, React, Node.js, Next.js Express, MongoDB, PostgreSQL, Docker, Kubernetes and deployment best practices.",
      duration: "5 Months / Bi-Weekly Classes",
      students: "10+",
      rating: 4.9,
      startDate: "March 21st, 2026",
      image: "/Images/WebDev1InternalImage.jpg",
    },
    dsa: {
      type: "Data Structures & Algorithms",
      name: "DSA for Placement and Contests",
      teachers: "Expert Engineering Faculty",
      description:
        "Crack coding interviews with in-depth DSA coverage. Includes arrays, linked lists, trees, graphs, dynamic programming, and advanced problem-solving strategies. Focus on Competitive Programming and Contests as well.",
      duration: "5 Months / Bi-Weekly Classes",
      students: "10+",
      rating: 4.7,
      startDate: "March 20th, 2026",
      image: "/Images/DSA1InternalImage.jpg",
    },
    fundamentals: {
      type: "Computer Fundamentals",
      name: "Fundamentals Crash Course: Crack GATE With Ease",
      teachers: "Expert Engineering Faculty",
      description:
        "Learn core CS concepts including Operating Systems, DBMS, Computer Networks, and OOP — essential for placements, interviews, and higher studies.",
      duration: "5 Months / Bi-Weekly Classes",
      students: "10+",
      rating: 4.7,
      startDate: "March 21st, 2026",
      image: "/Images/CSFundamentals1InternalImage.jpg",
    },
    ml: {
      type: "Machine Learning & AI",
      name: "Artificial Intelligence: Explore the Future",
      teachers: "Expert Engineering Faculty",
      description:
        "Master machine learning algorithms, data preprocessing, deep learning, and AI applications. Hands-on projects with Python, TensorFlow, and scikit-learn.",
      duration: "5 Months / Bi-Weekly Classes",
      students: "10+",
      rating: 4.7,
      startDate: "April 4st, 2026",
      image: "/Images/ML1InternalImage.gif",
    },
    placement: {
      type: "Placement Complete Series",
      name: "Placements Made Easier",
      teachers: "Expert Engineering Faculty",
      description:
        "This tracker is designed for students who want both interview problem solving and real project proof. You will learn DSA patterns, build a deployable web portfolio, and master the CS fundamentals that interviewers ask repeatedly.",
      duration: "5 Months / Bi-Weekly Classes Per Course",
      students: "10+",
      rating: 4.7,
      startDate: "March 21st, 2026",
      image: "/Images/placed.jpg",
    },
  });

  const [scheduleData] = useState({
    webdev: [
      { ClassNo:1, month:"MAR", day:"21", title:"Phase 0", type:"live", date:"2026-03-21"},
      { ClassNo:2, month:"MAR", day:"22", title:"Phase 0", type:"live", date:"2026-03-22"},
      { ClassNo:3, month:"MAR", day:"28", title:"Phase 0", type:"live", date:"2026-03-28"},
      { ClassNo:4, month:"MAR", day:"29", title:"Phase 0", type:"live", date:"2026-03-29"},
      { ClassNo:5, month:"APR", day:"4", title:"Phase 0", type:"live", date:"2026-04-04"},
      { ClassNo:6, month:"APR", day:"5", title:"Phase 1", type:"live", date:"2026-04-05"},
      { ClassNo:7, month:"APR", day:"11", title:"Phase 1", type:"live", date:"2026-04-11"},
      { ClassNo:8, month:"APR", day:"12", title:"Phase 1", type:"live", date:"2026-04-12"},
      { ClassNo:9, month:"APR", day:"18", title:"Phase 1", type:"live", date:"2026-04-18"},
      { ClassNo:10, month:"APR", day:"19", title:"Phase 1", type:"live", date:"2026-04-19"},
      { ClassNo:11, month:"APR", day:"25", title:"Phase 2", type:"live", date:"2026-04-25"},
      { ClassNo:12, month:"APR", day:"26", title:"Phase 2", type:"live", date:"2026-04-26"},
      { ClassNo:13, month:"MAY", day:"2", title:"Phase 2", type:"live", date:"2026-05-02"},
      { ClassNo:14, month:"MAY", day:"3", title:"Phase 2", type:"live", date:"2026-05-03"},
      { ClassNo:15, month:"MAY", day:"9", title:"Phase 2", type:"live", date:"2026-05-09"},
      { ClassNo:16, month:"MAY", day:"10", title:"Phase 3", type:"live", date:"2026-05-10"},
      { ClassNo:17, month:"MAY", day:"16", title:"Phase 3", type:"live", date:"2026-05-16"},
      { ClassNo:18, month:"MAY", day:"17", title:"Phase 3", type:"live", date:"2026-05-17"},
      { ClassNo:19, month:"MAY", day:"23", title:"Phase 3", type:"live", date:"2026-05-23"},
      { ClassNo:20, month:"MAY", day:"24", title:"Phase 3", type:"live", date:"2026-05-24"},
      { ClassNo:21, month:"MAY", day:"30", title:"Phase 4", type:"live", date:"2026-05-30"},
      { ClassNo:22, month:"MAY", day:"31", title:"Phase 4", type:"live", date:"2026-05-31"},
      { ClassNo:23, month:"JUN", day:"6", title:"Phase 4", type:"live", date:"2026-06-06"},
      { ClassNo:24, month:"JUN", day:"7", title:"Phase 4", type:"live", date:"2026-06-07"},
      { ClassNo:25, month:"JUN", day:"13", title:"Phase 4", type:"live", date:"2026-06-13"},
      { ClassNo:26, month:"JUN", day:"14", title:"Phase 5", type:"live", date:"2026-06-14"},
      { ClassNo:27, month:"JUN", day:"20", title:"Phase 5", type:"live", date:"2026-06-20"},
      { ClassNo:28, month:"JUN", day:"21", title:"Phase 5", type:"live", date:"2026-06-21"},
      { ClassNo:29, month:"JUN", day:"27", title:"Phase 5", type:"live", date:"2026-06-27"},
      { ClassNo:30, month:"JUN", day:"28", title:"Phase 5", type:"live", date:"2026-06-28"},
      { ClassNo:31, month:"JUL", day:"4", title:"Phase 5", type:"live", date:"2026-07-04"},
      { ClassNo:32, month:"JUL", day:"5", title:"Phase 6", type:"live", date:"2026-07-05"},
      { ClassNo:33, month:"JUL", day:"11", title:"Phase 6", type:"live", date:"2026-07-11"},
      { ClassNo:34, month:"JUL", day:"12", title:"Phase 6", type:"live", date:"2026-07-12"},
      { ClassNo:35, month:"JUL", day:"18", title:"Phase 6", type:"live", date:"2026-07-18"},
      { ClassNo:36, month:"JUL", day:"19", title:"Phase 6", type:"live", date:"2026-07-19"},
      { ClassNo:37, month:"JUL", day:"25", title:"Phase 6", type:"live", date:"2026-07-25"},
      { ClassNo:38, month:"JUL", day:"26", title:"Phase 7", type:"live", date:"2026-07-26"},
      { ClassNo:39, month:"AUG", day:"1", title:"Phase 7", type:"live", date:"2026-08-01"},
      { ClassNo:40, month:"AUG", day:"2", title:"Phase 7", type:"live", date:"2026-08-02"},
      { ClassNo:41, month:"AUG", day:"8", title:"Phase 7", type:"live", date:"2026-08-08"},
      { ClassNo:42, month:"AUG", day:"9", title:"Phase 7", type:"live", date:"2026-08-09"}
    ],
    dsa: [
      { ClassNo:1, month:"MAR", day:"20", title:"Phase 0", type:"live", date:"2026-03-20"},
      { ClassNo:2, month:"MAR", day:"26", title:"Phase 1", type:"live", date:"2026-03-26"},
      { ClassNo:3, month:"MAR", day:"27", title:"Phase 1", type:"live", date:"2026-03-27"},
      { ClassNo:4, month:"APR", day:"2", title:"Phase 1", type:"live", date:"2026-04-02"},
      { ClassNo:5, month:"APR", day:"3", title:"Phase 1", type:"live", date:"2026-04-03"},
      { ClassNo:6, month:"APR", day:"9", title:"Phase 1", type:"live", date:"2026-04-09"},
      { ClassNo:7, month:"APR", day:"10", title:"Phase 2", type:"live", date:"2026-04-10"},
      { ClassNo:8, month:"APR", day:"16", title:"Phase 2", type:"live", date:"2026-04-16"},
      { ClassNo:9, month:"APR", day:"17", title:"Phase 2", type:"live", date:"2026-04-17"},
      { ClassNo:10, month:"APR", day:"23", title:"Phase 3", type:"live", date:"2026-04-23"},
      { ClassNo:11, month:"APR", day:"24", title:"Phase 3", type:"live", date:"2026-04-24"},
      { ClassNo:12, month:"APR", day:"30", title:"Phase 3", type:"live", date:"2026-04-30"},
      { ClassNo:13, month:"MAY", day:"1", title:"Phase 3", type:"live", date:"2026-05-01"},
      { ClassNo:14, month:"MAY", day:"7", title:"Phase 4", type:"live", date:"2026-05-07"},
      { ClassNo:15, month:"MAY", day:"8", title:"Phase 4", type:"live", date:"2026-05-08"},
      { ClassNo:16, month:"MAY", day:"14", title:"Phase 4", type:"live", date:"2026-05-14"},
      { ClassNo:17, month:"MAY", day:"15", title:"Phase 5", type:"live", date:"2026-05-15"},
      { ClassNo:18, month:"MAY", day:"21", title:"Phase 5", type:"live", date:"2026-05-21"},
      { ClassNo:19, month:"MAY", day:"22", title:"Phase 5", type:"live", date:"2026-05-22"},
      { ClassNo:20, month:"MAY", day:"28", title:"Phase 5", type:"live", date:"2026-05-28"},
      { ClassNo:21, month:"MAY", day:"29", title:"Phase 5", type:"live", date:"2026-05-29"},
      { ClassNo:22, month:"JUN", day:"4", title:"Phase 5", type:"live", date:"2026-06-04"},
      { ClassNo:23, month:"JUN", day:"5", title:"Phase 6", type:"live", date:"2026-06-05"},
      { ClassNo:24, month:"JUN", day:"11", title:"Phase 6", type:"live", date:"2026-06-11"},
      { ClassNo:25, month:"JUN", day:"12", title:"Phase 6", type:"live", date:"2026-06-12"},
      { ClassNo:26, month:"JUN", day:"18", title:"Phase 6", type:"live", date:"2026-06-18"},
      { ClassNo:27, month:"JUN", day:"19", title:"Phase 7", type:"live", date:"2026-06-19"},
      { ClassNo:28, month:"JUN", day:"25", title:"Phase 7", type:"live", date:"2026-06-25"},
      { ClassNo:29, month:"JUN", day:"26", title:"Phase 7", type:"live", date:"2026-06-26"},
      { ClassNo:30, month:"JUL", day:"2", title:"Phase 8", type:"live", date:"2026-07-02"},
      { ClassNo:31, month:"JUL", day:"3", title:"Phase 8", type:"live", date:"2026-07-03"},
      { ClassNo:32, month:"JUL", day:"9", title:"Phase 8", type:"live", date:"2026-07-09"},
      { ClassNo:33, month:"JUL", day:"10", title:"Phase 8", type:"live", date:"2026-07-10"},
      { ClassNo:34, month:"JUL", day:"16", title:"Phase 9", type:"live", date:"2026-07-16"},
      { ClassNo:35, month:"JUL", day:"17", title:"Phase 9", type:"live", date:"2026-07-17"},
      { ClassNo:36, month:"JUL", day:"23", title:"Phase 9", type:"live", date:"2026-07-23"},
      { ClassNo:37, month:"JUL", day:"24", title:"Phase 9", type:"live", date:"2026-07-24"},
      { ClassNo:38, month:"JUL", day:"30", title:"Phase 10", type:"live", date:"2026-07-30"},
      { ClassNo:39, month:"JUL", day:"31", title:"Phase 10", type:"live", date:"2026-07-31"},
      { ClassNo:40, month:"AUG", day:"6", title:"Phase 10", type:"live", date:"2026-08-06"},
      { ClassNo:41, month:"AUG", day:"7", title:"Phase 10", type:"live", date:"2026-08-07"},
      { ClassNo:42, month:"AUG", day:"13", title:"Phase 10", type:"live", date:"2026-08-13"}
    ],
    fundamentals: [
      { ClassNo:1, month:"MAR", day:"21", title:"Phase 0", type:"live", date:"2026-03-21"},
      { ClassNo:2, month:"MAR", day:"22", title:"Phase 1", type:"live", date:"2026-03-22"},
      { ClassNo:3, month:"MAR", day:"28", title:"Phase 1", type:"live", date:"2026-03-28"},
      { ClassNo:4, month:"MAR", day:"29", title:"Phase 1", type:"live", date:"2026-03-29"},
      { ClassNo:5, month:"APR", day:"4", title:"Phase 1", type:"live", date:"2026-04-04"},
      { ClassNo:6, month:"APR", day:"5", title:"Phase 1", type:"live", date:"2026-04-05"},
      { ClassNo:7, month:"APR", day:"11", title:"Phase 1", type:"live", date:"2026-04-11"},
      { ClassNo:8, month:"APR", day:"12", title:"Phase 1", type:"live", date:"2026-04-12"},
      { ClassNo:9, month:"APR", day:"18", title:"Phase 1", type:"live", date:"2026-04-18"},
      { ClassNo:10, month:"APR", day:"19", title:"Phase 2", type:"live", date:"2026-04-19"},
      { ClassNo:11, month:"APR", day:"25", title:"Phase 2", type:"live", date:"2026-04-25"},
      { ClassNo:12, month:"APR", day:"26", title:"Phase 2", type:"live", date:"2026-04-26"},
      { ClassNo:13, month:"MAY", day:"2", title:"Phase 2", type:"live", date:"2026-05-02"},
      { ClassNo:14, month:"MAY", day:"3", title:"Phase 2", type:"live", date:"2026-05-03"},
      { ClassNo:15, month:"MAY", day:"9", title:"Phase 2", type:"live", date:"2026-05-09"},
      { ClassNo:16, month:"MAY", day:"10", title:"Phase 2", type:"live", date:"2026-05-10"},
      { ClassNo:17, month:"MAY", day:"16", title:"Phase 2", type:"live", date:"2026-05-16"},
      { ClassNo:18, month:"MAY", day:"17", title:"Phase 2", type:"live", date:"2026-05-17"},
      { ClassNo:19, month:"MAY", day:"23", title:"Phase 2", type:"live", date:"2026-05-23"},
      { ClassNo:20, month:"MAY", day:"24", title:"Phase 2", type:"live", date:"2026-05-24"},
      { ClassNo:21, month:"MAY", day:"30", title:"Phase 3", type:"live", date:"2026-05-30"},
      { ClassNo:22, month:"MAY", day:"31", title:"Phase 3", type:"live", date:"2026-05-31"},
      { ClassNo:23, month:"JUN", day:"6", title:"Phase 3", type:"live", date:"2026-06-06"},
      { ClassNo:24, month:"JUN", day:"7", title:"Phase 3", type:"live", date:"2026-06-07"},
      { ClassNo:25, month:"JUN", day:"13", title:"Phase 3", type:"live", date:"2026-06-13"},
      { ClassNo:26, month:"JUN", day:"14", title:"Phase 3", type:"live", date:"2026-06-14"},
      { ClassNo:27, month:"JUN", day:"20", title:"Phase 3", type:"live", date:"2026-06-20"},
      { ClassNo:28, month:"JUN", day:"21", title:"Phase 3", type:"live", date:"2026-06-21"},
      { ClassNo:29, month:"JUN", day:"27", title:"Phase 3", type:"live", date:"2026-06-27"},
      { ClassNo:30, month:"JUN", day:"28", title:"Phase 3", type:"live", date:"2026-06-28"},
      { ClassNo:31, month:"JUL", day:"4", title:"Phase 3", type:"live", date:"2026-07-04"},
      { ClassNo:32, month:"JUL", day:"5", title:"Phase 4", type:"live", date:"2026-07-05"},
      { ClassNo:33, month:"JUL", day:"11", title:"Phase 4", type:"live", date:"2026-07-11"},
      { ClassNo:34, month:"JUL", day:"12", title:"Phase 4", type:"live", date:"2026-07-12"},
      { ClassNo:35, month:"JUL", day:"18", title:"Phase 4", type:"live", date:"2026-07-18"},
      { ClassNo:36, month:"JUL", day:"19", title:"Phase 4", type:"live", date:"2026-07-19"},
      { ClassNo:37, month:"JUL", day:"25", title:"Phase 4", type:"live", date:"2026-07-25"},
      { ClassNo:38, month:"JUL", day:"26", title:"Phase 4", type:"live", date:"2026-07-26"},
      { ClassNo:39, month:"AUG", day:"1", title:"Phase 4", type:"live", date:"2026-08-01"},
      { ClassNo:40, month:"AUG", day:"2", title:"Phase 4", type:"live", date:"2026-08-02"},
      { ClassNo:41, month:"AUG", day:"8", title:"Phase 4", type:"live", date:"2026-08-08"},
      { ClassNo:42, month:"AUG", day:"9", title:"Phase 4", type:"live", date:"2026-08-09"}
    ],
    ml: [
      { ClassNo:1, month:"APR", day:"4", title:"Phase 1", type:"live", date:"2026-04-04"},
      { ClassNo:2, month:"APR", day:"5", title:"Phase 1", type:"live", date:"2026-04-05"},
      { ClassNo:3, month:"APR", day:"11", title:"Phase 1", type:"live", date:"2026-04-11"},
      { ClassNo:4, month:"APR", day:"12", title:"Phase 1", type:"live", date:"2026-04-12"},
      { ClassNo:5, month:"APR", day:"18", title:"Phase 1", type:"live", date:"2026-04-18"},
      { ClassNo:6, month:"APR", day:"19", title:"Phase 1", type:"live", date:"2026-04-19"},
      { ClassNo:7, month:"APR", day:"25", title:"Phase 1", type:"live", date:"2026-04-25"},
      { ClassNo:8, month:"APR", day:"26", title:"Phase 1", type:"live", date:"2026-04-26"},
      { ClassNo:9, month:"MAY", day:"2", title:"Phase 1", type:"live", date:"2026-05-02"},
      { ClassNo:10, month:"MAY", day:"3", title:"Phase 1", type:"live", date:"2026-05-03"},
      { ClassNo:11, month:"MAY", day:"9", title:"Phase 1", type:"live", date:"2026-05-09"},
      { ClassNo:12, month:"MAY", day:"10", title:"Phase 2", type:"live", date:"2026-05-10"},
      { ClassNo:13, month:"MAY", day:"16", title:"Phase 2", type:"live", date:"2026-05-16"},
      { ClassNo:14, month:"MAY", day:"17", title:"Phase 2", type:"live", date:"2026-05-17"},
      { ClassNo:15, month:"MAY", day:"23", title:"Phase 2", type:"live", date:"2026-05-23"},
      { ClassNo:16, month:"MAY", day:"24", title:"Phase 3", type:"live", date:"2026-05-24"},
      { ClassNo:17, month:"MAY", day:"30", title:"Phase 3", type:"live", date:"2026-05-30"},
      { ClassNo:18, month:"MAY", day:"31", title:"Phase 3", type:"live", date:"2026-05-31"},
      { ClassNo:19, month:"JUN", day:"6", title:"Phase 3", type:"live", date:"2026-06-06"},
      { ClassNo:20, month:"JUN", day:"7", title:"Phase 3", type:"live", date:"2026-06-07"},
      { ClassNo:21, month:"JUN", day:"13", title:"Phase 3", type:"live", date:"2026-06-13"},
      { ClassNo:22, month:"JUN", day:"14", title:"Phase 3", type:"live", date:"2026-06-14"},
      { ClassNo:23, month:"JUN", day:"20", title:"Phase 3", type:"live", date:"2026-06-20"},
      { ClassNo:24, month:"JUN", day:"21", title:"Phase 3", type:"live", date:"2026-06-21"},
      { ClassNo:25, month:"JUN", day:"27", title:"Phase 3", type:"live", date:"2026-06-27"},
      { ClassNo:26, month:"JUN", day:"28", title:"Phase 4", type:"live", date:"2026-06-28"},
      { ClassNo:27, month:"JUL", day:"4", title:"Phase 4", type:"live", date:"2026-07-04"},
      { ClassNo:28, month:"JUL", day:"5", title:"Phase 4", type:"live", date:"2026-07-05"},
      { ClassNo:29, month:"JUL", day:"11", title:"Phase 5", type:"live", date:"2026-07-11"},
      { ClassNo:30, month:"JUL", day:"12", title:"Phase 5", type:"live", date:"2026-07-12"},
      { ClassNo:31, month:"JUL", day:"18", title:"Phase 5", type:"live", date:"2026-07-18"},
      { ClassNo:32, month:"JUL", day:"19", title:"Phase 6", type:"live", date:"2026-07-19"},
      { ClassNo:33, month:"JUL", day:"25", title:"Phase 6", type:"live", date:"2026-07-25"},
      { ClassNo:34, month:"JUL", day:"26", title:"Phase 6", type:"live", date:"2026-07-26"},
      { ClassNo:35, month:"AUG", day:"1", title:"Phase 6", type:"live", date:"2026-08-01"}
      // { ClassNo:40, month:"AUG", day:"2", title:"Phase 1", type:"live", date:"2026-08-02" },
      // { ClassNo:41, month:"AUG", day:"8", title:"Phase 1", type:"live", date:"2026-08-08" },
      // { ClassNo:42, month:"AUG", day:"9", title:"Phase 1", type:"live", date:"2026-08-09" }
    ],
  });

  // Sample syllabus data
  const [syllabusData] = useState({
    dsa: [
      "Phase 0: Introduction to DSA - Requirements and Applications, Course Details Overview",
      "Phase 1: Arrays - Introduction and basic questions, Sorting - Bubble, Insertion, Selection",
      "Phase 1: Arrays - Medium to Difficult questions, Prefix Sums, Two Pointer, Difference Arrays",
      "Phase 1: Bit Manipulation - Introduction, CFQ/IFQ",
      "Phase 1: Hashing and Sliding Window - Introduction and easy problems",
      "Phase 1: Hashing and Sliding Window - CFQ/IFQ",
      "Phase 2: Greedy Algorithms - Introduction and easy problems",
      "Phase 2: Greedy Algorithms - CFQ/IFQ",
      "Phase 3: Recursion – Introduction, Easy problems on recursion, Merge Sort, Quick Sort",
      "Phase 3: Recursion - Standard Problems, Introduction to recurring sub-problems",
      "Phase 3: Binary Search - Introduction, Pattern Identification and easy problems",
      "Phase 3: Binary Search - CFQ/IFQ",
      "Phase 4: Linked Lists - Introduction, Easy Problems",
      "Phase 4: Linked Lists - CFQ/IFQ",
      "Phase 5: Stacks - Introduction and Easy Problems",
      "Phase 5: Stacks - CFQ/IFQ",
      "Phase 5: Queues - Introduction to Easy Problems",
      "Phase 5: Queues - CFQ/IFQ",
      "Phase 5: Mathematics - Sieve of Eratosthenes, HFC, LCM, Basic Combinatorics",
      "Phase 6: Dynamic Programming - Introduction and Continuation from Phase 3 - 'Recursion - Standard Problems, Introduction to recurring sub-problems'",
      "Phase 6: Dynamic Programming - 1D DP – CFQ/IFQ",
      "Phase 6: Dynamic Programming - 2D & 3D DP – CFQ/IFQ",
      "Phase 7: Strings – Introduction and basics, LPS Array definition and creation",
      "Phase 7: Strings – KMP, CFQ/IFQ, Manacher's algorithm",
      "Phase 8: Trees – Introduction and Traversal Algorithms",
      "Phase 8: Trees – LCA, BFS and other Algorithms",
      "Phase 8: Trees – CFQ/IFQ",
      "Phase 9: Graphs – Introduction, BFS, DFS, Representation, Cycle Detection, DAG, Topological Sort",
      "Phase 9: Graphs – Shortest path, Djikstra, Bellman Ford, Floyd Warshall, Kosaraju, Tarzan",
      "Phase 9: Graphs – Union Find and Path Compression, MST – Prim and Kruskal",
      "Phase 9: Trees and Graphs – CFQ/IFQ",
      "Phase 10: Tries – Introduction, easy problems and string matching",
      "Phase 10: Tries – CFQ/IFQ",
      "Phase 10: Maths – Introduction, CFQ/IFQ",
      "Phase 10: Fenwick and Segment Trees – Introduction and CFQ/IFQ (one problem for each)",
    ],
    webdev: [
      "Phase 0: Foundation, HTML5, CSS - DNS, HTTP/HTTPS, Semantic HTML, a11y",
      "Phase 0: Foundation, HTML5, CSS - Structuring a semantic landing page for a JavaScript tutorial series",
      "Phase 0: Foundation, HTML5, CSS - Box Model, Flexbox, CSS Grid, Variables, Building a responsive, complex layout from scratch",
      "Phase 0: Foundation, HTML5, CSS - Media Queries, Keyframes, Transitions, Creating interactive UI components (modals, carousels)",
      "Phase 0: Foundation, HTML5, CSS - Utility-first CSS, Git/GitHub Workflows, Replicating a modern SaaS landing page using Tailwind",
      "Phase 1: JavaScript - Core JavaScript Engine - Execution Context, Hoisting, Closures, Memory",
      "Phase 1: JavaScript - Data Structures in JS - Arrays, Maps, Sets, High-order functions, Building an in-memory data table with complex sort/filter logic",
      "Phase 1: JavaScript - DOM & Event Driven JS - Event Delegation, Bubbling, Browser Storage, Building a dynamic client-side task or curriculum tracker",
      "Phase 1: JavaScript - Asynchronous JS - Event Loop, Promises, Async/Await, Fetching and displaying mock course data from a REST API",
      "Phase 2: ReactJs - React Fundamentals - Virtual DOM, JSX, Props, State, Building reusable UI components",
      "Phase 2: ReactJS - Deep Dive into Hooks - useState, useEffect, Custom Hooks, Creating custom hooks for API fetching and debouncing search",
      "Phase 2: ReactJs - Advanced State - Context API, useReducer, Zustand/Redux, Managing global state for user progress and authentication",
      "Phase 2: ReactJs - Routing & Performance - React Router, Memoization, Lazy Loading, Building an interactive course dashboard",
      "Phase 3: NextJS - Next.js 16 & Server Components - App Router, Server vs. Client Components, Migrating the dashboard to a server-rendered Next.js 16 app",
      "Phase 3: NextJs - Data Fetching & Mutations - Server Actions, SSR vs. SSG vs. ISR, Implementing seamless data mutations for user profiles",
      "Phase 4: Part 4.1: Auth & Security - NextAuth/Auth.js, OAuth, JWTs, XSS prevention, Securing routes and implementing user credential logins",
      "Phase 4: Part 4.2: TypeScript - Static Typing, Interfaces, Generics, Refactoring the platform to strict TypeScript for production readiness",
      "Phase 4: Part 4.3: NodeJs & REST API - Node runtime, Express.js, Middleware, Building a scalable backend to serve course content",
      "Phase 5: Databases - Relational DBs (Postgres), SQL fundamentals, Joins, Prisma/Drizzle ORM, Designing a database schema for users, courses, and enrollments",
      "Phase 5: Databases - Caching & Performance, Redis caching, Rate Limiting, Implementing a Redis cache to serve high-traffic endpoints faster",
      "Phase 6: System Architecture - Real-Time Communication, WebSockets, Socket.io, Adding a live chat or Q&A feature for active classes",
      "Phase 6: System Architecture - Cloud Deployment (AWS), Docker, AWS EC2, S3, CI/CD Pipelines, Containerizing the app and automating deployments via GitHub Actions",
      "Phase 6: System Architecture - System Design & Scale, Horizontal Scaling, Load Balancing, CDNs,Architecting for high traffic and integrating HLS video streaming",
      "Phase 7: Capstone Project - Agile Sprints, Architecture Planning, Building the MVP of a full-fledged EdTech platform",
      "Phase 7: Capstone Project - Capstone & Launch, E2E Testing, Performance Audits, Code Review, Finalizing features, integrating LiveKit for live sessions, and deploying",
    ],
    ml: [
      "Phase 0: Introduction - What is ML, Complete ML pipe line",
      "Phase 0: Introduction - Complete installation, Environment setup, Notebook, Pandas, Numpy, Matplotlib",
      "Phase 1: Machine Learning Types - Supervised Learning: Linear regression (from scratch)",
      "Phase 1: Machine Learning Types - Supervised Learning: Cost Function, Gradient Descent",
      "Phase 1: Machine Learning Types - Supervised Learning: Sk-learn, Regression and Classification",
      "Phase 1: Machine Learning Types - Model Performance Metrics: MSE, MAE, Accuracy, Precision, Recall, F1, Confusion Matrix",
      "Phase 1: Machine Learning Types - Model Training Techniques: Train-test split, Cross-validation",
      "Phase 1: Machine Learning Types - Overfitting, Bias-Variance Tradeoff",
      "Phase 1: Machine Learning Types - Regularization, Hyperparameter tuning",
      "Phase 1: Machine Learning Types - Ensemble Learning",
      "Phase 2: Complete Hand-on Experience of Developing an ML model - Data Cleaning Techniques",
      "Phase 2: Complete Hand-on Experience of Developing an ML model - Feature Selection",
      "Phase 2: Complete Hand-on Experience of Developing an ML model - Feature Engineering",
      "Phase 2: Complete Hand-on Experience of Developing an ML model - PCA",
      "Phase 2: Complete Hand-on Experience of Developing an ML model - Model Training and evaluation, Other Talks",
      "Phase 3: Deep Learning - Neural Networks - Forward & backward pass",
      "Phase 3: Deep Learning - Neural Networks - Activation functions",
      "Phase 3: Deep Learning - Neural Networks - Loss functions",
      "Phase 3: Deep Learning - Neural Networks - Building a Neural Network from Scratch and Its Analysis",
      "Phase 3: Deep Learning - Neural Networks - How to use Pytorch",
      "Phase 4: Working With Images - CNN",
      "Phase 4: Working With Images - Different Types of CNN Models",
      "Phase 5: Working With Text Data - How to prepare text data",
      "Phase 5: Working With Text Data - RNN, LSTM, GRU",
      "Phase 6: Working With Text Data - Sentence auto complete (Project)",
      "Phase 6: Working With Text Data - Simple Q&A Bot (Project)",
      "Phase 6: Working With Text Data - Language to Language Translator (Project)",
    ],
    fundamentals: [
      "Phase 0: Introduction - Introduction and Course Overview, understanding of prerequisites, revision of C++ & Java",
      "Phase 1: OOPS - Pillars of OOPS – Encapsulation and Polymorphism (along with static classes, functions, overloading, etc)",
      "Phase 1: OOPS - Function and Operator Overloading in C++, pointers in C++ and references in Java, interfaces",
      "Phase 1: OOPS - Pillars of OOPS – Inheritance",
      "Phase 1: OOPS - Pillars of OOPS – Abstraction (including virtual classes, functions, etc",
      "Phase 1: OOPS - Error Handling in C++ and Java",
      "Phase 1: OOPS - Conclusion of OOPS – CFQs from OOPS",
      "Phase 2: Computer Networks - Introduction to Networks – Subnet, Channel Sharing Techniques, Types of Networks and Subnets, Communications in Subnet, Layering Architecture, OSI model and TCP/IP Model",
      "Phase 2: Computer Networks - Data Link Layer - Introduction, CSMA/CD, Checksum based Error Handling, Flow Control (Stop and Wait ARQ, Go back n, Sliding Window, etc.), MAC addressing",
      "Phase 2: Computer Networks - Network Layer- Types of Subnets and Routing Algorithms (2 Routing Algorithms, Distance Vector Routing, Link State Routing),  Congestion Control algorithms (Leaky Bucket and all), Tunnelling and Fragmentation",
      "Phase 2: Computer Networks - Network Layer - IP Addressing, IPv4 addresses, Classes IP Addresses, CIDR, Subnet Masking, NAT Translation, Drawbacks of CIDR, IP Aggregation",
      "Phase 2: Computer Networks - Network Layer -  Drawbacks of IPv4 addressing, BJP, Introduction to IPv6 Addressing, Introduction to mobile IP Addresses, IGMP and ICMP ARP, RARP, DHCP",
      "Phase 2: Computer Networks - Transport Layer –  Introduction, requirement of the Transport layer as a set of work that Network Layer does not do, TCP –  Prime Goals of TCP and Limitations of IP and 3 Way Handshake Protocol",
      "Phase 2: Computer Networks - Transport Layer - Flow Control – Naggle's algorithm and Clark's solution and Cumulative / Delayed / Duplicate Acknowledgement",
      "Phase 2: Computer Networks - Transport Layer - Requirement of Congestion Avoidance instead of Congestion Control, Congestion Avoidance Protocols –  Concept, TCP Taho, TCP Reno TCP New Reno, Introduction and concept of UDP, RPC",
      "Phase 2: Computer Networks - Application Layer - Introduction to HTTP, HTTPS, SMTP, Mail transport old and new versions, Limitations on Wireless over Wired Connections applications and Flying Router, Wireless LAN, WebSocket Protocol, WebRTC Protocol, Basic security using SSL, SSH",
      "Phase 3: DBMS - Introduction to Databases and Problems in File Storage",
      "Phase 3: DBMS - Relational Algebra and ER Diagram",
      "Phase 3: DBMS - Functional Dependency and Normalization",
      "Phase 3: DBMS - Transactions and Recovery",
      "Phase 3: DBMS - Understanding ACID Properties",
      "Phase 3: DBMS - Understanding BASE Properties and Distributed Databases",
      "Phase 3: DBMS - Introduction to MySQL  (DQL, DML, DDL, TCL)",
      "Phase 3: DBMS - Indexing, Query Optimizations and SQL Practice (CFQ)",
      "Phase 3: DBMS - Hashing File Storage and SQL Practice (CFQ)",
      "Phase 3: DBMS - Introduction to NoSQL, Difference between SQL and NoSQL - Programmers perspective, Brief talk on Data Warehouring, Difference between OLAP and OLTP",
      "Phase 4: Operating Systems - Process Management – Basic Concepts of Process, Process State Diagram , Creating and Suspending Processes ,Need of Process Scheduling and Types of Schedulers., IPC and Synchronization",
      "Phase 4: Operating Systems - CPU Scheduling – Multiple Processors, Multiple Queue Scheduling, Multiple Feedback Queue Scheduling, Process Synchronization – Critical Section Problem, Mutual Exclusion, Producer Consumer Problem, Peterson's Solution, Semaphore, Starvation and Classical examples of Synchronization – Readers and Writers problem, Bounded Buffer, Dining Philosophers Problem",
      "Phase 4: Operating Systems - Deadlock – introduction and characteristics of deadlock, Deadlock Handling – safe state, avoidance algorithm, and Bankers Algorithm, Recovery from Deadlock and Wait for graph ( Resource Preemption )",
      "Phase 4: Operating Systems - Memory Management 1 – Introduction and necessity, Conversion of a user program to process, logical v/s physical address space, final definition of MMU , dynamic loading, dynamic linking, Swapping",
      "Phase 4: Operating Systems - Memory Management 2 - Contiguous and dynamic storage allocation, Problems in both of them, Fragmentation, both internal and external, Solution to the above problem using Paging, Page Table, Associative Memory, TLB",
      "Phase 4: Operating Systems - Memory Management 3 - Memory Protection, Shared Pages, Structure of the Page Table – 2 level, 3 level, Segmentation, Architecture, Hardware Segment Tables",
      "Phase 4: Operating Systems - Memory Management 4 – Problems of Paging and Segmentation, Solution to the above problem – virtual memory using Demand Paging and Demand Segmentation, Demand Paging – Page Faults, Steps OS should do in a page fault, Performance of Demand Paging, Page Replacement Algorithm LRU, FIFO, Optimal",
      "Phase 4: Operating Systems - Hardware Memory Handling - Allocation of Frames – Fixed and Priority – modern OS follow Global and Local Allocation, Thrashing – Prepaging and Page Size, TLB Reach",
    ],
  });

  const currentCourse = courseData[examname as string] || courseData.languages;
  const currentSchedule =
    scheduleData[examname as string] || scheduleData.languages;
  const currentSyllabus =
    syllabusData[examname as string] || syllabusData.languages;

  const handleSubscriptionClick = () => {
    navigate("/profiles");
  };

  const getNextClass = () => {
    const now = new Date();

    const upcoming = currentSchedule.filter((session: any) => session.date).map((session: any) => ({
      ...session,
      fullDate: new Date(session.date),
    })).filter((session: any) => session.fullDate >= now).sort((a: any, b: any) => a.fullDate - b.fullDate);
    
    return upcoming[0];
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-100 text-red-700 border-red-200";
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCourseTiming = () => {
    switch (examname) {
      case "ml":
        return (
          <>
            <div>
              <b>Saturday 10 am to 12 pm</b>
            </div>
            <div>
              <b>Sunday 6 pm to 8 pm</b>
            </div>
            <div>2 Days per Week</div>
          </>
        );

      case "dsa":
        return (
          <>
            <div>
              <b>Friday 9 pm to 12:30 am</b>
            </div>
            <div>1 Day per Week</div>
          </>
        );

      case "webdev":
        return (
          <>
            <div>
              <b>Saturday 2 pm to 4 pm</b>
            </div>
            <div>
              <b>Sunday 2 pm to 4 pm</b>
            </div>
            <div>2 Days per Week</div>
          </>
        );

      case "fundamentals":
        return (
          <>
            <div>
              <b>Saturday 6 pm to 8 pm</b>
            </div>
            <div>
              <b>Sunday 10 am to 12 pm</b>
            </div>
            <div>2 Days per Week</div>
          </>
        );

      default:
        return <div>Loading...</div>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "live":
        return <Video className="w-4 h-4" />;
      case "test":
        return <FileText className="w-4 h-4" />;
      case "assignment":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <PlayCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Course Header Section */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="lg:flex">
              {/* Course Image */}
              <div className="lg:w-2/5 relative">
                <img
                  src={currentCourse.image}
                  alt="Course"
                  className="w-full h-80 lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Live Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Classes Live Now
                  </div>
                </div>

                {/* Course Stats */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-current text-yellow-400" />
                        <span className="font-semibold">
                          {currentCourse.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-5 h-5" />
                        <span>{currentCourse.students}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="lg:w-3/5 p-8 lg:p-12">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <Award className="w-4 h-4" />
                    {currentCourse.type}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                    {currentCourse.name}
                  </h1>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold mb-6">
                    <Users className="w-5 h-5" />
                    {currentCourse.teachers}
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {currentCourse.description}
                  </p>
                </div>

                {/* Course Meta Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Starts on</div>
                      <div className="font-semibold text-slate-800">
                        {currentCourse.startDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Duration</div>
                      <div className="font-semibold text-slate-800">
                        {currentCourse.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleSubscriptionClick}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Get Subscription & Start Learning
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {examname !== "placement" ? (
          <>
            {authenticated && (
              <>
                {/* Video Playlist Section */}
                {/* Video Container */}
                {/* Playlist Info Banner */}
                {purchased && <div className="flex-shrink-0 mx-3 mt-3 mb-1 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 px-4 py-3.5 flex items-start gap-3 shadow-sm">
                  {/* Top accent line */}
                  <div className="flex-shrink-0 mt-0.5 p-2 rounded-lg bg-emerald-100 text-emerald-600">
                    <Info className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1">
                      About this Playlist
                    </p>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Refer to the playlist to watch any video that you might
                      have missed or may have been taught before you joined the
                      classes. You can also use it for revision at any time of
                      your choosing.{" "}
                      <span className="font-semibold text-emerald-800">
                        Note: Recorded videos will only be accessible for the
                        duration for which this course remains active on your
                        account.
                      </span>
                    </p>
                  </div>
                </div>}
                <section className="mb-16">
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">
                        Course Content
                      </h2>
                      <div className="flex items-center gap-2 text-emerald-600">
                        <PlayCircle className="w-5 h-5" />
                        <span className="font-semibold">
                          70+ Hours of Content
                        </span>
                      </div>
                    </div>

                    {/* Playlist placeholder */}
                    <div className="bg-slate-50 rounded-2xl p-0 md:p-6 text-center border-2 border-dashed border-slate-300">
                      <div className="my-8 h-screen md:h-[30rem] bg-gray-200 shadow-lg rounded-lg p-0 md:p-4">
                        <Playlist exam={examname} details={details} />
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Syllabus Section */}
            <section>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden mb-16">
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                        Course Syllabus
                      </h2>
                      <p className="text-slate-600">
                        Comprehensive curriculum designed for success
                      </p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[90vh] scrollbar-thin overflow-auto">
                    {currentSyllabus.map((topic, index) => (
                      <div
                        key={index}
                        className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white group-hover:bg-blue-100 rounded-xl flex items-center justify-center border border-slate-200 group-hover:border-blue-200 transition-all">
                              <BookOpen className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                                {topic}
                              </h4>
                              <div className="text-sm text-slate-500">
                                Module {index + 1}
                              </div>
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* How to Join Banner — visible only to purchased users */}
            {purchased && (
              <div className="mb-8 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 px-6 py-5 shadow-sm">
                {/* Top accent strip */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5 p-2.5 rounded-xl bg-blue-100 text-blue-600">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-800 mb-1">
                      How to Join Your Live Classes
                    </p>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      You can join each class at its designated time as shown in
                      the{" "}
                      <span className="font-semibold">Upcoming Sessions</span>{" "}
                      schedule below. Simply click the{" "}
                      <span className="font-semibold">Class Link</span> provided
                      in the{" "}
                      <span className="font-semibold">Class Schedule</span>{" "}
                      panel on the left — the link will become active at the
                      start of the session. Make sure to join on time, as
                      classes begin as per the pre-designated time schedule.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Schedule & Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Schedule Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 sticky top-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">
                    Class Schedule
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 mb-1">
                          Class Timings
                        </div>
                        <div className="text-slate-600">
                          {getCourseTiming()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 mb-1">
                          Assessments
                        </div>
                        <div className="text-slate-600">Weekly mock tests</div>
                        <div className="text-slate-600">Progress tracking</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bell className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 mb-1">
                          Class Link
                        </div>
                        {purchased ? (
                          <>Link</>
                        ) : (
                          <div className="text-slate-600">
                            <b>Purchase the course to activate the link</b>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                      <Zap className="w-4 h-4" />
                      Next Class
                    </div>

                    {nextClass ? (
                      <>
                        <div className="text-slate-800 font-semibold">
                          {nextClass.title}
                        </div>

                        <div className="text-slate-600 text-sm">
                          {new Date(nextClass.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="text-slate-600 text-sm">No upcoming classes</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Schedule Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-8">
                    Upcoming Sessions
                  </h3>

                  <div className="space-y-6 overflow-auto h-[90vh] scrollbar-thin">
                    {currentSchedule.map((session, index) => (
                      <div
                        key={index}
                        className="group border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row items-start gap-6">
                          {/* Class Numbers */}
                          <div className="flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-4 text-center md:min-w-[80px]">
                            <div className="text-sm font-semibold text-slate-600">
                              Class
                            </div>
                            <div className="text-2xl font-bold text-slate-800">
                              {session.ClassNo}
                            </div>
                          </div>

                          <div className="flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-4 text-center md:min-w-[80px]">
                            <div className="text-sm font-semibold text-slate-600">
                              {session.month}
                            </div>
                            <div className="text-2xl font-bold text-slate-800">
                              {session.day}
                            </div>
                          </div>

                          {/* Session Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                {session.title}
                              </h4>
                              <div
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                  session.status || "upcoming",
                                )}`}
                              >
                                {getTypeIcon(session.type || "live")}
                                {session.status || "upcoming"}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                Join Session
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <section className="mb-24 px-4">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl border border-slate-200 shadow-xl p-10 md:p-16 transition-all duration-300">
                {/* Header */}
                <h3 className="text-3xl font-extrabold text-slate-800 mb-10 text-center">
                  Placement Track{" "}
                  <span className="text-blue-600">Includes</span>
                </h3>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                    {
                      name: "Data Structures & Algorithms",
                      route: "/courses/dsa/details",
                      color: "from-blue-500 to-blue-600",
                    },
                    {
                      name: "Web Development and Devops",
                      route: "/courses/webdev/details",
                      color: "from-green-500 to-green-600",
                    },
                    {
                      name: "Computer Science Fundamentals",
                      route: "/courses/fundamentals/details",
                      color: "from-indigo-500 to-purple-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(item.route)}
                      className="group cursor-pointer bg-white border border-slate-200 hover:shadow-2xl hover:-translate-y-2 rounded-2xl p-8 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-semibold text-slate-800 group-hover:text-blue-700 transition-colors mb-2">
                            {item.name}
                          </h4>
                          <p className="text-sm text-slate-500">
                            Explore full course content
                          </p>
                        </div>
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr ${item.color} text-white group-hover:scale-110 transition-transform`}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                      <div
                        className={`mt-6 h-1 w-2/3 bg-gradient-to-r ${item.color} rounded-full opacity-60 transition-all duration-300 group-hover:w-full group-hover:opacity-100`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalCourseSchedule;
