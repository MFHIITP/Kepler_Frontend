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
import { Link, useNavigate, useParams } from "react-router-dom";
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

const userPurchasedCourse = async ({ emailId, examname }: { emailId: string; examname: string }) => {
  const { data } = await api.post(apiRoutes.courses.coursePurchase, {
    email: emailId,
    examname: examname,
  });
  return data;
};

const getCourseSchedule = async(examName: string) => {
  const { data } = await api.post(apiRoutes.getSchedule, {
    examName: examName
  })
  return data;
}

const getCourseSyllabus = async(examName: string) => {
  const { data } = await api.post(apiRoutes.getSyllabus, {
    examName: examName
  })
  return data;
}

const ProfessionalCourseSchedule = ({ details, authenticated }: { details: UserDetails; authenticated: boolean }) => {
  const { examname } = useParams();
  const [purchased, setPurchased] = useState(false);
  const [nextClass, setNextClass] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [syllabusData, setSyllabusData] = useState([]);

  const navigate = useNavigate();

  const { mutate: getPurchasedCourseMutation } = useMutation({
    mutationFn: ({ emailId, examname }: { emailId: string; examname: string }) => userPurchasedCourse({ emailId: emailId, examname: examname }),
    onSuccess: () => {
      setPurchased(true);
    },
    onError: () => {
      setPurchased(false);
    },
  });

  const { mutate: getCourseScheduleMutation } = useMutation({
    mutationFn: (examName: string) => getCourseSchedule(examName),
    onSuccess: (data) => {
      setScheduleData(data.courseScheduleData);
    },
    onError: () => {
      toast.error("Cannot get course schedule data")
    }
  })

  const { mutate: getCourseSyllabuseMutation } = useMutation({
    mutationFn: (examName: string) => getCourseSyllabus(examName),
    onSuccess: (data) => {
      setSyllabusData(data.courseSyllabusData);
    },
    onError: () => {
      toast.error("Cannot get course schedule data")
    }
  })

  useEffect(() => {
    getPurchasedCourseMutation({
      emailId: details?.email,
      examname: examname ?? "",
    });
  }, [details?.email, examname]);

  useEffect(() => {
    getCourseScheduleMutation(examname ?? "");
    getCourseSyllabuseMutation(examname ?? "");
  }, [examname])
  

  useEffect(() => {
    const nextClassValue = getNextClass();
    setNextClass(nextClassValue);
  }, [scheduleData, examname])
  

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
      startDate: "March 20th, 2026",
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
      startDate: "March 23rd, 2026",
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
      startDate: "April 4th, 2026",
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
      startDate: "March 20th, 2026",
      image: "/Images/placed.jpg",
    },
  });

  const currentCourse = courseData[examname as keyof typeof courseData] || courseData.webdev;
  const currentSchedule = scheduleData || [];
  const currentSyllabus = syllabusData || [];

  const handleSubscriptionClick = () => {
    navigate("/profiles");
  };

  const parseTime = (date: string, time: string) => {
    if (!time || !time.includes("to")) return null;

    const parts = time.split(" to ");
    if (parts.length !== 2) return null;

    const [start, end] = parts;

    const convert = (t: string) => {
      if (!t) return null;

      const split = t.trim().split(" ");
      if (split.length !== 2) return null;

      let [hour, modifier] = split;

      let h = parseInt(hour);
      if (isNaN(h)) return null;

      if (modifier === "pm" && h !== 12) h += 12;
      if (modifier === "am" && h === 12) h = 0;

      return h;
    };

    const startHour = convert(start);
    const endHour = convert(end);

    if (startHour === null || endHour === null) return null;

    const startDate = new Date(date);
    startDate.setHours(startHour, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(endHour, 0, 0, 0);

    return { startDate, endDate };
  };

  const getNextClass = () => {
    if (examname == "placement") return null;

    const now = new Date();

    // 1️⃣ Check today's class
    for (let session of currentSchedule) {
      const parsed = parseTime(session.date, session.time);
      if (!parsed) continue;

      const { startDate, endDate } = parsed;

      const today = new Date();
      const sessionDay = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      const todayDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      // Same day check
      if (sessionDay.getTime() === todayDay.getTime()) {
        // If class NOT finished → return this
        if (now <= endDate) {
          return session;
        }
      }
    }

    // 2️⃣ Otherwise → next future class
    const upcoming = currentSchedule
      .map((session: any) => ({
        ...session,
        fullDate: new Date(session.date),
      }))
      .filter((session: any) => session.fullDate > now)
      .sort((a: any, b: any) => a.fullDate - b.fullDate);

    return upcoming[0] || null;
  };

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
    if (!nextClass) {
      return <div>Loading...</div>;
    }
  
    return (
      <>
        <div>
          <b>{nextClass.time || "Timing not available"}</b>
        </div>
        <div>
          {new Date(nextClass.date).toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </div>
        <div>Based on next upcoming class</div>
      </>
    );
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
                          <> 
                            <div><b>Meeting Link: </b> <span className = "bg-blue-700 text-white font-bold px-3 py-[1px] rounded"><Link to = {`${examname == "webdev" ? "https://us06web.zoom.us/j/81764384293?pwd=ingk0B8Qm1WMxtO21pNhkZl3B0hJxz.1" : examname == "dsa" ? "https://us06web.zoom.us/j/81954602362?pwd=I3P5HSB3gzozQwhzVa9oCz4Z1aBY6U.1" : examname == "fundamentals" ? "https://us06web.zoom.us/j/81647078530?pwd=TDrcAsD5Ab9JXyd1QGPx2dXpL24LzR.1" : "https://us06web.zoom.us/j/87537975890?pwd=F8mpPaqPWE2bBSbUntJB2iOWjZWlAZ.1"}`}>Join</Link></span></div>
                            <div><b>Passcode: </b> {examname == "webdev" && 755550}{examname == "fundamentals" && 125780}{examname == "dsa" && 857096}{examname == "ml" && 792895}</div>
                          </>
                        ) : (
                          <div className="text-red-600">
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
                          Class Number - {nextClass?.ClassNo}
                        </div>

                        <div className="text-slate-800 font-semibold">
                          {nextClass?.title}
                        </div>

                        <div className="text-slate-600 text-sm">
                          {new Date(nextClass?.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-slate-600 text-sm">
                          {nextClass?.time}
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

                          <div className="flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-4 text-center md:min-w-[80px]">
                            <div className="text-md font-semibold text-slate-600">
                              {session.time}
                            </div>
                          </div>

                          {/* Session Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                {session.title}
                              </h4>
                              <div
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border`}
                              >
                                {session?.ClassNo < (nextClass?.ClassNo ?? Infinity) ? "Completed" : "Upcoming"}
                              </div>
                            </div>

                            {purchased && <div className="flex items-center justify-between">
                              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 flex items-center gap-1" onClick={() => {
                                window.open(`${examname == "webdev" ? "https://us06web.zoom.us/j/81764384293?pwd=ingk0B8Qm1WMxtO21pNhkZl3B0hJxz.1" : examname == "dsa" ? "https://us06web.zoom.us/j/81954602362?pwd=I3P5HSB3gzozQwhzVa9oCz4Z1aBY6U.1" : examname == "fundamentals" ? "https://us06web.zoom.us/j/81647078530?pwd=TDrcAsD5Ab9JXyd1QGPx2dXpL24LzR.1" : "https://us06web.zoom.us/j/87537975890?pwd=F8mpPaqPWE2bBSbUntJB2iOWjZWlAZ.1"}`, "_blank")
                              }}>
                                Join Session
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                    {
                      name: "Machine Learning and Deep Learning",
                      route: "/courses/ml/details",
                      color: "from-yellow-500 to-purple-500",
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
