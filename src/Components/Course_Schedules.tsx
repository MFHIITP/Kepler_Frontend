import React, { useState } from "react";
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
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Playlist from "./Playlist";
import Footer from "./Footer";

interface ScheduleItem {
  month: string;
  day: string;
  title: string;
  details: string;
  topic: string;
  type?: 'live' | 'test' | 'assignment';
  status?: 'upcoming' | 'live' | 'completed';
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

function ProfessionalCourseSchedule() {
  const examname = "college"; // Default to college for demo

  const navigate = useNavigate();

  // Sample data structure
  const courseData: { [key: string]: CourseInfo } = {
    college: {
      type: "Comprehensive Semester Program",
      name: "College Excellence Batch 2025",
      teachers: "Dr. Shubhayan Ghosal, Prof. Subhajit Fadikar, Dr. Shirso Dey",
      description: "Complete semester exam preparation with expert faculty guidance. Comprehensive coverage of all subjects with interactive doubt-clearing sessions, practice tests, and personalized mentorship. Designed for students aiming for top grades in their college examinations.",
      duration: "6 Months",
      students: "12,500+",
      rating: 4.8,
      startDate: "January 1st, 2025"
    },
    jee: {
      type: "Complete JEE Mastery Program", 
      name: "JEE Champions Batch 2025-26",
      teachers: "IIT Alumni Faculty Team",
      description: "Comprehensive JEE Main & Advanced preparation with proven methodology and expert guidance from IIT alumni.",
      duration: "24 Months",
      students: "25,000+",
      rating: 4.9,
      startDate: "April 1st, 2024"
    },
    gate: {
      type: "GATE Excellence Program",
      name: "GATE Achievers Batch 2025",
      teachers: "Expert Engineering Faculty",
      description: "Targeted GATE preparation with branch-specific modules and comprehensive practice sessions.",
      duration: "12 Months", 
      students: "8,500+",
      rating: 4.7,
      startDate: "June 1st, 2024"
    }
  };

  // Sample schedule data
  const scheduleData: { [key: string]: ScheduleItem[] } = {
    college: [
      {
        month: "JAN",
        day: "15",
        title: "Calculus Fundamentals",
        details: "Live interactive session on differential calculus with real-time problem solving",
        topic: "Mathematics • Chapter 1-3",
        type: "live",
        status: "upcoming"
      },
      {
        month: "JAN",
        day: "17",
        title: "Weekly Assessment Test",
        details: "Comprehensive test covering calculus and analytical geometry",
        topic: "Mathematics • Evaluation",
        type: "test",
        status: "upcoming"
      },
      {
        month: "JAN",
        day: "20",
        title: "Physics Mechanics",
        details: "Newton's laws and applications in engineering problems",
        topic: "Physics • Mechanics",
        type: "live",
        status: "live"
      },
      {
        month: "JAN",
        day: "22",
        title: "Doubt Clearing Session",
        details: "Interactive Q&A session with subject matter experts",
        topic: "All Subjects • Support",
        type: "live",
        status: "upcoming"
      }
    ],
    jee: [
      {
        month: "JAN",
        day: "16",
        title: "Organic Chemistry",
        details: "Advanced organic reactions and mechanism study",
        topic: "Chemistry • Organic",
        type: "live",
        status: "upcoming"
      },
      {
        month: "JAN",
        day: "18",
        title: "JEE Mock Test",
        details: "Full-length JEE Main pattern mock test",
        topic: "All Subjects • Mock Test",
        type: "test",
        status: "upcoming"
      }
    ],
    gate: [
      {
        month: "JAN",
        day: "14",
        title: "Engineering Mathematics",
        details: "Linear algebra and differential equations",
        topic: "Mathematics • Core",
        type: "live",
        status: "upcoming"
      }
    ]
  };

  // Sample syllabus data
  const syllabusData: { [key: string]: string[] } = {
    college: [
      "Advanced Calculus & Analysis",
      "Linear Algebra & Matrices",
      "Differential Equations",
      "Complex Analysis",
      "Numerical Methods",
      "Statistics & Probability",
      "Engineering Physics",
      "Applied Mathematics"
    ],
    jee: [
      "Physics - Mechanics & Waves",
      "Physics - Thermodynamics",
      "Chemistry - Physical",
      "Chemistry - Organic",
      "Chemistry - Inorganic", 
      "Mathematics - Calculus",
      "Mathematics - Algebra",
      "Mathematics - Coordinate Geometry"
    ],
    gate: [
      "Engineering Mathematics",
      "General Aptitude",
      "Core Subject (Branch-wise)",
      "Technical Subjects",
      "Previous Year Analysis",
      "Mock Test Series"
    ]
  };

  const currentCourse = courseData[examname as string] || courseData.college;
  const currentSchedule = scheduleData[examname as string] || scheduleData.college;
  const currentSyllabus = syllabusData[examname as string] || syllabusData.college;

  const handleSubscriptionClick = () => {
    navigate('/profiles')
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-700 border-red-200';
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'live': return <Video className="w-4 h-4" />;
      case 'test': return <FileText className="w-4 h-4" />;
      case 'assignment': return <BookOpen className="w-4 h-4" />;
      default: return <PlayCircle className="w-4 h-4" />;
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
                  src="/Images/Monitoring.webp"
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
                        <span className="font-semibold">{currentCourse.rating}</span>
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
                      <div className="text-sm text-slate-600">Started on</div>
                      <div className="font-semibold text-slate-800">{currentCourse.startDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Duration</div>
                      <div className="font-semibold text-slate-800">{currentCourse.duration}</div>
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

        {/* Video Playlist Section */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">Course Content</h2>
              <div className="flex items-center gap-2 text-emerald-600">
                <PlayCircle className="w-5 h-5" />
                <span className="font-semibold">150+ Hours of Content</span>
              </div>
            </div>
            
            {/* Playlist placeholder */}
            <div className="bg-slate-50 rounded-2xl p-6 text-center border-2 border-dashed border-slate-300">
                <div className="my-8 h-[30rem] bg-gray-200 shadow-lg rounded-lg p-4">
                  <Playlist exam = {examname}/>
                </div>
            </div>
          </div>
        </section>

        {/* Schedule & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Schedule Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 sticky top-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Class Schedule</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 mb-1">Class Timings</div>
                    <div className="text-slate-600">Morning & Evening sessions</div>
                    <div className="text-slate-600">4 days per week</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 mb-1">Assessments</div>
                    <div className="text-slate-600">Weekly mock tests</div>
                    <div className="text-slate-600">Progress tracking</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 mb-1">Notifications</div>
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
                <div className="text-slate-800 font-semibold">Calculus Fundamentals</div>
                <div className="text-slate-600 text-sm">Tomorrow at 10:00 AM</div>
              </div>
            </div>
          </div>

          {/* Main Schedule Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-8">Upcoming Sessions</h3>
              
              <div className="space-y-6">
                {currentSchedule.map((session, index) => (
                  <div key={index} className="group border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200">
                    <div className="flex items-start gap-6">
                      {/* Date Badge */}
                      <div className="flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-4 text-center min-w-[80px]">
                        <div className="text-sm font-semibold text-slate-600">{session.month}</div>
                        <div className="text-2xl font-bold text-slate-800">{session.day}</div>
                      </div>

                      {/* Session Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {session.title}
                          </h4>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(session.status || 'upcoming')}`}>
                            {getTypeIcon(session.type || 'live')}
                            {session.status || 'upcoming'}
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
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">Course Syllabus</h2>
                  <p className="text-slate-600">Comprehensive curriculum designed for success</p>
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
                  <div key={index} className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all duration-200">
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
      </div>
      <Footer/>
    </div>
  );
}

export default ProfessionalCourseSchedule;