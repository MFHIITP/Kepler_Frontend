import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("AccessToken");
  if (token) {
    return token;
  }
  return null;
};
const getProfileInfo = () => {
  const profile = Cookies.get("ProfileInfo");
  if (profile) {
    const decodedProfile = decodeURIComponent(profile);
    return JSON.parse(decodedProfile);
  }
};
export {getToken, getProfileInfo}