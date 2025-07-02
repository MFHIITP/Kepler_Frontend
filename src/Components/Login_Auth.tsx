import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";

function Login_Auth() {
  const { email } = useParams();

  useEffect(() => {
    const loginfunction = async () => {
      const response = await api.post(apiRoutes.auth.login.authLogin, {
          email: email,
          
        });
      if (response.status === 200) {
        const data = await response.data;
  
        if (data.accessToken != null && data.refreshToken != null) {
          document.cookie = `AccessToken=${data.accessToken}; path=/; domain=${window.location.hostname}; secure=true; sameSite=None;`
          document.cookie = `RefreshToken=${data.refreshToken}; path=/; domain=${window.location.hostname}; secure=true; sameSite=None;`
          document.cookie = `ProfileInfo=${encodeURIComponent(`j:` + JSON.stringify(data.profileinfo))};  path=/; domain=${window.location.hostname}; secure=true; sameSite=None;`
          localStorage.setItem('toast_message', `Login Successful! Welcome to Kepler ${data.profileinfo.name}`)
          window.location.href = '/'
        }
      } else {
        localStorage.setItem('authfail', 'Please provide some more informations about yourself.');
        window.location.href = `/authregister/${email}`
      }
    };
    loginfunction()
  }, []);

  return <div className="m-12 text-xl text-blue-800 font-mono">
    Your credentials have been verified successfully. 
    <div>You are going to be directed to the website shortly.</div> Please wait patiently.

    <img src="/Images/milky-way-shooting-star.webp" alt="" height={600} width={600} className="mt-6 rounded-lg"/>
  </div>;
}

export default Login_Auth;
