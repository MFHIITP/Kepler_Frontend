import React, { useEffect, useState, useContext, FC } from "react";
import { MyContext } from "../../main";
import { componentPropsInterface } from "../Interfaces/ComponentProps.interface";
import { teamDetails } from "../Interfaces/Details.interface";
import api from "../../utils/api";
import apiRoutes from "../../utils/Routes/apiRoutes";

const PRTeam: FC<componentPropsInterface> = ({ details }) => {
  const [team, setTeam] = useState<teamDetails[]>([]);
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [Degree, setDegree] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const context = useContext(MyContext);
  const adminemails = context?.adminemails ?? [];
  const serv_addr = import.meta.env.VITE_SERV_ADDR

  useEffect(() => {
    const devteamcall = async () => {
      const { data } = await api.get(apiRoutes.teams.teamInfo.pr);
      setTeam(data);
      const priorityOrder = ["Team Convenor", "Assistant Convenor", "Coordinator"];
      team.sort((a: teamDetails, b: teamDetails) => {return priorityOrder.indexOf(a.position) - priorityOrder.indexOf(b.position)});
    };
    devteamcall();
  }, [serv_addr]);

  const resetForm = () => {
    setPosition("");
    setName("");
    setPhone("");
    setDegree("");
    setEmail("");
    setLinkedIn("");
  };

  const handleSubmit = async () => {
    const response = await api.post(
      apiRoutes.teams.teamUpdates.prAddition, {
          position: position,
          name: name,
          phone_number: Phone,
          email_id: email,
          degree: Degree,
          linkedin: linkedIn,
        });
    if (response.status === 200) {
      setTeam((prevTeam) => [
        ...prevTeam,
        {
          position: position,
          name: name,
          phone_number: Phone,
          email_id: email,
          degree: Degree,
          linkedin: linkedIn,
        },
      ]);
      resetForm();
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        PR Teams
      </h2>

      {/* Team Members */}
      <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <div
            key={index}
            className="member-card p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="position-info text-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                {member.position}
              </h3>
            </div>
            <div className="member-info text-left text-gray-700 space-y-2">
              <p>
                <strong>Name:</strong> {member.name}
              </p>
              <p>
                <strong>Phone:</strong> <a href={`tel:${member.phone_number}`}>{member.phone_number}</a>
              </p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${member.email_id}`}>{member.email_id}</a>
              </p>
              <p>
                <strong>Degree:</strong> {member.degree}
              </p>
            </div>
            {member.linkedin && (
              <div className="linkedin mt-4 text-center">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  LinkedIn Profile
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Team Member Form */}
      <div className={`mt-12 bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto ${adminemails.includes(details?.email ?? "") ? '' : 'hidden'}`}>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Add a New Team Member
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Degree"
            value={Degree}
            onChange={(e) => setDegree(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Phone"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            className="input-field"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Add Member
        </button>
      </div>
    </div>
  );
}

export default PRTeam;
