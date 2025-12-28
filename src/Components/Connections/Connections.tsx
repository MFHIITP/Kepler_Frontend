import React, { useEffect, useState } from 'react';
import { Users, Github, Linkedin, Mail, Phone, Code, Link2, UserPlus, UserCheck, ExternalLink, MapPin, Briefcase, GraduationCap, Star, MessageSquare, Search, Filter, TrendingUp, Award, Calendar, Globe, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { UserDetails, ConnectionUser, Project, ProfileDetailsInterface, StreamEvent } from './Connection.interface';
import { useMutation } from '@tanstack/react-query';
import { acceptRejectConnectionRequest, getConnectionDetailsRequest, getDetailsNewConnection, savePersonalDetails, sendConnectionRequest } from './ConnectionRawRequests';
import apiRoutes from '../../utils/Routes/apiRoutes';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { messageFormatInterface } from './ConnectionMessages.interface';

const Connection: React.FC<{ details: UserDetails | [], refetch: () => void, email: string, connectionRequests: any[], setConnectionRequests: React.Dispatch<React.SetStateAction<any[]>>, newConnectionAcceptances: any[], messages: messageFormatInterface[] }> = ({ details: initialDetails, refetch, email, connectionRequests, setConnectionRequests, newConnectionAcceptances, messages }) => {
  const [details, setDetails] = useState<UserDetails>(initialDetails as UserDetails);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<UserDetails>(initialDetails as UserDetails);
  const [Loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  
  const [newTech, setNewTech] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState<Project>({
    name: '', 
    githuburl: '',
    websiteUrl: '',
    description: '',
    technologies: []
  });
  const [newProjectTech, setNewProjectTech] = useState('');
  
  const [activeTab, setActiveTab] = useState<'connections' | 'suggestions' | 'requests'>('connections');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTech, setFilterTech] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [activeChatUser, setActiveChatUser] = useState<ConnectionUser | null>(null);

  const [myConnections, setMyConnections] = useState<ConnectionUser[] | []>([]);

  const [suggestedConnections, setSuggestedConnections] = useState<ConnectionUser[]>([]);

  const {mutate: sendRequestMutation} = useMutation({
    mutationFn: ({senderEmail, receiverEmail}: {senderEmail: string, receiverEmail: string}) => sendConnectionRequest(senderEmail, receiverEmail),
    onMutate: () => setLoading(true),
    onSuccess: (response) => {
      setLoading(false);
      toast.success("Request Sent");
      suggestedConnections.filter(val => val.email != response.receiverEmail)
    },
    onError: () => {
      setLoading(false);
      toast.error("Failed to send request")
    }
  })

  const {mutate: acceptRejectMutation} = useMutation({
    mutationFn: ({senderEmail, receiverEmail, status}: {senderEmail: string, receiverEmail: string, status: boolean}) => acceptRejectConnectionRequest(senderEmail, receiverEmail, status),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to accept connection");
    }
  })

  useEffect(() => {
    if(initialDetails){
      setDetails(initialDetails as UserDetails);
    }
    return;
  }, [initialDetails])
  

  useEffect(() => {
    if(newConnectionAcceptances.length == 0){
      return;
    }
    setMyConnections((prevConnections) => {
      const updatedConnections = [...prevConnections];
      newConnectionAcceptances.forEach((newConnection) => {
        const exists = updatedConnections.some((connection) => connection.email == newConnection.email);
        if(!exists){
          updatedConnections.push(newConnection);
        }
      })
      return updatedConnections;
    });
  }, [newConnectionAcceptances])
  

  useEffect(() => {
    const controller = new AbortController();
    const startStream = async() => {
      try{
        const response = await fetch(`${import.meta.env.VITE_SERV_ADDR}/${apiRoutes.connection.getPersonalConnections}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/x-ndjson",
            "Authorizationaccesstoken": `Bearer ${Cookies.get("AccessToken") || ""}`,
          },
          body: JSON.stringify({
            email: email,
          }),
          signal: controller.signal,
        });
        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while(true){
          const {value, done} = await reader!.read();
          if(done){
            break;
          }
          buffer += decoder.decode(value, { stream:  true });
          const lines = buffer.split('\n');
          buffer = lines.pop()!;

          for(const line of lines){
            if(!line.trim()){
              continue;
            }
            const data: StreamEvent = JSON.parse(line);
            if(data.type == "start"){
              setTotal(data.total);
            }
            else if(data.type == "connection"){
              setMyConnections(prev => [...prev, data.connectionDetails]);
            }
          }
        }
      }
      catch(error) {
        if(error instanceof DOMException && error.name === "AbortError"){
          console.log("Stream aborted");
        }
        else{
          console.error("Error in streaming connections:", error);
        }
      }
    }
    startStream();

    return () => controller.abort();
  }, [email]);

  useEffect(() => {
    if(activeTab !== 'suggestions'){
      return;
    }
    const controller = new AbortController();
    const startStream = async() => {
      try{ 
        const response = await fetch(`${import.meta.env.VITE_SERV_ADDR}/${apiRoutes.connection.getConnectionSuggestions}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/x-ndjson",
            "Authorizationaccesstoken": `Bearer ${Cookies.get("AccessToken") || ""}`,
          },
          body: JSON.stringify({
            email: email,
          }),
          signal: controller.signal,
        })
        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        while(true){
          const {value, done} = await reader!.read();
          if(done){
            break;
          }

          buffer += decoder.decode(value, {stream: true});
          const lines = buffer.split("\n");
          buffer = lines.pop()!;

          for(const line of lines){
            if(!line.trim()){
              continue;
            }
            console.log(line);
            const data: StreamEvent = JSON.parse(line);
            console.log(data);
            if(data.type == "Connection"){
              setSuggestedConnections(prevSuggestions => {
                const sameSuggestions = prevSuggestions.some(suggestion => suggestion.email == data.responseData.email);
                if(sameSuggestions){
                  return prevSuggestions;
                }
                return [...prevSuggestions, data.responseData]
              });
            }
          }
        }
      }
      catch(error){
        if(error instanceof DOMException && error.name == "AbortError"){
          console.log("Stream Aborted");
        }
        else{
          console.error("Error in streaming connection suggestions", error);
        }
      }
    }

    startStream();

    return () => controller.abort();
  }, [email, activeTab])
  
  const handleConnect = (user: ConnectionUser) => {
    sendRequestMutation({senderEmail: email, receiverEmail: user.email});
    setSuggestedConnections(suggestedConnections.filter(connection => connection.email !== user.email));
  };

  const handleAcceptRequest = (user: ConnectionUser) => {
    acceptRejectMutation({senderEmail: user.email, receiverEmail: email, status: true});
    setConnectionRequests(connectionRequests.filter(connection => connection.email != user.email));
  };

  const handleRejectRequest = (user: ConnectionUser) => {
    acceptRejectMutation({senderEmail: user.email, receiverEmail: email, status: false});
    setConnectionRequests(connectionRequests.filter(connection => connection.email != user.email));
  };

  const handleDisconnect = (userId: string) => {
    const disconnectedUser = myConnections.find(u => u.id === userId);
    if (disconnectedUser) {
      setMyConnections(myConnections.filter(u => u.id !== userId));
      setSuggestedConnections([...suggestedConnections, disconnectedUser]);
    }
  };

  const filteredConnections = myConnections.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!filterTech || user.techstack?.some(tech => tech.toLowerCase().includes(filterTech.toLowerCase())))
  );

  const filteredSuggestions = suggestedConnections.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!filterTech || user.techstack?.some(tech => tech.toLowerCase().includes(filterTech.toLowerCase())))
  );

  const {mutate: savePersonalDetailsMutation} = useMutation({
    mutationFn: (personalDetails: ProfileDetailsInterface) => savePersonalDetails(personalDetails),
    onMutate: () => setLoading(true),
    onSuccess: () => {
      refetch();
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    }
  })

  const handleSaveProfile = () => {
    setDetails(editForm);
    const formDetails = {
      email: email,
      githuburl: editForm.githuburl,
      linkedinurl: editForm.linkedinurl,
      portfoliourl: editForm.portfoliourl,
      bio: editForm.bio,
      headline: editForm.headline,
      techstack: editForm.techstack,
      projects: editForm.projects,
      skills: editForm.skills,
      isOpenToWork: editForm.isOpenToWork,
      avatar: editForm.avatar,
      endorsements: editForm.endorsements,
    }
    savePersonalDetailsMutation(formDetails);
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditForm(details);
    setIsEditMode(false);
    setNewProject({ name: '', githuburl: '', websiteUrl: '', description: '', technologies: [] });
    setNewTech('');
    setNewSkill('');
  };

  const addTechStack = () => {
    if (newTech.trim()) {
      setEditForm({
        ...editForm,
        techstack: [...(editForm.techstack || []), newTech.trim()]
      });
      setNewTech('');
    }
  };

  const removeTechStack = (index: number) => {
    setEditForm({
      ...editForm,
      techstack: editForm.techstack?.filter((_, i) => i !== index)
    });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setEditForm({
        ...editForm,
        skills: [...(editForm.skills || []), newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills?.filter((_, i) => i !== index)
    });
  };

  const addProjectTechnology = () => {
    if (newProjectTech.trim()) {
      setNewProject({
        ...newProject,
        technologies: [...(newProject.technologies || []), newProjectTech.trim()]
      });
      setNewProjectTech('');
    }
  };

  const removeProjectTechnology = (index: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies?.filter((_, i) => i !== index)
    });
  };

  const addProject = () => {
    if (newProject.name && newProject.githuburl && newProject.description) {
      setEditForm({
        ...editForm,
        projects: [...(editForm.projects || []), { ...newProject }]
      });
      setNewProject({
        name: '',
        githuburl: '',
        websiteUrl: '',
        description: '',
        technologies: []
      });
    }
  };

  const removeProject = (index: number) => {
    setEditForm({
      ...editForm,
      projects: editForm.projects?.filter((_, i) => i !== index)
    });
  };

  const getLocation = () => {
    const parts = [details?.city || details?.work_city, details?.state || details?.work_state, details?.country || details?.work_country];
    return parts.filter(Boolean).join(', ');
  };

  const openChat = (user: ConnectionUser) => {
    setActiveChatUser(user);
  }
  const closeChat = () => {
    setActiveChatUser(null);
  }

  const handleSendMessages = () => {
    if(currentMessage.trim() && activeChatUser){
      const newMessage: messageFormatInterface = {
        sender: "me" as const,
        messageText: currentMessage.trim(),
        timeStamp: new Date()
      }

      // logic to send the message

      setCurrentMessage('');
    }
  }

  const ConnectionCard: React.FC<{ user: ConnectionUser; isConnected: boolean; isRequest?: boolean }> = ({ user, isConnected, isRequest }) => (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200">
      <div className="p-6">
        <div className="flex gap-4 mb-4">
          <div className="text-5xl flex-shrink-0">{user.avatar || '👤'}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 truncate">{user.name}</h3>
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
            <p className="text-sm text-gray-700 font-medium mb-1">{user.headline}</p>
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
                <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200">
                  {tech}
                </span>
              ))}
              {user.techstack.length > 5 && (
                <span className="text-xs text-gray-500 px-2 py-1">+{user.techstack.length - 5} more</span>
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
                <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
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
              <a href={user.githuburl} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                <Github size={16} />
                <ExternalLink size={12} />
              </a>
            )}
            {user.linkedinurl && (
              <a href={user.linkedinurl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                <Linkedin size={16} />
                <ExternalLink size={12} />
              </a>
            )}
            {user.portfoliourl && (
              <a href={user.portfoliourl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
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
              <div key={idx} className="mb-2 p-2 bg-gray-50 rounded border border-gray-100">
                <a href={project.githuburl} target="_blank" rel="noopener noreferrer"
                   className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                  {project.name}
                  <ExternalLink size={12} />
                </a>
                <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, tidx) => (
                      <span key={tidx} className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded border border-gray-200">
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
              onClick={() => isConnected ? null : handleConnect(user)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isConnected
                  ? 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
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
              <button onClick={() => openChat(user)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                <MessageSquare size={18} />
              </button>
            )}
          </div>
        )}
      </div>
      {/* Chat Window */}
      {activeChatUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{activeChatUser.avatar || '👤'}</div>
                <div className="text-white">
                  <h3 className="font-semibold">{activeChatUser.name}</h3>
                  <p className="text-sm text-blue-100">{activeChatUser.headline}</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {(!messages || messages.length === 0) ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <MessageSquare size={48} className="mb-2" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.sender === 'me'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.messageText}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {msg.timeStamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if(e.key == 'Enter'){
                      e.preventDefault();
                      handleSendMessages();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessages}
                  disabled={!currentMessage.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <span>Send</span>
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code size={32} className="text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CodeConnect</h1>
                <p className="text-xs text-gray-600">Professional Network for Developers</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search connections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Filter by technology:</label>
              <input
                type="text"
                placeholder="e.g. React, Python..."
                value={filterTech}
                onChange={(e) => setFilterTech(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              {filterTech && (
                <button
                  onClick={() => setFilterTech('')}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="text-6xl bg-white rounded-lg p-4 shadow-lg">👨‍💻</div>
              <div className="flex-1 text-white">
                <h2 className="text-3xl font-bold mb-2">{details?.name || "Name not found"}</h2>
                <p className="text-lg text-blue-100 mb-3">{details?.headline || 'Software Developer'}</p>
                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  {getLocation() && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{getLocation()}</span>
                    </div>
                  )}
                  {details?.work_company && (
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>{details?.work_company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{details?.email}</span>
                  </div>
                </div>
                {details?.techstack && details?.techstack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {details?.techstack.map((tech, idx) => (
                      <span key={idx} className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors mb-2"
                >
                  <Edit2 size={18} />
                  <span>Edit Profile</span>
                </button>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 mb-2">
                  <div className="text-3xl font-bold">{myConnections.length}</div>
                  <div className="text-sm text-blue-100">Connections</div>
                </div>
                {connectionRequests.length > 0 && (
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold">{connectionRequests.length}</div>
                    <div className="text-sm text-blue-100">Pending</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Section - Always Visible */}
        <div className="bg-gray-100 rounded-lg shadow-lg mb-6 p-6">
          <div className="space-y-6">
            {/* Bio */}
            {details?.bio && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">{details?.bio}</p>
              </div>
            )}

            {/* Work Experience */}
            {(details?.work_company || details?.work_position) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Briefcase size={20} />
                  Experience
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900">{details?.work_position}</p>
                  <p className="text-gray-700">{details?.work_company}</p>
                  {details?.work_duration && <p className="text-sm text-gray-500">{details?.work_duration}</p>}
                  {(details?.work_city || details?.work_state || details?.work_country) && (
                    <p className="text-sm text-gray-500 mt-1">
                      {[details?.work_city, details?.work_state, details?.work_country].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {(details?.college || details?.school) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GraduationCap size={20} />
                  Education
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {details?.education_type === 'college' && details?.college ? (
                    <>
                      <p className="font-medium text-gray-900">{details?.college}</p>
                      <p className="text-gray-700">
                        {[details?.college_stream, details?.college_department].filter(Boolean).join(', ')}
                      </p>
                      {details?.college_year && <p className="text-sm text-gray-500">Class of {details?.college_year}</p>}
                    </>
                  ) : details?.school ? (
                    <>
                      <p className="font-medium text-gray-900">{details?.school}</p>
                      {details?.school_year && <p className="text-sm text-gray-500">Class of {details?.school_year}</p>}
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {details?.techstack && details?.techstack.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Code size={20} />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details?.techstack.map((tech, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {details?.skills && details?.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award size={20} />
                  Top Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details?.skills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {(details?.githuburl || details?.linkedinurl || details?.portfoliourl) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Link2 size={20} />
                  Links
                </h3>
                <div className="flex gap-4">
                  {details?.githuburl && (
                    <a href={details?.githuburl} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                      <Github size={20} />
                      <span>GitHub</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {details?.linkedinurl && (
                    <a href={details?.linkedinurl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                      <Linkedin size={20} />
                      <span>LinkedIn</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {details?.portfoliourl && (
                    <a href={details?.portfoliourl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                      <Globe size={20} />
                      <span>Portfolio</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Projects */}
            {details?.projects && details?.projects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Code size={20} />
                  Featured Projects
                </h3>
                <div className="space-y-4">
                  {details?.projects.map((project, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">{project.name}</h4>
                      <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                      <div className="flex gap-3 mb-3">
                        <a href={project.githuburl} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                          <Github size={16} />
                          <span>GitHub</span>
                          <ExternalLink size={12} />
                        </a>
                        {project.websiteUrl && (
                          <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer"
                             className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                            <Globe size={16} />
                            <span>Live Demo</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, tidx) => (
                            <span key={tidx} className="text-xs bg-white text-gray-600 px-2 py-1 rounded border border-gray-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Open to Work Status */}
            {details?.isOpenToWork && (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <TrendingUp size={20} className="text-green-600" />
                <span className="text-gray-900 font-medium">Open to work opportunities</span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Modal/Section */}
        {isEditMode && (
          <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
              <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Headline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={editForm.headline || ''}
                  onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                  placeholder="e.g. Full Stack Developer | Open Source Enthusiast"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About / Bio
                </label>
                <textarea
                  value={editForm.bio || ''}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Tell others about yourself, your experience, and interests..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Social Links */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Github size={16} className="inline mr-1" />
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={editForm.githuburl || ''}
                    onChange={(e) => setEditForm({ ...editForm, githuburl: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Linkedin size={16} className="inline mr-1" />
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={editForm.linkedinurl || ''}
                    onChange={(e) => setEditForm({ ...editForm, linkedinurl: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe size={16} className="inline mr-1" />
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={editForm.portfoliourl || ''}
                    onChange={(e) => setEditForm({ ...editForm, portfoliourl: e.target.value })}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tech Stack
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                    placeholder="Add technology (e.g., React, Python)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={addTechStack}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editForm.techstack?.map((tech, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200 flex items-center gap-2">
                      {tech}
                      <button onClick={() => removeTechStack(idx)} className="text-blue-500 hover:text-blue-700">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Skills
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Add skill (e.g., System Design, API Development)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editForm.skills?.map((skill, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg flex items-center gap-2">
                      {skill}
                      <button onClick={() => removeSkill(idx)} className="text-gray-500 hover:text-gray-700">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Featured Projects
                </label>
                
                {/* Existing Projects */}
                <div className="space-y-3 mb-4">
                  {editForm.projects?.map((project, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                      <button
                        onClick={() => removeProject(idx)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                      <h4 className="font-semibold text-gray-900 mb-1">{project.name}</h4>
                      <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                      <div className="flex gap-2 text-xs text-gray-600">
                        <a href={project.githuburl} className="hover:underline">GitHub</a>
                        {project.websiteUrl && <a href={project.websiteUrl} className="hover:underline">Website</a>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Project */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-gray-900">Add New Project</h4>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Project Name *"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="url"
                    value={newProject.githuburl}
                    onChange={(e) => setNewProject({ ...newProject, githuburl: e.target.value })}
                    placeholder="GitHub URL *"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="url"
                    value={newProject.websiteUrl || ''}
                    onChange={(e) => setNewProject({ ...newProject, websiteUrl: e.target.value })}
                    placeholder="Website URL (optional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Project Description *"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newProjectTech}
                      onChange={(e) => setNewProjectTech(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProjectTechnology())}
                      placeholder="Add technology used"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={addProjectTechnology}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {newProject.technologies?.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-white text-gray-600 px-2 py-1 rounded border border-gray-300 flex items-center gap-1">
                        {tech}
                        <button onClick={() => removeProjectTechnology(idx)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={addProject}
                    disabled={!newProject.name || !newProject.githuburl || !newProject.description}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add Project
                  </button>
                </div>
              </div>

              {/* Open to Work */}
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <input
                  type="checkbox"
                  checked={editForm.isOpenToWork || false}
                  onChange={(e) => setEditForm({ ...editForm, isOpenToWork: e.target.checked })}
                  className="w-5 h-5"
                />
                <label className="text-gray-900 font-medium">Open to work opportunities</label>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 flex items-center justify-center gap-2"
                >
                  <X size={20} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('connections')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'connections'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              <span>My Network</span>
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {filteredConnections.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'suggestions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <UserPlus size={20} />
              <span>Discover</span>
              <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {filteredSuggestions.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'requests'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Calendar size={20} />
              <span>Requests</span>
              {connectionRequests.length > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {connectionRequests.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'connections' && (
          <div>
            {filteredConnections.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Users size={64} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchQuery || filterTech ? 'No connections match your filters' : 'No connections yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || filterTech ? 'Try adjusting your search or filters' : 'Start building your professional network'}
                </p>
                {!searchQuery && !filterTech && (
                  <button
                    onClick={() => setActiveTab('suggestions')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Find Connections
                  </button>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections.map(user => (
                  <ConnectionCard key={user.id} user={user} isConnected={true} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div>
            {filteredSuggestions.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <UserPlus size={64} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No suggestions available</h3>
                <p className="text-gray-600">Check back later for new connection recommendations</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSuggestions.map(user => (
                  <ConnectionCard key={user.email} user={user} isConnected={false} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            {connectionRequests.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No pending requests</h3>
                <p className="text-gray-600">You're all caught up with connection requests</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connectionRequests.map(user => (
                  <ConnectionCard key={user.email} user={user} isConnected={false} isRequest={true} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Connection;