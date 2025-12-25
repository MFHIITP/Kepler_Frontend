import axios from "axios";
import Cookies from "js-cookie";
import { getNewAccessToken, logoutRequest } from "./authLogin";

const getToken = (name: string) => {
  const token = Cookies.get(name);
  if (token) {
    return token;
  }
  return null;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_SERV_ADDR,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getToken("AccessToken");
    if (accessToken != null) {
      config.headers.AuthorizationAccessToken = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    originalRequest._retryCount = 0;
    const refreshToken = getToken("RefreshToken");
    if (error.response.status == 401) {
      const data = await getNewAccessToken(refreshToken ?? "");
      Cookies.remove("AccessToken", {
        path: "/",
      });
      Cookies.set("AccessToken", data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "None",
      });
      originalRequest.headers.AuthorizationAccessToken = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    } 
    else if (error.response.status == 403) {
      try {
        const profileInfoToken = Cookies.get("ProfileInfo");
        const profile = JSON.parse(profileInfoToken ?? "{}");
        const email = profile.email;
        const response = await logoutRequest(email);
        Cookies.remove("AccessToken", {
          path: "/",
        });
        Cookies.remove("RefreshToken", {
          path: "/",
        });
        Cookies.remove("ProfileInfo", {
          path: "/",
        });
        localStorage.removeItem("email")
        localStorage.setItem("toast_message", "Logout Successful!");
        window.location.href = "/";
      }
      catch(error) {
        console.log(error);
      }
    }
  }
);

export default api;
