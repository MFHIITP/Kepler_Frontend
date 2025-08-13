import ReactPlayer from "react-player/youtube";
import React, { useState } from "react";
import {
  Play,
  PlayCircle,
  Clock,
  Eye,
  CheckCircle,
  Lock,
  Download,
  BookOpen,
  Video,
  FileText,
  Star,
  Volume2,
  Settings,
  Maximize,
  SkipBack,
  SkipForward,
  Pause,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { playlistData } from "../lists";

export interface VideoItem {
  id: number;
  name: string;
  time: string;
  type: "youtube" | "drive" | "live";
  link: string;
  image: string;
  duration?: string;
  views?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  chapter?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

function ProfessionalVideoPlaylist({ exam }: { exam: string }) {
  const [selectedVideoId, setSelectedVideoId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [ind, setIndex] = useState(1);
  const [showPlaylist, setShowPlaylist] = useState(false); // For mobile toggle

  const currentPlaylist = playlistData[exam] || playlistData.college;
  const selectedVideo =
    currentPlaylist.find((video) => video.id === selectedVideoId) ||
    currentPlaylist[0];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "youtube":
        return <Video className="w-4 h-4 text-red-500" />;
      case "drive":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "live":
        return <PlayCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  const handleVideoSelect = (videoId: number) => {
    const video = currentPlaylist.find((v) => v.id === videoId);
    if (video && !video.isLocked) {
      setSelectedVideoId(videoId);
      setIsPlaying(false);
      setCurrentProgress(0);
      setShowPlaylist(false); // Close playlist on mobile after selection
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full bg-white rounded-none md:rounded-2xl border-0 md:border md:border-slate-200 shadow-none md:shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Main Video Player */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Video Container */}
          <div className="relative bg-black aspect-video lg:flex-1 lg:aspect-auto flex items-center justify-center overflow-hidden">
            {selectedVideo.type === "drive" ? (
              <div className="w-full h-full relative">
                <iframe
                  src={selectedVideo.link}
                  allowFullScreen
                  className="w-full h-full"
                  onContextMenu={(e) => e.preventDefault()}
                  title={selectedVideo.name}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <div className="h-full">
                  <ReactPlayer
                    url={selectedVideo.link}
                    playing={isPlaying}
                    controls={true}
                    light={true}
                    width="100%"
                    height="100%"
                    onPlay={() => console.log("Video is playing")}
                    config={{
                      youtube: {
                        playerVars: {
                          modestbranding: 1,
                          rel: 0,
                          showinfo: 0,
                          controls: 1,
                        },
                      },
                    }}
                  />
                </div>

                <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex justify-between items-start">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2">
                    {getTypeIcon(selectedVideo.type)}
                    <span className="hidden sm:inline">{selectedVideo.type.toUpperCase()}</span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                    {selectedVideo.duration}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div
                    className="bg-red-600 h-1"
                    style={{ width: `${currentProgress}%` }}
                  ></div>
                  <div className="bg-white/30 h-1"></div>
                </div>
              </div>
            )}
          </div>

          {/* Video Controls & Info */}
          <div className="p-4 md:p-6 border-t border-slate-200">
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3 sm:gap-0">
                <h2 className="text-lg md:text-2xl font-bold text-slate-800 leading-tight">
                  {selectedVideo.name}
                </h2>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors touch-manipulation">
                    <Settings className="w-4 md:w-5 h-4 md:h-5 text-slate-600" />
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors touch-manipulation">
                    <Download className="w-4 md:w-5 h-4 md:h-5 text-slate-600" />
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors touch-manipulation">
                    <Maximize className="w-4 md:w-5 h-4 md:h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-slate-600 mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 md:w-4 h-3 md:h-4" />
                  {selectedVideo.views} views
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 md:w-4 h-3 md:h-4" />
                  {selectedVideo.duration}
                </div>
                <div
                  className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                    selectedVideo.difficulty || "beginner"
                  )}`}
                >
                  {selectedVideo.difficulty?.toUpperCase()}
                </div>
              </div>

              <div className="text-blue-600 font-semibold text-sm mb-4">
                {selectedVideo.chapter}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-2 md:gap-3">
                <button className="bg-slate-100 hover:bg-slate-200 p-2.5 md:p-3 rounded-xl transition-colors touch-manipulation">
                  <SkipBack className="w-4 md:w-5 h-4 md:h-5 text-slate-700" />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="bg-blue-600 hover:bg-blue-700 p-2.5 md:p-3 rounded-xl transition-colors touch-manipulation"
                >
                  {isPlaying ? (
                    <Pause className="w-4 md:w-5 h-4 md:h-5 text-white" />
                  ) : (
                    <Play className="w-4 md:w-5 h-4 md:h-5 text-white ml-0.5" />
                  )}
                </button>
                <button className="bg-slate-100 hover:bg-slate-200 p-2.5 md:p-3 rounded-xl transition-colors touch-manipulation">
                  <SkipForward className="w-4 md:w-5 h-4 md:h-5 text-slate-700" />
                </button>
                <button className="bg-slate-100 hover:bg-slate-200 p-2.5 md:p-3 rounded-xl transition-colors touch-manipulation">
                  <Volume2 className="w-4 md:w-5 h-4 md:h-5 text-slate-700" />
                </button>
              </div>

              <div className="text-xs md:text-sm text-slate-600">
                Video {selectedVideoId} of {currentPlaylist.length}
              </div>
            </div>
          </div>

          {/* Mobile Playlist Toggle */}
          <div className="lg:hidden border-t border-slate-200">
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="w-full p-4 flex items-center justify-between text-slate-700 hover:bg-slate-50 transition-colors touch-manipulation"
            >
              <span className="font-semibold">
                Course Videos ({currentPlaylist.length})
              </span>
              {showPlaylist ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Playlist Sidebar */}
        <div className={`
          w-full lg:w-80 xl:w-96 border-l-0 lg:border-l border-slate-200 flex flex-col
          ${showPlaylist ? 'block' : 'hidden lg:flex'}
          ${showPlaylist ? 'max-h-96 lg:max-h-none' : ''}
        `}>
          {/* Playlist Header - Hidden on mobile when collapsed */}
          <div className={`
            p-4 md:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50
            ${showPlaylist ? 'block' : 'hidden lg:block'}
          `}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-800">
                Course Videos
              </h3>
              <div className="bg-blue-100 text-blue-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                {currentPlaylist.length} Videos
              </div>
            </div>
            <div className="text-xs md:text-sm text-slate-600">
              Complete all videos to unlock the next chapter
            </div>
          </div>

          {/* Video List */}
          <div className={`
            flex-1 overflow-y-auto
            ${showPlaylist ? 'block' : 'hidden lg:block'}
          `}>
            <div className="p-3 md:p-4 space-y-2 md:space-y-3">
              {currentPlaylist.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video.id)}
                  className={`group rounded-xl border transition-all duration-200 cursor-pointer touch-manipulation ${
                    video.id === selectedVideoId
                      ? "border-blue-300 bg-blue-50 shadow-md"
                      : video.isLocked
                      ? "border-slate-200 bg-slate-50 cursor-not-allowed opacity-60"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
                  }`}
                >
                  <div className="p-3 md:p-4">
                    <div className="flex gap-3 md:gap-4">
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.image}
                          alt={video.name}
                          className="w-16 md:w-20 h-9 md:h-11 rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                          {video.isLocked ? (
                            <Lock className="w-3 md:w-4 h-3 md:h-4 text-white" />
                          ) : (
                            <div className="scale-75 md:scale-100">
                              {getTypeIcon(video.type)}
                            </div>
                          )}
                        </div>
                        <div className="absolute bottom-0.5 md:bottom-1 right-0.5 md:right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {video.time}
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1 md:mb-2">
                          <h4
                            className={`font-semibold text-xs md:text-sm leading-tight line-clamp-2 ${
                              video.id === selectedVideoId
                                ? "text-blue-700"
                                : "text-slate-800"
                            }`}
                          >
                            {video.name}
                          </h4>
                          {video.isCompleted && (
                            <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          )}
                        </div>

                        <div className="text-xs text-slate-500 mb-1 md:mb-2 truncate">
                          {video.chapter}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Eye className="w-2.5 md:w-3 h-2.5 md:h-3" />
                            <span className="truncate">{video.views}</span>
                          </div>
                          <div
                            className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                              video.difficulty || "beginner"
                            )}`}
                          >
                            <span className="hidden sm:inline">
                              {video.difficulty}
                            </span>
                            <span className="sm:hidden">
                              {video.difficulty?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Footer */}
          <div className={`
            p-4 md:p-6 border-t border-slate-200 bg-slate-50
            ${showPlaylist ? 'block' : 'hidden lg:block'}
          `}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-700">
                Course Progress
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {Math.round(
                  (currentPlaylist.filter((v) => v.isCompleted).length /
                    currentPlaylist.length) *
                    100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (currentPlaylist.filter((v) => v.isCompleted).length /
                      currentPlaylist.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              {currentPlaylist.filter((v) => v.isCompleted).length} of{" "}
              {currentPlaylist.length} videos completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalVideoPlaylist;
