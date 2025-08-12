import React, { FC, useEffect, useState, useContext } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { userdetails } from "./Interfaces/Details.interface";
import { MyContext } from "../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUsers, 
  faUserShield, 
  faUser, 
  faCrown, 
  faInfoCircle,
  faCalendarAlt,
  faUserPlus,
  faSearch,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

interface GroupMembersInterface {
  key: string,
  groupName: string,
  details: userdetails,
  groupDescription: string,
  mobileView: string,
  changeView: React.Dispatch<React.SetStateAction<string>>
}

const Group_Members: React.FC<GroupMembersInterface> = (props) => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  
  const context = useContext(MyContext);
  const adminemails = context?.adminemails;

  useEffect(() => {
    const participant_find = async () => {
      try {
        setLoading(true);
        const response = await api.post(apiRoutes.chat.groupMembers.memberList, {
          groupName: props.groupName,
        });
        if (response.status === 200) {
          console.log(response.data);
          setParticipants(response.data.participant_list);
        }
      } catch (error) {
        console.error("Failed to fetch participants:", error);
      } finally {
        setLoading(false);
      }
    };
    participant_find();
  }, [props.groupName]);

  const generateAvatar = (name: string) => {
    const colors = [
      'from-red-400 to-red-600', 'from-blue-400 to-blue-600', 
      'from-green-400 to-green-600', 'from-purple-400 to-purple-600', 
      'from-pink-400 to-pink-600', 'from-indigo-400 to-indigo-600', 
      'from-yellow-400 to-yellow-600', 'from-teal-400 to-teal-600',
      'from-orange-400 to-orange-600', 'from-cyan-400 to-cyan-600'
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;
    return colors[colorIndex];
  };

  const isAdmin = (email: string) => {
    return adminemails?.includes(email);
  };

  const filteredParticipants = participants.filter(participant =>
    participant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] overflow-auto scrollbar-thin bg-white flex flex-col shadow-xl">

      {/* Group Description */}
      {props.groupDescription && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 text-sm" />
            </div>
            <div className="">
              <button className="p-2 rounded-full md:hidden text-white bg-green-600 shadow-lg" onClick={() => props.changeView(props.groupName)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              <p className="text-sm font-medium text-gray-800 mb-1">Group Description</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {props.groupDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Group Stats */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FontAwesomeIcon icon={faUsers} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{participants.length}</p>
            <p className="text-xs text-gray-600">Total Members</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FontAwesomeIcon icon={faUserShield} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {participants.filter(p => isAdmin(p)).length}
            </p>
            <p className="text-xs text-gray-600">Admins</p>
          </div>
        </div>
      </div>

      {/* Search and Add Member */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Members List */}
      <div className="overflow-y-auto scrollbar-thin">
        <div className="p-4 space-y-3">
          {filteredParticipants.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FontAwesomeIcon icon={faUsers} className="text-gray-400 text-xl" />
              </div>
              <p className="text-gray-500">
                {searchTerm ? 'No members found' : 'No members in this group'}
              </p>
            </div>
          ) : (
            filteredParticipants.map((participant, index) => {
              const isParticipantAdmin = isAdmin(participant);
              const isCurrentUser = participant === props.details.email;
              
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-emerald-200 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className={`relative w-12 h-12 bg-gradient-to-br ${generateAvatar(participant)} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                      {participant[0]?.toUpperCase()}
                      
                      {/* Admin Badge */}
                      {isParticipantAdmin && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                          <FontAwesomeIcon icon={faCrown} className="text-white text-xs" />
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-800 truncate">
                          {participant}
                        </p>
                        {isCurrentUser && (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-1">
                        <FontAwesomeIcon 
                          icon={isParticipantAdmin ? faUserShield : faUser} 
                          className={`text-sm ${
                            isParticipantAdmin ? 'text-yellow-600' : 'text-gray-400'
                          }`} 
                        />
                        <p className={`text-sm ${
                          isParticipantAdmin ? 'text-yellow-600 font-medium' : 'text-gray-500'
                        }`}>
                          {isParticipantAdmin ? 'Administrator' : 'Member'}
                        </p>
                      </div>
                    </div>

                    {/* Online Status */}
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUserPlus} className="text-emerald-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Add New Member</h3>
              <p className="text-gray-600">Enter the email address of the person you want to add</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter email address..."
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                autoFocus
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowAddMember(false);
                    setNewMemberEmail("");
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  // onClick={handleAddMember}
                  disabled={!newMemberEmail.trim()}
                  className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Group_Members;