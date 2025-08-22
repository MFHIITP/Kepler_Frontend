import React, { useState, useEffect } from "react";
import { Search, Target, Code, Brain, Database, Globe, Network, ChevronRight, Star, Users, BookOpen, Zap, Headphones, MessageCircle, PenTool, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Popping from "./Popping";

function Part2() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const courses = [
    {
      title: "DSA - 1",
      exam: 'dsa1',
      description: "UpSkill your DSA skills from scratch to top industry level.",
      icon: <Database className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      level: "Beginner",
      duration: "6 - 9 months"
    },
    {
      title: "Web Dev - 1",
      exam: 'webdev1',
      description: "Start making websites from personal projects to industry projects.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      level: "Beginner",
      duration: "6 - 9 months"
    },
    {
      title: "Language",
      exam: 'language',
      description: "Learn all the languages necessary for industries in one go.",
      icon: <Code className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      level: "All Levels",
      duration: "6 - 9 months"
    },
    {
      title: "Machine Learning - 1",
      exam: 'ml1',
      description: "Hands-on ML with real datasets and competitions.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      level: "Intermediate",
      duration: "6 - 9 months"
    },
    {
      title: "Computer Fundamentals - 1",
      exam: 'fundamentals1',
      description: "Learn Computer Networks and Wireless technologies.",
      icon: <Network className="w-8 h-8" />,
      color: "from-teal-500 to-blue-500",
      level: "Beginner",
      duration: "6 - 9 months"
    },
    {
      title: "DSA - 2",
      exam: 'dsa2',
      description: "Focus on non-linear Data Structures to complete industry oriented DSA.",
      icon: <Database className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      level: "Advanced",
      duration: "6 - 9 months"
    },
  ];

  const keplerBenefits = [
    {
      title: "Code-Centric Curriculum",
      description: "Practical learning over theory. Build real projects from day one.",
      icon: <Code className="w-12 h-12" />,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Structured Progress Tracking",
      description: "Learn at your own pace with clear milestones and badges.",
      icon: <Target className="w-12 h-12" />,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "From Basics to Internships",
      description: "Complete journey from beginner to job-ready.",
      icon: <Star className="w-12 h-12" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Mentor Support + Live Doubts",
      description: "24/7 help from mentors and the community.",
      icon: <Headphones className="w-12 h-12" />,
      color: "from-pink-500 to-red-500"
    },
    {
      title: "Live Classes",
      description: "Chat with educators, ask questions, answer live polls, and get your doubts cleared - all while the class is going on",
      icon: <Zap className="w-12 h-12" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Mentorship Facilities",
      description: "Connect with seasoned mentors who are here to nurture your talent and help you navigate your journey.",
      icon: <Users className="w-12 h-12" />,
      color: "from-teal-500 to-cyan-500"
    },
    {
      title: "Practice and Revise",
      description: "Learning isn't just limited to classes with our practice section, mock tests and lecture notes shared as PDFs",
      icon: <PenTool className="w-12 h-12" />,
      color: "from-orange-500 to-yellow-500"
    },
    {
      title: "Community and Networking",
      description: "Build Connections That Last! Join a vibrant community of like-minded individuals and collaborate.",
      icon: <MessageCircle className="w-12 h-12" />,
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Learn anytime, anywhere",
      description: "One subscription gets you access to all our live and recorded classes from any device",
      icon: <Clock className="w-12 h-12" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Regular Monitoring through Tests",
      description: "Test Modules, carefully curated by our seasoned educators to help track your progress.",
      icon: <BookOpen className="w-12 h-12" />,
      color: "from-red-500 to-pink-500"
    },
  ];

  const filteredList = courses.filter((val) => {
    return val.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleCourseClick = (course) => {
    navigate(`/courses/${course.exam}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Search Section */}
      <Popping>
        <div className="relative pt-20 pb-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                Choose Your Learning Path
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Select your goals and start your journey to become industry-ready
              </p>
              
              {/* Enhanced Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={search}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 shadow-lg"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for courses, technologies, or skills..."
                />
              </div>
            </div>
          </div>
        </div>
      </Popping>

      {/* Popular Courses Section */}
      <Popping>
        <div className="container mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Popular Learning Goals</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredList.map((course, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
                onClick={() => handleCourseClick(course)}
              >
                {/* Course Icon with Gradient Background */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${course.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {course.icon}
                </div>
                
                {/* Course Content */}
                <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {course.title}
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {course.description}
                </p>
                
                {/* Course Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{course.level}</span>
                  <span>{course.duration}</span>
                </div>
                
                {/* Hover Arrow */}
                <div className="flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Start Learning</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
                
                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </Popping>

      {/* Brand Statement */}
      <Popping>
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900"></div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              KEPLER
            </h2>
            <p className="text-2xl md:text-3xl text-purple-200 font-light">
              Where Aspiration Meets Achievement
            </p>
          </div>
        </div>
      </Popping>

      {/* Why Choose Kepler Section */}
      <Popping>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Kepler?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience a comprehensive learning platform designed to transform your coding journey with cutting-edge features and personalized support.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keplerBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
                >
                  {/* Icon with Gradient Background */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Popping>
    </div>
  );
}

export default Part2;