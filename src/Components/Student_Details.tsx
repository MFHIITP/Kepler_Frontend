import React, { useEffect, useState } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const getUserInformation = async(emailId: string) => {
  const { data } = await api.post(apiRoutes.user.getProfile, {
    emailId: emailId
  })
  return data;
}

// Icon Components
const UserIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const SaveIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const XIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const AcademicCapIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
  </svg>
);

const BuildingLibraryIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

function Student_Details(props) {
  const [countries, setCountries] = useState<string[]>([]);
  const [universities, setUniversities] = useState([]);

  const { data, refetch, isError, isLoading } = useQuery({
    queryKey: ['getProfileDetails', props.details.email],
    queryFn: () => getUserInformation(props.details.email),
  })

  useEffect(() => {
    fetch("/universityLists.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCountries = Array.from(
          new Set(data.map((val) => val.country))
        ).sort();
        setCountries(uniqueCountries);
      })
      .catch((err) => toast.error("Failed to load countries"));
  }, []);

  const [newname, setNewname] = useState("");
  const [newphone, setNewphone] = useState("");
  const [newcollege, setNewcollege] = useState("");
  const [newcollege_year, setNewcollege_year] = useState("");
  const [newcollege_stream, setNewcollege_stream] = useState("");
  const [newCollegeDepartment, setNewCollegeDepartment] = useState("")
  const [newschool, setNewschool] = useState("");
  const [newschool_year, setNewschool_year] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [new_work_country, setNew_work_country] = useState("");
  const [new_work_state, setNew_work_state] = useState("");
  const [new_work_city, setNew_work_city] = useState("");
  const [new_work_company, setNew_work_company] = useState("");
  const [new_work_duration, setNew_work_duration] = useState("");

  const [changename, setChangename] = useState(false);
  const [changephone, setChangephone] = useState(false);
  const [changecollege, setChangecollege] = useState(false);
  const [changecollege_year, setChangecollege_year] = useState(false);
  const [changecollege_stream, setChangecollege_stream] = useState(false);
  const [changeCollegeDepartment, setChangeCollegeDepartment] = useState(false);
  const [changeschool, setChangeschool] = useState(false);
  const [changeschool_year, setChangeschool_year] = useState(false);
  const [changeCountry, setChangeCountry] = useState(false);
  const [changeState, setChangeState] = useState(false);
  const [changeCity, setChangeCity] = useState(false);
  const [change_work_country, setChange_work_country] = useState(false);
  const [change_work_state, setChange_work_state] = useState(false);
  const [change_work_city, setChange_work_city] = useState(false);
  const [change_work_company, setChange_work_company] = useState(false);
  const [change_work_duration, setChange_work_duration] = useState(false);

  useEffect(() => {
    fetch("/universityLists.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedUniversities = Array.from(
          new Set(
            data
              .filter((val) => val.country == newCountry)
              .map((val) => val.name)
          )
        ).sort();
        setUniversities(selectedUniversities);
      })
      .catch((err) => toast.error("Failed to load universities"));
  }, [newCountry, new_work_country]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (type, val) => {
    const response = await api.post(apiRoutes.user.updateProfile, {
      email: props.details.email,
      old: type,
      name: val,
    });
    if (response.status === 200) {
      const data = await response.data;
      Cookies.set("ProfileInfo", JSON.stringify(data.profileInfo), {
        secure: true,
        path: "/",
        sameSite: "None",
      });
      location.reload();
    } else {
      console.log("Internal Server Error");
    }
  };

  const handleremove = async () => {
    const response = await api.post(apiRoutes.user.removeProfile, {
      email: props.details.email,
    });
    if (response.status === 200) {
      Cookies.remove("AccessToken");
      Cookies.remove("RefreshToken");
      Cookies.remove("ProfileInfo");
      localStorage.setItem("toast_message", "Account Removed Successfully!");
      navigate("/");
    }
  };

  const EditableField = ({
    label,
    value,
    isEditing,
    onToggleEdit,
    newValue,
    setNewValue,
    onSubmit,
    type = "text",
    icon,
    isReadOnly = false,
    options = null,
  }) => (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl border border-white/20 p-6 transition-all duration-200 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
            {icon}
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">{label}</h3>
        </div>
        {!isReadOnly && (
          <button
            onClick={onToggleEdit}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium ${
              isEditing
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
          >
            {isEditing ? <XIcon /> : <EditIcon />}
            {isEditing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-800 font-medium">
            {value || "Not specified"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {options ? (
            <select
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800"
            >
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800"
              placeholder={`Enter new ${label.toLowerCase()}`}
            />
          )}
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-200 hover:scale-105 font-medium"
          >
            <SaveIcon />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );

  const getCollegeYearOptions = () => {
    if (props.details.college_stream === "Bachelor's") {
      return ["1st", "2nd", "3rd", "4th", "5th"];
    } else if (props.details.college_stream === "Master's") {
      return ["1st", "2nd"];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6"></div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Profile Settings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your personal information and academic details
          </p>
        </div>

        {/* Profile Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Name */}
          <EditableField
            label="Full Name"
            value={data?.profile.name}
            isEditing={changename}
            onToggleEdit={() => setChangename(!changename)}
            newValue={newname}
            setNewValue={setNewname}
            onSubmit={() => handleUpdate("name", newname)}
            icon={<UserIcon />}
          />

          {/* Email */}
          <EditableField
            label="Email Address"
            value={data?.profile.email}
            isEditing={false}
            onToggleEdit={() => {}}
            newValue=""
            setNewValue={() => {}}
            onSubmit={() => {}}
            icon={<MailIcon />}
            isReadOnly={true}
          />

          {/* Phone */}
          <EditableField
            label="Phone Number"
            value={data?.profile.phone}
            isEditing={changephone}
            onToggleEdit={() => setChangephone(!changephone)}
            newValue={newphone}
            setNewValue={setNewphone}
            onSubmit={() => handleUpdate("phone", newphone)}
            icon={<PhoneIcon />}
          />

          {/* Country */}
          <EditableField
            label="Country"
            value={data?.profile.country}
            isEditing={changeCountry}
            onToggleEdit={() => setChangeCountry(!changeCountry)}
            newValue={newCountry}
            setNewValue={setNewCountry}
            onSubmit={() => handleUpdate("country", newCountry)}
            icon={<PhoneIcon />}
            options={countries}
          />

          {/* Phone */}
          <EditableField
            label="State"
            value={data?.profile.state}
            isEditing={changeState}
            onToggleEdit={() => setChangeState(!changeState)}
            newValue={newState}
            setNewValue={setNewState}
            onSubmit={() => handleUpdate("state", newState)}
            icon={<PhoneIcon />}
          />

          {/* City */}
          <EditableField
            label="City"
            value={data?.profile.city}
            isEditing={changeCity}
            onToggleEdit={() => setChangeCity(!changeCity)}
            newValue={newCity}
            setNewValue={setNewCity}
            onSubmit={() => handleUpdate("city", newCity)}
            icon={<PhoneIcon />}
          />

          <EditableField
            label="referCode"
            value={data?.profile.referCode}
            isEditing={false}
            onToggleEdit={() => {}}
            newValue={""}
            setNewValue={() => {}}
            onSubmit={() => {}}
            icon={<LockIcon />}
            isReadOnly={true}
          />

          {/* College Fields */}
          {data?.profile.education_type == 'college' && (
            <>
              <EditableField
                label="College Name"
                value={data?.profile.college}
                isEditing={changecollege}
                onToggleEdit={() => setChangecollege(!changecollege)}
                newValue={newcollege}
                setNewValue={setNewcollege}
                onSubmit={() => handleUpdate("college", newcollege)}
                icon={<BuildingLibraryIcon />}
                options={universities}
              />

              <EditableField
                label="College Stream"
                value={data?.profile.college_stream}
                isEditing={changecollege_stream}
                onToggleEdit={() =>
                  setChangecollege_stream(!changecollege_stream)
                }
                newValue={newcollege_stream}
                setNewValue={setNewcollege_stream}
                onSubmit={() =>
                  handleUpdate("college_stream", newcollege_stream)
                }
                icon={<AcademicCapIcon />}
                options={["Bachelor's", "Master's", "PhD"]}
              />

              {data?.profile.college_stream !== "PhD" && (
                <EditableField
                  label="College Year"
                  value={data?.profile.college_year}
                  isEditing={changecollege_year}
                  onToggleEdit={() =>
                    setChangecollege_year(!changecollege_year)
                  }
                  newValue={newcollege_year}
                  setNewValue={setNewcollege_year}
                  onSubmit={() => handleUpdate("college_year", newcollege_year)}
                  icon={<AcademicCapIcon />}
                  options={getCollegeYearOptions()}
                />
              )}

              <EditableField
                label="College Department"
                value={data?.profile.college_department}
                isEditing={changeCollegeDepartment}
                onToggleEdit={() => setChangeCollegeDepartment(!changeCollegeDepartment)}
                newValue={newCollegeDepartment}
                setNewValue={setNewCollegeDepartment}
                onSubmit={() => handleUpdate("college_department", newCollegeDepartment)}
                icon={<BuildingLibraryIcon />}
              />
            </>
          )}

          {/* School Fields */}
          {data?.profile.education_type == 'school' && (
            <>
              <EditableField
                label="School Name"
                value={data?.profile.school_name}
                isEditing={changeschool}
                onToggleEdit={() => setChangeschool(!changeschool)}
                newValue={newschool}
                setNewValue={setNewschool}
                onSubmit={() => handleUpdate("school", newschool)}
                icon={<BuildingLibraryIcon />}
              />

              <EditableField
                label="School Year"
                value={data?.profile.school_year}
                isEditing={changeschool_year}
                onToggleEdit={() => setChangeschool_year(!changeschool_year)}
                newValue={newschool_year}
                setNewValue={setNewschool_year}
                onSubmit={() => handleUpdate("school_year", newschool_year)}
                icon={<BuildingLibraryIcon />}
                options={["9", "10", "11", "12"]}
              />
            </>
          )}
        </div>

        {/* Working professional fields */}
        {data?.profile.education_type === "working" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <EditableField
              label="Work Country"
              value={data?.profile.work_country}
              isEditing={change_work_country}
              onToggleEdit={() => setChange_work_country(!change_work_country)}
              newValue={new_work_country}
              setNewValue={setNew_work_country}
              onSubmit={() => handleUpdate("work_country", new_work_country)}
              icon={<BuildingLibraryIcon />}
              options={countries}
            />
            <EditableField
              label="Work State"
              value={data?.profile.work_state}
              isEditing={change_work_state}
              onToggleEdit={() => setChange_work_state(!change_work_state)}
              newValue={new_work_state}
              setNewValue={setNew_work_state}
              onSubmit={() => handleUpdate("work_state", new_work_state)}
              icon={<BuildingLibraryIcon />}
            />
            <EditableField
              label="Work City"
              value={data?.profile.work_city}
              isEditing={change_work_city}
              onToggleEdit={() => setChange_work_city(!change_work_city)}
              newValue={new_work_city} 
              setNewValue={setNew_work_city}
              onSubmit={() => handleUpdate("work_city", new_work_city)}
              icon={<BuildingLibraryIcon />}
            />
            <EditableField
              label="Work Company"
              value={data?.profile.work_company}
              isEditing={change_work_company}
              onToggleEdit={() => setChange_work_company(!change_work_company)}
              newValue={new_work_company}
              setNewValue={setNew_work_company}
              onSubmit={() => handleUpdate("work_company", new_work_company)}
              icon={<BuildingLibraryIcon />}
            />
            <EditableField  
              label="Work Duration"
              value={data?.profile.work_duration}
              isEditing={change_work_duration}
              onToggleEdit={() => setChange_work_duration(!change_work_duration)}
              newValue={new_work_duration}
              setNewValue={setNew_work_duration}
              onSubmit={() => handleUpdate("work_duration", new_work_duration)}
              icon={<BuildingLibraryIcon />}
            />
          </div>
        )}

        {/* Delete Account Section */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-500 rounded-xl text-white">
              <TrashIcon />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-800">Danger Zone</h3>
              <p className="text-red-600">This action cannot be undone</p>
            </div>
          </div>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Delete Account
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <p className="text-red-800 font-medium mb-2">
                  ⚠️ Are you absolutely sure?
                </p>
                <p className="text-red-700 text-sm">
                  This will permanently delete your account and all associated
                  data. This action cannot be reversed.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleremove}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Student_Details;
