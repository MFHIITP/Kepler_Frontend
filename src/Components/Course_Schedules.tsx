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
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Playlist from "./Playlist";
import Footer from "./Footer";
import { UserDetails } from "./Connections/Connection.interface";

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

const ProfessionalCourseSchedule = ({
  details,
  authenticated,
}: {
  details: UserDetails;
  authenticated: boolean;
}) => {
  const { examname } = useParams();

  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    languages: {
      type: "Language",
      name: "Programming Languages Mastery 2025",
      teachers: "Purnendu Kumar Mishra",
      description:
        "Master core programming languages like C, C++, Java, Python, and JavaScript from scratch to advanced. Build a strong foundation for software development, competitive coding, and interviews.",
      duration: "5 Months",
      students: "12,500+",
      rating: 4.8,
      startDate: "September 1st, 2025",
    },
    webdev: {
      type: "Web Development",
      name: "Development Crash Course: Projects Made Easier",
      teachers: "Faculty from Tier 1 Institutes",
      description:
        "Learn front-end, back-end, database development, and devops with real-world projects. Covers HTML, CSS, JavaScript, React, Node.js, Next.js Express, MongoDB, PostgreSQL, Docker, Kubernetes and deployment best practices.",
      duration: "5 Months / Bi-Weekly Classes",
      students: "10+",
      rating: 4.9,
      startDate: "March 1st, 2026",
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
      startDate: "March 1st, 2026",
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
      startDate: "March 1st, 2026",
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
      startDate: "March 1st, 2026",
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
      startDate: "March 1st, 2026",
      image: "/Images/placed.jpg",
    },
  });

  const [scheduleData, setScheduleData] = useState({
    languages: [
      {
        month: "SEP",
        day: "1",
        title: "Introduction to Computer Languages and C Programming Language",
        details:
          "Basic Concepts of C, arrays, functions, memory stack, dynamic memory allocation",
        topic: "Languages • Chapter 1-3",
        type: "live",
        status: "upcoming",
      },
      {
        month: "SEP",
        day: "5",
        title: "Introduction to C++",
        details:
          "Conclusion for C, Introduction to C++, dynamic memory based data structures.",
        topic: "Languages • Chapters 4 - 6",
        type: "test",
        status: "upcoming",
      },
      {
        month: "SEP",
        day: "8",
        title: "Introduction to Java",
        details:
          "Introduction to Java, Classes and Objects, Data structures in Java",
        topic: "Languages • Chapter 7 - 10",
        type: "live",
        status: "live",
      },
      {
        month: "SEP",
        day: "22",
        title: "Object Oriented Programming",
        details: "Inheritance and Operator Overloading",
        topic: "Languages • Chapters 11 - 20",
        type: "live",
        status: "upcoming",
      },
    ],
    webdev: [
      {
        month: "SEP",
        day: "2",
        title: "Introduction to Web Development",
        details: "HTTP, HTML5, CSS3",
        topic: "Web Dev • Chapters 1 - 8",
        type: "live",
        status: "upcoming",
      },
      {
        month: "SEP",
        day: "6",
        title: "ReactJS",
        details: "ReactJS",
        topic: "Web Dev • Chapters 9 - 16",
        type: "test",
        status: "upcoming",
      },
    ],
    dsa: [
      {
        month: "SEP",
        day: "3",
        title: "Introduction to Data Structures and Algorithms",
        details: "Importance of DSA in Companies, Recursion",
        topic: "DSA • Chapters 1 - 5",
        type: "live",
        status: "upcoming",
      },
    ],
    fundamentals: [
      {
        month: "SEP",
        day: "4",
        title: "Introduction to Computer Networks",
        details:
          "Computer Networks, Types of Networking, Subnet, Layer wise Architechture in Networks",
        topic: "fundamentals • CN 1 - 4",
        type: "live",
        status: "upcoming",
      },
    ],
    ml: [
      {
        month: "SEP",
        day: "7",
        title:
          "Introduction to Machine Learning and Importance of ML in real life",
        details: "Introduction, MLDLC, Introduction to Data Gathering",
        topic: "ML • Chapters 1 - 3",
        type: "live",
        status: "upcoming",
      },
    ],
  });

  // Sample syllabus data
  const [syllabusData, setSyllabusData] = useState({
    languages: [
      "C",
      "C++",
      "Java",
      "Python",
      "Introduction to Object Oriented Programming",
      "Inheritance and Operator Overloading",
      "Error Handling and Reflection",
      "Class Diagram and System Design",
    ],
    dsa: [
      "Recursion",
      "Arrays",
      "Sliding Window",
      "Greedy",
      "Binary Search",
      "Trees",
      "Graphs",
      "Dynamic Programming",
    ],
    webdev: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "ReactJS",
      "NodeJS",
      "MongoDB",
      "PostgreSQL",
    ],
    ml: [
      "Data Gathering",
      "Data Processing",
      "Data Analysis",
      "Machine Learning Algorithms",
      "Deep Learning",
      "Natural Language Processing",
    ],
    fundamentals: [
      "Computer Networks",
      "Database Management",
      "Operating Systems",
      "Computer Organization and Architechture",
      "System Design",
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

            {/* Schedule & Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
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
                          Morning or Evening sessions
                        </div>
                        <div className="text-slate-600">2 days per week</div>
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
                          Notifications
                        </div>
                        <div className="text-slate-600">Class reminders</div>
                        <div className="text-slate-600">Assignment alerts</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                      <Zap className="w-4 h-4" />
                      Next Class
                    </div>
                    <div className="text-slate-800 font-semibold">
                      Calculus Fundamentals
                    </div>
                    <div className="text-slate-600 text-sm">
                      Tomorrow at 10:00 AM
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Schedule Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-8">
                    Upcoming Sessions
                  </h3>

                  <div className="space-y-6">
                    {currentSchedule.map((session, index) => (
                      <div
                        key={index}
                        className="group border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row items-start gap-6">
                          {/* Date Badge */}
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

                            <p className="text-slate-600 mb-3 leading-relaxed">
                              {session.details}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-blue-600 font-medium">
                                <BookOpen className="w-4 h-4" />
                                {session.topic}
                              </div>
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

            {/* Syllabus Section */}
            <section>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
