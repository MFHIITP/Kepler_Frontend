import React, { FC } from "react";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const About: FC<componentPropsInterface> = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Kepler 22B
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empowering India's white-collar workforce with cutting-edge technical and mathematical skills for the future job market
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Mission</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We bridge the gap between academic knowledge and industry requirements through hands-on, real-world problem-solving experiences that prepare learners for tomorrow's challenges.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">10+</div>
                <div className="text-sm text-gray-300">Students Trained</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-xl border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400">95%</div>
                <div className="text-sm text-gray-300">Placement Rate</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 flex items-center justify-center">
              <div className="text-6xl text-blue-400/50">🚀</div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-xl opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Core Objectives Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Our <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">Objectives</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Building India's future through comprehensive technical education and industry-aligned skill development
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "💼",
              title: "Workforce Empowerment",
              description: "Empower India's white-collar workforce with cutting-edge technical and mathematical skills for the future job market.",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              icon: "🌉",
              title: "Bridge Academic-Industry Gap",
              description: "Bridge the gap between academic knowledge and industry requirements through hands-on, real-world problem-solving.",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              icon: "🏆",
              title: "Coding Excellence Culture",
              description: "Create a nationwide culture of coding excellence, enabling students to secure top-tier placement opportunities.",
              gradient: "from-cyan-500 to-blue-500"
            },
            {
              icon: "💡",
              title: "Affordable Upskilling",
              description: "Deliver affordable and accessible upskilling programs tailored for individuals at all career stages.",
              gradient: "from-green-500 to-teal-500"
            },
            {
              icon: "🧠",
              title: "Innovation & Analytics",
              description: "Foster innovation and analytical thinking by integrating mathematics with modern computing disciplines.",
              gradient: "from-purple-500 to-indigo-500"
            },
            {
              icon: "🤝",
              title: "Learning Community",
              description: "Build a strong community of learners, mentors, and industry leaders collaborating for mutual growth.",
              gradient: "from-orange-500 to-red-500"
            },
            {
              icon: "📱",
              title: "Tech-Driven Platform",
              description: "Use technology-driven platforms to provide personalized, adaptive, and measurable learning experiences.",
              gradient: "from-blue-500 to-purple-500"
            },
            {
              icon: "🏢",
              title: "Industry Partnerships",
              description: "Partner with corporations and institutions to ensure direct employability of trained individuals.",
              gradient: "from-teal-500 to-cyan-500"
            },
            {
              icon: "🔮",
              title: "Future-Ready Curriculum",
              description: "Continuously evolve the curriculum to stay ahead of emerging trends like AI, data science, blockchain, and quantum computing.",
              gradient: "from-indigo-500 to-purple-500"
            },
            {
              icon: "🌍",
              title: "Global Recognition",
              description: "Contribute to India's global recognition as a hub for world-class technical talent.",
              gradient: "from-green-500 to-blue-500"
            }
          ].map((objective, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-r ${objective.gradient} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {objective.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {objective.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {objective.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Focus Areas */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Technology <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Focus Areas</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Specializing in cutting-edge technologies that shape the future of work
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Artificial Intelligence", color: "from-blue-500 to-cyan-500" },
            { name: "Data Science", color: "from-purple-500 to-pink-500" },
            { name: "Blockchain", color: "from-green-500 to-teal-500" },
            { name: "Quantum Computing", color: "from-indigo-500 to-purple-500" },
            { name: "Machine Learning", color: "from-cyan-500 to-blue-500" },
            { name: "Cloud Computing", color: "from-orange-500 to-red-500" },
            { name: "Web3 Technologies", color: "from-teal-500 to-cyan-500" },
            { name: "DevOps & MLOps", color: "from-purple-500 to-indigo-500" }
          ].map((tech, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500/40 transition-all duration-300 text-center"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <p className="text-white font-medium group-hover:text-blue-300 transition-colors">
                  {tech.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 border border-blue-500/30">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of professionals who have successfully transitioned into high-demand tech roles through our comprehensive programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            onClick={() => {navigate("/courses")}}>
              Explore Programs
            </button>
            <button className="px-8 py-4 border-2 border-blue-500 text-blue-400 font-semibold rounded-xl hover:bg-blue-500/10 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
      <Footer/>
    </div>
  );
}

export default About;