import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, BookOpen, Users, Award, Target, HelpCircle, X, ArrowRight, Check, Star } from "lucide-react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function ProfessionalEducationPage() {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  // Sample data (replacing imported data)
  const heroImages = [
    { id: 0, src: "/Images/Live_Classes.webp", alt: "Live Interactive Classes", title: "Live Interactive Classes" },
    { id: 1, src: "/Images/Comminity_Networks.webp", alt: "Community Learning", title: "Community Learning Network" },
    { id: 2, src: "/Images/Mentorship.webp", alt: "Expert Mentorship", title: "Expert Mentorship Program" },
    { id: 3, src: "/Images/Monitoring.webp", alt: "Progress Monitoring", title: "Smart Progress Tracking" },
    { id: 4, src: "/Images/Practive_Revise.webp", alt: "Practice & Revision", title: "Adaptive Practice System" },
  ];const [exams, setExams] = useState([
    {
      image: "/Images/JEE_Prep.webp",
      name: "2 Year JEE Preparation",
      exam: "jee",
      description: "Comprehensive preparation for Joint Entrance Examination",
    },
    {
      image: "",
      name: "CAT Exam Preparation",
      exam: "cat",
      description: "Complete MBA entrance exam preparation program",
    },
    {
      image: "",
      name: "GATE Exam Preparation",
      exam: "gate",
      description: "Engineering graduate aptitude test preparation",
    },
    {
      image: "",
      name: "College Exams Preparation",
      exam: "college",
      description: "Semester and placement exam preparation",
    },
  ]);

  const [images] = useState([
    { ind: 0, img: "/Images/Live_Classes.webp" },
    { ind: 1, img: "/Images/Comminity_Networks.webp" },
    { ind: 2, img: "/Images/Mentorship.webp" },
    { ind: 3, img: "/Images/Monitoring.webp" },
    { ind: 4, img: "/Images/Practive_Revise.webp" },
  ]);

  const features = [
    {
      name: "Live Classes",
      icon: <Play className="w-6 h-6" />,
      description: "Interactive live sessions with expert educators and real-time doubt resolution",
      image: "/Images/Live_Image.png",
      gradient: "from-blue-600 to-blue-700",
      stats: "10+ Hours of Content"
    },
    {
      name: "Structured Courses",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Comprehensive curriculum designed by education experts for optimal learning outcomes",
      image: "/Images/Courses.png",
      gradient: "from-emerald-600 to-emerald-700",
      stats: "10+ Courses Available"
    },
    {
      name: "Study Groups",
      icon: <Users className="w-6 h-6" />,
      description: "Collaborative learning environment with peer-to-peer support and group discussions",
      image: "/Images/Batches.png",
      gradient: "from-purple-600 to-purple-700",
      stats: "50+ Active Students"
    },
    {
      name: "Expert Faculty",
      icon: <Award className="w-6 h-6" />,
      description: "Learn from industry veterans and top educators with proven track records",
      image: "/Images/Top_Educators.png",
      gradient: "from-orange-600 to-orange-700",
      stats: "10+ Expert Educators"
    },
    {
      name: "Smart Practice",
      icon: <Target className="w-6 h-6" />,
      description: "AI-powered adaptive practice system that personalizes your learning journey",
      image: "/Images/Practice.png",
      gradient: "from-cyan-600 to-cyan-700",
      stats: "10+ Practice Questions"
    },
    {
      name: "Doubt Resolution",
      icon: <HelpCircle className="w-6 h-6" />,
      description: "Instant doubt clearing with detailed explanations and step-by-step solutions",
      image: "/Images/Doubts.png",
      gradient: "from-rose-600 to-rose-700",
      stats: "24/7 Support Available"
    },
  ];

  const examPrograms = [
    {
      name: "Languages",
      exam: "languages",
      description: "Comprehensive programme for learning popular Object Oriented Languages like C++, Java and Python",
      image: "/Images/JEE_Prep.webp",
      features: ["Live Classes", "Mock Tests", "Doubt Sessions", "Study Material"],
      rating: 4.8,
      // students: "25,000+"
    },
    {
      name: "Data Structures and Algorithms", 
      exam: "dsa",
      description: "Comprehensive DSA and industry oriented coding that will almost surely land you a job in your dream company",
      image: "/Images/CAT_Prep.webp",
      features: ["Live Classes", "Live Coding", "Interactive Sessions", "Doubt Clearing"],
      rating: 4.9,
      // students: "15,000+"
    },
    {
      name: "Web Technologies",
      exam: "webdev",
      description: "Comprehensive Web Development sessions complete with Frontend, Backend, Database and DevOps, and land a full stack job in the company of your choice",
      image: "/Images/GATE_Prep.webp", 
      features: ["Technical Subjects", "Live Classes", "Doubt Clearing", "Full Stack Projects"],
      rating: 4.7,
      // students: "20,000+"
    },
    {
      name: "CS Fundamentals",
      exam: "fundamentals",
      description: "Complete CS Fundamentals package comprising Computer Networks, Database Management, Operating Systems and Computer Organization and Architechture and gain the necessary expertise to thrive in the current job market",
      image: "/Images/College_Prep.webp",
      features: ["DBMS", "OS", "COA", "CN"],
      rating: 4.6,
      // students: "30,000+"
    },
    {
      name: "Machine Learning",
      exam: "ml",
      description: "Complete Machine Learning package with algorithms, Deep Learning, Neural Network and Large Language Models",
      image: "/Images/College_Prep.webp",
      features: ["AI", "ML", "LLMs", "DL"],
      rating: 4.6,
      // students: "30,000+"
    },
  ];

  const modalContent = {
    "Live Classes": {
      title: "Interactive Live Classes",
      subtitle: "Real-time learning with expert educators",
      content: [
        {
          question: "What makes our live classes special?",
          answer: "Our live classes feature real-time interaction, instant doubt resolution, and engagement tools that make learning interactive and effective."
        },
        {
          question: "Can I access recorded sessions?",
          answer: "Yes, all live classes are automatically recorded and available for review within 24 hours, with lifetime access included."
        },
        {
          question: "What technology do you use?",
          answer: "We use cutting-edge streaming technology ensuring crystal-clear video quality, minimal latency, and seamless user experience across all devices."
        }
      ]
    }
    // Add other modal content as needed
  };

  // Auto-rotate hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setImageIndex((prev) => (prev + 1) % heroImages.length);
        setFade(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigateImage = (direction) => {
    setFade(true);
    setTimeout(() => {
      if (direction === 'next') {
        setImageIndex((prev) => (prev + 1) % heroImages.length);
      } else {
        setImageIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
      }
      setFade(false);
    }, 300);
  };

  const openModal = (featureName) => {
    setSelectedFeature(featureName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedFeature(""), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Hero Section */}
      <section className={`relative max-w-7xl mx-auto px-6 py-12 ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
          <div className="relative">
            {/* Hero Image */}
            <div className="relative h-80 lg:h-96 overflow-hidden">
              <img
                src={heroImages[imageIndex].src}
                alt={heroImages[imageIndex].alt}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  fade ? "opacity-50 scale-105" : "opacity-100 scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-transparent to-transparent"></div>
              
              {/* Hero Content Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-2xl px-8 lg:px-12 text-white">
                  <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                    {heroImages[imageIndex].title}
                  </h1>
                  <p className="text-lg lg:text-xl mb-6 text-blue-100">
                    Transform your academic journey with India's most trusted online learning platform
                  </p>
                  <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                  onClick={() => navigate("/profiles")}>
                    Start Learning Today
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === imageIndex ? "bg-white scale-110" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Header */}
      <section className={`max-w-7xl mx-auto px-6 py-16 text-center ${isModalOpen ? 'blur-sm' : ''}`}>
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
          Excel in Job Interviews and UpSkill in Technical Roles 
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Join over 100,000 students who have achieved their academic goals with Kepler's 
          comprehensive learning ecosystem and expert guidance.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" />
            <span>Expert Industry Based Faculties</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" />
            <span>99% Success Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" />
            <span>24/7 Support</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={`max-w-7xl mx-auto px-6 py-16 ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => openModal(feature.name)}
              className="group bg-white rounded-xl border border-slate-200 p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {feature.icon}
                </div>
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm">
                  <img src={feature.image} alt={feature.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.name}
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="text-sm font-semibold text-emerald-600 mb-4">
                {feature.stats}
              </div>

              {/* Action Indicator */}
              <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exam Programs */}
      <section className={`max-w-7xl mx-auto px-6 py-16 ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Choose Your Success Path
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Specialized programs designed to help you excel in your target examination
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {examPrograms.map((program, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300 cursor-pointer"
              onClick={() => {
                  navigate(`/courses/${program.exam}`);
                }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-slate-700">{program.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {program.name}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {program.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    {/* <span className="font-semibold text-slate-700">{program.students}</span> students enrolled */}
                  </div>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Course
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className={`max-w-7xl mx-auto px-6 py-16 ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-8">Trusted by Students Nationwide</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-blue-100">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Expert Faculty</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5M+</div>
              <div className="text-blue-100">Hours Taught</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ${
        isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
        <div className={`bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}>
          {/* Modal Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-8 py-6 rounded-t-3xl flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{modalContent[selectedFeature]?.title || selectedFeature}</h2>
              <p className="text-slate-600 mt-1">{modalContent[selectedFeature]?.subtitle}</p>
            </div>
            <button
              onClick={closeModal}
              className="bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-600 p-2 rounded-xl transition-all hover:scale-105"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-8">
            {selectedFeature && modalContent[selectedFeature] && (
              <div className="space-y-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200">
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">
                    Online Live Classes for College Semester Exams
                  </h3>
                  <p className="text-xl text-slate-700">
                    Experience interactive learning with our expert educators through live and recorded classes
                    designed for comprehensive exam preparation.
                  </p>
                </div>

                {/* FAQ Section */}
                <div className="space-y-6">
                  {modalContent[selectedFeature].content.map((item, index) => (
                    <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                      <h4 className="text-xl font-bold text-slate-800 mb-3">{item.question}</h4>
                      <p className="text-slate-700 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-center pt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                  onClick={() => navigate("/profiles")}>
                    Get Started Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ProfessionalEducationPage;