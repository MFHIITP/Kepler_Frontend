import React from "react";
import { Users, Github, Linkedin, Mail, Phone, Code, Link2, UserPlus, UserCheck, ExternalLink, MapPin, Briefcase, GraduationCap, Star, MessageSquare, Award, Globe, TrendingUp } from "lucide-react";
import { ConnectionUser } from "./Connection.interface";

interface Props {
  user: ConnectionUser;
  isConnected: boolean;
  isRequest?: boolean;

  handleConnect: (user: ConnectionUser) => void;  
  handleAcceptRequest: (user: ConnectionUser) => void;
  handleRejectRequest: (user: ConnectionUser) => void;
  openChat: (user: ConnectionUser) => void;
}

const ConnectionCard: React.FC<Props> = ({
  user,
  isConnected,
  isRequest = false,
  handleConnect,
  handleAcceptRequest,
  handleRejectRequest,
  openChat,
}) => {
  return (
    <div className="p-6">
      <div className="flex gap-4 mb-4">
        <div className="text-5xl flex-shrink-0">{user.avatar || "👤"}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {user.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <Mail size={14} />
                <span>{user.email}</span>
              </div>
              {user.isOpenToWork && (
                <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
                  <TrendingUp size={12} />
                  Open to Work
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-700 font-medium mb-1">
            {user.headline}
          </p>
          {user.location && (
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
              <MapPin size={14} />
              <span>{user.location}</span>
            </div>
          )}
          {user.company && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Briefcase size={14} />
              <span>{user.company}</span>
            </div>
          )}
        </div>
      </div>

      {user.bio && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.bio}</p>
      )}

      {isConnected && (
        <>
          {user.phone && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
              <Phone size={14} />
              <span>{user.phone}</span>
            </div>
          )}
          {user.education && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
              <GraduationCap size={14} />
              <span>{user.education}</span>
            </div>
          )}
        </>
      )}

      {user.mutualConnections && user.mutualConnections > 0 && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <Users size={14} />
          <span>{user.mutualConnections} mutual connections</span>
        </div>
      )}

      {user.techstack && user.techstack.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-2">
            <Code size={14} />
            <span>Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {user.techstack.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200"
              >
                {tech}
              </span>
            ))}
            {user.techstack.length > 5 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{user.techstack.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {isConnected && user.skills && user.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-2">
            <Award size={14} />
            <span>Top Skills</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {user.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {user.endorsements && (
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
          <Star size={14} className="text-yellow-500" />
          <span className="font-medium">{user.endorsements}</span>
          <span>endorsements</span>
        </div>
      )}

      {isConnected && (
        <div className="flex gap-2 mb-4 pb-4 border-b border-gray-200">
          {user.githuburl && (
            <a
              href={user.githuburl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Github size={16} />
              <ExternalLink size={12} />
            </a>
          )}
          {user.linkedinurl && (
            <a
              href={user.linkedinurl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Linkedin size={16} />
              <ExternalLink size={12} />
            </a>
          )}
          {user.portfoliourl && (
            <a
              href={user.portfoliourl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Globe size={16} />
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      )}

      {isConnected && user.projects && user.projects.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-2">
            <Link2 size={14} />
            <span>Featured Projects</span>
          </div>
          {user.projects.map((project, idx) => (
            <div
              key={idx}
              className="mb-2 p-2 bg-gray-50 rounded border border-gray-100"
            >
              <a
                href={project.githuburl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
              >
                {project.name}
                <ExternalLink size={12} />
              </a>
              <p className="text-xs text-gray-600 mt-1">
                {project.description}
              </p>
              {project.technologies && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, tidx) => (
                    <span
                      key={tidx}
                      className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isRequest ? (
        <div className="flex gap-2">
          <button
            onClick={() => handleAcceptRequest(user)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <UserCheck size={18} />
            <span>Accept</span>
          </button>
          <button
            onClick={() => handleRejectRequest(user)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Decline
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => (isConnected ? null : handleConnect(user))}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isConnected
                ? "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isConnected ? (
              <>
                <UserCheck size={18} />
                <span>Connected</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Connect</span>
              </>
            )}
          </button>
          {isConnected && (
            <button
              onClick={() => openChat(user)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <MessageSquare size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionCard;
