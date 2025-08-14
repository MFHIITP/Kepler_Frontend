import React, { useEffect, useState, useContext, FC } from "react";
import { MyContext } from "../../main";
import { teamDetails, userdetails } from "../Interfaces/Details.interface";
import api from "../../utils/api";
import apiRoutes from "../../utils/Routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface addPersonInterface {
  teamName: string, 
  position: string,
  name: string, 
  phoneNumber: string, 
  emailId: string,
  degree: string, 
  linkedIn: string,
  description?: string
}

const getAllTeamMembers = async(teamName: string): Promise<teamDetails[]> => {
  const { data } = await api.get<teamDetails[]>(`${apiRoutes.teams.teamInfo.getTeam}/${teamName}`);
  return data;
}

const addTeamMember = async(values: addPersonInterface) => {
  const {data} = await api.post(apiRoutes.teams.teamUpdates.addPerson, values);
  return data;
}

const deleteTeamMember = async({email, teamName, emailId}: {email: string, teamName: string, emailId: string}) => {
  const {data} = await api.post(apiRoutes.teams.teamUpdates.deletePerson, {
    email: email,
    teamName: teamName,
    memberEmail: emailId
  });
  return data;
}

const ContentTeam: FC<{details: userdetails | undefined}> = ({ details }) => {
  const [team, setTeam] = useState<teamDetails[]>([])
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [Degree, setDegree] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [description, setDescription] = useState("");
  
  // Add delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<teamDetails | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  const context = useContext(MyContext);
  const adminemails = context?.adminemails ?? [];
  const isAdmin = adminemails.includes(details?.email ?? "");

  const { teamName } = useParams<{teamName: string}>();

  const resetForm = () => {
    setPosition("");
    setName("");
    setPhone("");
    setDegree("");
    setEmail("");
    setLinkedIn("");
    setDescription("");
  };

  const {mutate: getTeamMembersMutation} = useMutation({
    mutationFn: (teamName) => getAllTeamMembers(teamName!),
    onMutate: () => setTeam([]),
    onSuccess: (data) => {
      setTeam(data);
    },
    onError: () => {
      toast.error("Failed to fetch Team Details")
    }
  })

  const {mutate: addTeamMemberMutation} = useMutation({
    mutationFn: (data: addPersonInterface) => addTeamMember(data),
    onSuccess: () => {
      getTeamMembersMutation(teamName)
      resetForm();
      toast.success("Team member added successfully!");
    },
    onError: () => {
      toast.error("Upload failed")
    }
  })

  // Add delete mutation
  const {mutate: deleteTeamMemberMutation} = useMutation({
    mutationFn: ({ teamName, emailId }: { teamName: string, emailId: string }) => 
      deleteTeamMember({
        email: details?.email ?? "",
        teamName: teamName,
        emailId: emailId
      }),
    onSuccess: () => {
      toast.success("Team member deleted successfully!");
      setShowDeleteModal(false);
      setMemberToDelete(null);
      setDeleting(false);
      getTeamMembersMutation(teamName);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      toast.error("Failed to delete team member. Please try again.");
      setDeleting(false);
    },
    onMutate: () => {
      setDeleting(true);
    },
  });

  useEffect(() => {
    getTeamMembersMutation(teamName);
  }, [teamName])
  
  const handleSubmit = async () => {
    if (!position || !name || !email || !Phone || !Degree) {
      toast.error("Please fill in all required fields");
      return;
    }

    const data: addPersonInterface = {
      email: details?.email ?? "",
      teamName: teamName,
      position: position,
      name: name,
      emailId: email,
      phoneNumber: Phone,
      degree: Degree,
      linkedIn: linkedIn,
      description: description
    }
    addTeamMemberMutation(data);
  };

  // Add delete handlers
  const handleDeleteClick = (member: teamDetails, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (memberToDelete && teamName) {
      deleteTeamMemberMutation({  
        emailId: memberToDelete.emailid || "",
        teamName: teamName 
      });
    }
  };

  const formatTeamName = (name: string) => {
    const last4 = name.slice(-4);
    const firstPart = name.slice(0, -4);

    const firstWord = firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase();
    const secondWord = last4.charAt(0).toUpperCase() + last4.slice(1).toLowerCase();

    return `${firstWord} ${secondWord}`;
  };

  const getTeamIcon = (teamName: string) => {
    const name = teamName.toLowerCase();
    if (name.includes('tech') || name.includes('development')) return '💻';
    if (name.includes('marketing')) return '📈';
    if (name.includes('design')) return '🎨';
    if (name.includes('education') || name.includes('teaching')) return '🎓';
    if (name.includes('management')) return '👔';
    if (name.includes('hr') || name.includes('human')) return '👥';
    return '🌟';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-400 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="text-6xl mb-4">{getTeamIcon(teamName ?? "")}</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            {formatTeamName(teamName ?? "")}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Meet the brilliant minds powering Kepler 22B's mission to transform tech education
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group perspective-1000 w-full h-96 relative"
              >
                {/* Delete Button - Only visible to admins */}
                {isAdmin && (
                  <button
                    onClick={(e) => handleDeleteClick(member, e)}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-30 shadow-lg"
                    title="Delete team member"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}

                {/* Card Container with 3D Transform */}
                <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                  
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Gradient Background */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90"></div>
                    
                    {/* Avatar Placeholder */}
                    <div className="relative pt-8 pb-4 flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-white">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      {/* Position */}
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {member.position}
                        </h3>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
                      </div>

                      {/* Name */}
                      <h4 className="text-xl font-semibold text-gray-900 text-center mb-4">
                        {member.name}
                      </h4>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="font-medium">Degree:</span>
                          <span className="ml-2 text-gray-600 truncate">{member.degree}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="font-medium">Email:</span>
                          <a 
                            href={`mailto:${member.emailid}`}
                            className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 truncate"
                          >
                            {member.emailid}
                          </a>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="font-medium">Phone:</span>
                          <a 
                            href={`tel:${member.phonenumber}`}
                            className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            {member.phonenumber}
                          </a>
                        </div>
                      </div>

                      {/* Hover Indicator */}
                      {(member.description || member.linkedin) && (
                        <div className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 rounded-2xl shadow-lg border border-gray-100 overflow-hidden text-white">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                    </div>

                    <div className="relative p-6 h-full flex flex-col">
                      {/* Back Header */}
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <h4 className="text-lg font-semibold">{member.name}</h4>
                        <p className="text-blue-100 text-sm">{member.position}</p>
                      </div>

                      {/* Description */}
                      {member.description && (
                        <div className="mb-6 flex-grow">
                          <h5 className="text-sm font-semibold mb-2 text-blue-100">About</h5>
                          <p className="text-white text-sm leading-relaxed">
                            {member.description}
                          </p>
                        </div>
                      )}

                      {/* LinkedIn */}
                      {member.linkedin && (
                        <div className="mt-auto">
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-4 py-3 bg-white bg-opacity-20 text-white text-sm font-medium rounded-xl hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm"
                          >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            Connect on LinkedIn
                          </a>
                        </div>
                      )}

                      {/* No additional info message */}
                      {!member.description && !member.linkedin && (
                        <div className="flex-grow flex items-center justify-center">
                          <div className="text-center text-blue-100">
                            <div className="text-3xl mb-2">👋</div>
                            <p className="text-sm">No additional information available</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No team members found</h3>
            <p className="text-gray-500">Team members will appear here once they are added.</p>
          </div>
        )}
      </div>

      {/* Add Team Member Form */}
      <div
        className={`max-w-4xl mx-auto px-6 pb-16 ${
          isAdmin ? "" : "hidden"
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
              Add New Team Member
            </h3>
            <p className="text-blue-100 mt-2">Expand your team with talented individuals</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Position *</label>
                <input
                  type="text"
                  placeholder="e.g., Senior Software Engineer"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g., John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g., john@kepler22b.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g., +1 234 567 8900"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Degree/Education *</label>
                <input
                  type="text"
                  placeholder="e.g., M.S. Computer Science"
                  value={Degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">LinkedIn Profile</label>
                <input
                  type="url"
                  placeholder="e.g., https://linkedin.com/in/johndoe"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <textarea
                placeholder="Brief description about the team member's role and expertise..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Add Team Member
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && memberToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Remove Team Member</h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to remove this team member? This action cannot be undone.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">
                  {memberToDelete.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{memberToDelete.name}</h3>
                <p className="text-gray-600 text-sm">{memberToDelete.position}</p>
                <p className="text-gray-500 text-xs mt-1">{memberToDelete.email_id || memberToDelete.emailId}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setMemberToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Removing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Remove Member</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for 3D flip effect */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default ContentTeam;
