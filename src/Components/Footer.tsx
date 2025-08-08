import React from "react";
import { Mail, Phone, Linkedin, Facebook, Instagram, MessageCircle, Code, BookOpen, Users, Award, ArrowUp } from "lucide-react";
import Anime from "./Anime";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = useNavigate();

  const quickLinks = [
    { name: 'DSA Courses' },
    { name: 'Web Development' },
    { name: 'Machine Learning' },
    { name: 'Programming Languages' },
    { name: 'Interview Prep' },
    { name: 'Practice Problems' }
  ];
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* About Section */}
            <div className="lg:col-span-1 py-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Kepler
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Transforming careers through innovative coding education. Master DSA, Web Dev, AI/ML, and programming with hands-on projects and expert mentorship.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4 py-6 text-white">Courses</h3>
              <ul className="space-y-3 mb-6">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <div onClick={(e) => navigate(`/courses/${link.name}`)}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center space-x-2 group cursor-pointer"
                    >
                      <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span>{link.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-xl font-bold mb-4 py-6 text-white">Connect</h3>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <a
                  href="mailto:kepler.xxiib.cygnus@gmail.com"
                  className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors duration-200 group"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">kepler.xxiib.cygnus@gmail.com</span>
                </a>
                
                <a
                  href="tel:+911234567890"
                  className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors duration-200 group"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+91 12345 67890</span>
                </a>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex space-x-3">
                  {[
                    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com', color: 'hover:bg-blue-600' },
                    { icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com', color: 'hover:bg-blue-700' },
                    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/astrosciclubju/profilecard/?igsh=ZmwwZWJ2bmhmdGhl', color: 'hover:bg-pink-600' },
                    { icon: <MessageCircle className="w-5 h-5" />, href: 'https://www.whatsapp.com', color: 'hover:bg-green-600' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-white/10 rounded-lg text-white ${social.color} transition-all cursor-pointer duration-200 hover:scale-110`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-4">
          <div className="container mx-auto px-6 py-6 my-4">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              
              {/* Logo and Copyright */}
              <div className="flex items-center space-x-4 mt-3">
                <img src="/Images/Kepler_Logo.png" alt="" height={30} width={30} className="rounded-lg"/>
                <Anime />
                <div className="text-sm text-gray-400">
                  © {new Date().getFullYear()} Kepler. Shaping the future of education. All rights reserved.
                </div>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to Top</span>
              </button>
            </div>

            {/* Legal Links */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
                <div className="hover:text-purple-400 transition-colors">Privacy Policy</div>
                <div className="hover:text-purple-400 transition-colors">Terms of Service</div>
                <div className="hover:text-purple-400 transition-colors">Cookie Policy</div>
                <div className="hover:text-purple-400 transition-colors">Refund Policy</div>
              </div>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;