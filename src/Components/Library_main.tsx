import React, { useState } from "react";
import { Search, BookOpen, Users, ChevronRight, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useNavigate } from "react-router-dom";
import { userdetails } from "./Interfaces/Details.interface";

interface LibraryResponseInterface{
  data: [string]
}

interface componentPropsInterface {
  details: userdetails | undefined;
}

interface LibraryResponseInterface{
  data: [string]
}

const getLibraryList = async (email: string) => {
  const { data } = await api.post<LibraryResponseInterface | null>(apiRoutes.library.getCourses, {
    emailId: email,
  });
  return data?.data;
};

const Library_main: React.FC<componentPropsInterface> = ({details}: {details: userdetails | undefined}) => {
  const [search, setSearch] = useState<string>("");

  const { data: libraryList, isLoading, error } = useQuery({
    queryKey: ["libraryCourses", details?.email],
    queryFn: () => getLibraryList(details?.email ?? ""),
    staleTime: 30 * 60 * 1000,
  });

  const navigate = useNavigate();

  const handleClick = (course: string) => {
    navigate(`/library/resources/${course}`);
  };

  const filteredlist = libraryList ? libraryList.filter((val: string) =>val.toLowerCase().includes(search.toLowerCase())) : [];

  const getCourseIcon = (courseName: string) => {
    if (courseName === 'Executive Group') {
      return <Users className="w-6 h-6" />;
    }
    return <BookOpen className="w-6 h-6" />;
  };

  const getCourseGradient = (courseName: string, index: number) => {
    if (courseName === 'Executive Group') {
      return 'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800';
    }
    
    const gradients = [
      'bg-gradient-to-br from-blue-500 to-cyan-600',
      'bg-gradient-to-br from-emerald-500 to-teal-600',
      'bg-gradient-to-br from-orange-500 to-red-600',
      'bg-gradient-to-br from-pink-500 to-rose-600',
      'bg-gradient-to-br from-violet-500 to-purple-600',
      'bg-gradient-to-br from-indigo-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-emerald-600',
      'bg-gradient-to-br from-yellow-500 to-orange-600'
    ];
    
    return gradients[index % gradients.length];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Unable to Load Courses</h2>
          <p className="text-slate-600">Please try refreshing the page or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Explore Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Library
              </span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
              Discover and explore your personalized collection of courses. Continue your journey towards mastering new skills.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 text-slate-800 placeholder-slate-500 transition-all duration-200"
                  type="text"
                  placeholder="Search for your course"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats Bar */}
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Available Courses</p>
                <p className="text-3xl font-bold text-slate-800">{filteredlist.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-600">{details?.email}</p>
                <p className="text-lg font-semibold text-indigo-600">{details?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredlist.map((val, index) => (
              <div
                key={index}
                onClick={() => handleClick(val)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Course Card */}
                  <div className={`${getCourseGradient(val, index)} p-8 text-white relative`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 transform rotate-45 translate-x-16 -translate-y-16">
                        <div className="w-full h-full bg-white rounded-lg"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 transform -rotate-45 -translate-x-12 translate-y-12">
                        <div className="w-full h-full bg-white rounded-lg"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                          {getCourseIcon(val)}
                        </div>
                        <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 leading-tight">
                        {val.replace(/^Computer Science - \s*/, "")}
                      </h3>
                      
                      {val === 'Executive Group' && (
                        <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                          <Sparkles className="w-4 h-4 mr-1" />
                          Premium
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No courses found</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              {search ? `No courses match your search for "${search}". Try adjusting your search terms.` : "No courses available in your library yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library_main;