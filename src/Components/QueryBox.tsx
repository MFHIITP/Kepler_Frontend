import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";

function QueryBox() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    setSending(true)
    try {
      const response = await api.post(apiRoutes.querySending, {
          name: name,
          email: email,
          subject: subject,
          message: message,
        });
      if (response.status == 200) {
        toast.success("Thank you for your feedback");
      } else {
        toast.error("Message cannot be sent");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
    setSending(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
          <i className="fas fa-question-circle text-blue-600 text-2xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions about our courses? Need technical support? We're here to help you succeed.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="grid lg:grid-cols-3 gap-0">
          
          <div className="lg:col-span-2 p-8 lg:p-12">
            <div onSubmit={handlesubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <i className="fas fa-user absolute right-4 top-4 text-gray-400 text-sm"></i>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <i className="fas fa-envelope absolute right-4 top-4 text-gray-400 text-sm"></i>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="What's this about?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <i className="fas fa-tag absolute right-4 top-4 text-gray-400 text-sm"></i>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500"
                    placeholder="Tell us more about your question..."
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <i className="fas fa-comment-alt absolute right-4 top-4 text-gray-400 text-sm"></i>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  onClick={handlesubmit}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2 ${
                    sending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-2 border-white"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border-2 border-white"></div>
            </div>

            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">Contact Information</h2>
                <p className="text-blue-100">We're here to help you on your coding journey.</p>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    <i className="fas fa-phone text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Contact Number</p>
                    <a href="tel:+919903297707" className="text-blue-200 hover:text-white transition-colors">
                      +91 99032 97707
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    <i className="fas fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Email ID</p>
                    <a href="mailto:kepler.xxiib.cygnus@gmail.com" className="text-blue-200 hover:text-white transition-colors text-sm break-all">
                      kepler.xxiib.cygnus@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-2">Response Time</p>
                    <div className="text-blue-100 text-sm space-y-1">
                      <p>• General queries: 2 hours</p>
                      <p>• Technical support: 1 hour</p>
                      <p>• Course inquiries: Instant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueryBox;