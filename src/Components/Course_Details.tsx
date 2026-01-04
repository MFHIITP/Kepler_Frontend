import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  CheckCircle, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Award, 
  Video, 
  FileText, 
  Headphones,
  Target,
  TrendingUp,
  Gift,
  ArrowRight,
  Play,
  Calendar,
  GraduationCap
} from "lucide-react";
import Footer from "./Footer";

interface Teacher {
  id: number;
  name: string;
  image: string;
  description: string;
  subjects?: string[];
  experience?: string;
  rating?: number;
  students?: string;
}

interface Benefit {
  benefit: string;
  availability: boolean;
}

function ProfessionalCourseDetails() {
  const { exam } = useParams();
  const navigate = useNavigate();

  const handlesubmitclick = () => {
    navigate(`/profiles`);
  };
  const teachersData = {
    languages: [
      {
        id: 1,
        name: "Purnendu Kumar Misra",
        image: "/Images/Shubhayan_image.jpg",
        subjects: ["Java", "C++"],
        experience: "1+ Years Teaching",
        rating: 4.9,
        students: "50+",
        description: "Specializes in Object Oriented Programming concepts and principles, with extensive experience in C++, Java and Python. Currently endeavouring to share his extensive knowledge with the enthusiasts on the platform."
      },
    ],
    webdev1: [
      {
        id: 1,
        name: "Vivek Haldar",
        image: "/Images/VivekHaldar.jpg",
        subjects: ["Frontend", "Backend", "DataBase", "DevOps"],
        experience: "1+ Years Teaching",
        rating: 4.9,
        students: "50+",
        description: "Learn from experts in the field of Full Stack Development and devOps, and prepare projects and applications that would leave everyone mesmerized."
      },
    ],
    dsa1: [
      {
        id: 1,
        name: "Irfan Gazi",
        image: "/Images/IrfanGazi.png",
        subjects: ["Arrays", "Linked Lists", "Binary Search", "Sliding Window", "Trees", "Graphs", "Dynamic Programming", "Tries"],
        experience: "1+ Years Teaching",
        rating: 4.8,
        students: "50+",
        description: "With his unbound expertise in the field of Data Structures and Algorithms, expect nothing less than the best when it comes to solving coding challenges like a pro."
      }
    ],
    fundamentals1: [
      {
        id: 1,
        name: "Farshid Hossain",
        image: "/Images/FarshidHossain.jpg",
        subjects: ["CN", "DBMS", "OS", "COA", "OOPS"],
        experience: "1+ Years Teaching",
        rating: 4.9,
        students: "50+",
        description: "With his direct and to the point approach to the principles of OOPS, DBMS, OS and System Design, get ready to sharpen and hone your skills in CS Fundamentals, and get a solid grasp on the domain."
      },
    ],
    ml1: [
      {
        id: 1,
        name: "Dipan Mondal",
        image: "/Images/DipanMondal.jpg",
        subjects: ["ML", "AI", "DL", "LLM"],
        experience: "1+ Years Teaching",
        rating: 4.9,
        students: "50+",
        description: "With his no nonsense approach the the field of Machine Learning, Deep Learning, Data Science and its associated principles, you would be able to dive deep into this ever widening field with a level of confidence that you have never had before."
      },
      // {
      //   id: 2,
      //   name: "Guest Faculty",
      //   image: "/Images/College_Prep.webp",
      //   subjects: ["ML", "AI", "DL", "LLM"],
      //   experience: "6+ Years Teaching",
      //   rating: 4.9,
      //   students: "5,000+",
      //   description: "IIT alumnus with exceptional track record in JEE preparation. Expert in both Physics and Mathematics with innovative teaching methods."
      // },
    ],
    webdev2: [
      {
        id: 1,
        name: "Vivek Haldar",
        image: "/Images/VivekHaldar.jpg",
        subjects: ["Frontend", "Backend", "DataBase", "DevOps"],
        experience: "1+ Years Teaching",
        rating: 4.9,
        students: "50+",
        description: "Learn from experts in the field of Full Stack Development and devOps, and prepare projects and applications that would leave everyone mesmerized."
      },
    ],
    dsa2: [
      {
        id: 1,
        name: "Irfan Gazi",
        image: "/Images/IrfanGazi.png",
        subjects: ["Tries", "Fenwick Trees", "Segment Trees", "Competetive Programming"],
        experience: "1+ Years Teaching",
        rating: 4.9,
        students: "50+",
        description: "Learn from the master of codeforces and an expert in the field of Competetive Programming and get ready to join the top 1% of coders club on the platform in specific, and in your locale in general."
      },
    ],
    fundamentals2: [
      {
        id: 1,
        name: "Farshid Hossain",
        image: "/Images/FarshidHossain.jpg",
        subjects: ["CN", "DBMS", "OS", "COA", "OOPS"],
        experience: "6+ Years Teaching",
        rating: 4.9,
        students: "5,000+",
        description: "With his direct and to the point approach to the principles of OOPS, DBMS, OS and System Design, get ready to sharpen and hone your skills in CS Fundamentals, and get a solid grasp on the domain.."
      },
    ],
    ml2: [
      {
        id: 1,
        name: "Dipan Mondal",
        image: "/Images/DipanMondal.jpg",
        subjects: ["ML", "AI", "DL", "LLM"],
        experience: "6+ Years Teaching",
        rating: 4.9,
        students: "5,000+",
        description: "With his no nonsense approach the the field of Machine Learning, Deep Learning, Data Science and its associated principles, you would be able to dive deep into this ever widening field with a level of confidence that you have never had before."
      },
    ]
  };

  const courseInfo = {
    languages: {
      title: "Computer Languages Mastery Program",
      subtitle: "Comprehensive preparation for all object oriented programming languages",
      image: "/Images/AllTeachers.jpg",
      highlights: [
        "Complete guidance from experts in the industry",
        "Interactive doubt-clearing sessions", 
        "Comprehensive study materials",
        "Regular assessments and feedback"
      ],
      duration: "6 - 9 months",
      students: "50+",
      rating: 4.8
    },
    fundamentals1: {
      title: "Complete Computer Fundamentals Program",
      subtitle: "Comprehensive preparation for Computer Networks, Database Management, Operating Systems and Computer Organization and Architechture",
      image: "/Images/AllTeachers.jpg", 
      highlights: [
        "Complete guidance from experts in the industry",
        "Interactive doubt-clearing sessions", 
        "Comprehensive study materials",
        "Regular assessments and feedback"
      ],
      duration: "6 - 9 months",
      students: "50+",
      rating: 4.9
    },
    webdev1: {
      title: "Complete Web Development package",
      subtitle: "Complete Full Stack Web Development with Dev Ops Masterclass",
      image: "/Images/AllTeachers.jpg",
      highlights: [
        "Complete guidance from experts in the industry",
        "Interactive doubt-clearing sessions", 
        "Comprehensive study materials",
        "Regular assessments and feedback"
      ],
      duration: "6 - 9 months",
      students: "50+", 
      rating: 4.7
    },
    dsa1: {
      title: "Complete DSA masterclass package",
      subtitle: "Targeted Preparation for all variations of DSA questions in any job interview",
      image: "/Images/AllTeachers.jpg",
      highlights: [
        "Complete guidance from experts in the industry",
        "Interactive doubt-clearing sessions", 
        "Comprehensive study materials",
        "Regular assessments and feedback"
      ],
      duration: "6 - 9 months",
      students: "50+", 
      rating: 4.7
    },
    ml1: {
      title: "Complete ML masterclass package",
      subtitle: "Targeted Preparation for all variations of ML questions in any job interview",
      image: "/Images/AllTeachers.jpg",
      highlights: [
        "Complete guidance from experts in the industry",
        "Interactive doubt-clearing sessions", 
        "Comprehensive study materials",
        "Regular assessments and feedback"
      ],
      duration: "6 - 9 months",
      students: "50+", 
      rating: 4.7
    },
    webdev2: {
      title: "Complete Web Development package",
      subtitle: "Complete Full Stack Web Development with Dev Ops Masterclass",
      image: "/Images/AllTeachers.jpg",
      highlights: [
        "Complete guidance from experts in the industry",
        "Interactive doubt-clearing sessions", 
        "Comprehensive study materials",
        "Regular assessments and feedback"
      ],
      duration: "6 - 9 months",
      students: "50+", 
      rating: 4.7
    },
    dsa2: {
      title: "Complete DSA masterclass package",
      subtitle: "Targeted Preparation for all variations of DSA questions in any job interview",
      image: "/Images/AllTeachers.jpg",
      highlights: [
        "Complete guidance from experts in the industry",
        "Interactive doubt-clearing sessions", 
        "Comprehensive study materials",
        "Regular assessments and feedback"
      ],
      duration: "6 - 9 months",
      students: "50+", 
      rating: 4.7
    },
    ml2: {
      title: "Complete Machine Learning package",
      subtitle: "Targeted Preparation for all variations of ML questions in any job interview",
      image: "/Images/AllTeachers.jpg",
      highlights: [
        "Complete guidance from experts in the industry",
        "Interactive doubt-clearing sessions", 
        "Comprehensive study materials",
        "Regular assessments and feedback"
      ],
      duration: "6 - 9 months",
      students: "50+", 
      rating: 4.7
    },
    fundamentals2: {
      title: "Complete Computer Fundamentals Program",
      subtitle: "Comprehensive preparation for Computer Networks, Database Management, Operating Systems and Computer Organization and Architechture",
      image: "/Images/AllTeachers.jpg", 
      highlights: [
        "Complete guidance from experts in the industry",
        "Interactive doubt-clearing sessions", 
        "Comprehensive study materials",
        "Regular assessments and feedback"
      ],
      duration: "6 - 9 months",
      students: "50+",
      rating: 4.9
    },
  };

  const benefits: Benefit[] = [
    { benefit: "Live Interactive Classes", availability: true },
    { benefit: "Recorded Video Lectures", availability: true },
    { benefit: "Comprehensive Study Materials", availability: true },
    { benefit: "Weekly Mock Tests", availability: true },
    { benefit: "1:1 Doubt Resolution", availability: true },
    { benefit: "Performance Analytics", availability: true },
    { benefit: "Mobile App Access", availability: true },
    { benefit: "Expert Mentorship", availability: true },
    { benefit: "Placement Guidance", availability: true }
  ];

  const getCurrentTeachers = (): Teacher[] => {
    return teachersData[exam as keyof typeof teachersData] || teachersData.college;
  };

  const getCurrentCourse = () => {
    return courseInfo[exam as keyof typeof courseInfo] || courseInfo.college;
  };

  const getExamTitle = () => {
    switch (exam) {
      case "languages": return "Master Technical Skills";
      case "dsa": return "Master Technical Skills";
      case "webdev": return "Master Technical Skills";
      case "fundamentals": return "Master Technical Skills";
      default: return "Competitive Exams";
    }
  };

  const handleEnrollClick = () => {
    navigate(`/courses/${exam}/details`);
  };

  const handleReferClick = () => {
    navigate("/courses/college/refercode");
  };

  const teachers = getCurrentTeachers();
  const course = getCurrentCourse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-[80rem] mx-auto py-12">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <GraduationCap className="w-4 h-4" />
            Premium Course Program
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
           {getExamTitle()}
            <span className="block text-blue-600">with Expert Guidance</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Join thousands of successful students who have achieved their academic goals 
            with our comprehensive learning programs and world-class faculty.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { icon: <Award className="w-5 h-5" />, text: "Proven Track Record" },
              { icon: <Users className="w-5 h-5" />, text: "Expert Faculty" },
              { icon: <Target className="w-5 h-5" />, text: "Result-Oriented" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200">
                <div className="text-emerald-600">{item.icon}</div>
                <span className="text-slate-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Faculty Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Learn from Industry Experts
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our carefully selected faculty brings years of experience and proven teaching methodologies
            </p>
          </div>

          <div className="flex justify-center gap-8">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="group md:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                <div className="p-8">
                  {/* Teacher Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-20 h-20 rounded-2xl object-cover shadow-md"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">
                        {teacher.name}
                      </h3>
                      <p className="text-blue-600 font-medium text-sm mb-2">
                        {teacher.experience}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{teacher.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{teacher.students}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects?.map((subject, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {teacher.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Course Spotlight */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="lg:flex">
              {/* Course Image */}
              <div className="lg:w-[75%] relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full bg-black h-80 lg:h-full object-fill"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Live Classes Available
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-current text-yellow-400" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-5 h-5" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                    {/* <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-colors">
                      <Play className="w-6 h-6" />
                    </button> */}
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="lg:w-1/2 px-8 py-5 lg:px-12">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <Award className="w-4 h-4" />
                    Recommended Program
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-3">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 text-lg mb-6">
                    {course.subtitle}
                  </p>
                </div>

                {/* Course Highlights */}
                <div className="space-y-4 mb-8">
                  {course.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Course Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700">Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">{course.students} Enrolled</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleEnrollClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
                  >
                    View Course Details
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-xl font-medium transition-colors">
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Referral Program */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative lg:flex items-center justify-between">
              <div className="lg:w-2/3 mb-8 lg:mb-0">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-6 h-6" />
                  <span className="text-purple-100 font-semibold">Referral Rewards</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  Earn While You Learn
                </h3>
                <p className="text-lg text-blue-100 mb-2">
                  Refer friends and earn cashback rewards:
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-blue-100">• ₹200 cashback for referring to your friends</p>
                </div>
                <button
                  onClick={handleReferClick}
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Start Referring
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <img
                    src="/Images/Referral_Image.png"
                    alt="Referral Rewards"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription & Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive features designed to accelerate your learning journey
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
            {/* Features Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                    <th className="text-left px-8 py-6 text-xl font-bold text-slate-800">Features & Benefits</th>
                    <th className="text-center px-8 py-6 text-xl font-bold text-blue-600">Included</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {benefits.map((benefit, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5 text-slate-700 font-medium">{benefit.benefit}</td>
                      <td className="px-8 py-5 text-center">
                        {benefit.availability ? (
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pricing Footer */}
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-emerald-50 p-8 border-t border-slate-200">
              <div className="max-w-md mx-auto text-center">
                <div className="mb-6">
                  <p className="text-slate-600 mb-2">Starting from</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl lg:text-5xl font-bold text-slate-800">₹999</span>
                    <div className="text-left">
                      <div className="text-slate-500 line-through text-lg">₹1,999</div>
                      <div className="text-slate-600">/month</div>
                    </div>
                  </div>
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    50% Limited Time Offer
                  </div>
                </div>
                
                <button
                  onClick={handlesubmitclick}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-5 h-5" />
                  Start Learning Today
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have achieved their dreams with our proven methodology
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleEnrollClick}
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-slate-600 hover:border-slate-500 text-white px-6 py-4 rounded-xl font-medium transition-colors">
                Schedule a Call
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}

export default ProfessionalCourseDetails;