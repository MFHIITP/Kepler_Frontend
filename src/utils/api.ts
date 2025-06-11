import axios from 'axios'
import Cookies from 'js-cookie'
import { getNewAccessToken, logoutRequest } from './authLogin';

const getToken = (name: string)=>{
    const token = Cookies.get(name);
    if(token){
        return token;
    }
    return null;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_SERV_ADDR,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
})

api.interceptors.request.use(
    (config)=>{
        const accessToken = getToken("AccessToken");
        if(accessToken != null){
            config.headers.AuthorizationAccessToken = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    async(error) => {
        const originalRequest = error.config;
        originalRequest._retryCount = 0;
        const refreshToken = getToken("RefreshToken")
        if(error.response.status == 401){
            const data = await getNewAccessToken(refreshToken ?? "");
            Cookies.set("AccessToken", data.accessToken, {
                path: '/',
                domain: window.location.hostname,
                secure: true,
                sameSite: 'None'
            })
            originalRequest.headers.AuthorizationAccessToken = `Bearer ${data.accessToken}`;
            return api(originalRequest);
        }
        else if(error.response.status == 403){
            const profileInfoToken = Cookies.get("ProfileInfo");
            const decodedProfile = decodeURIComponent(profileInfoToken?.substring(2) ?? "");
            const profile = JSON.parse(decodedProfile);
            const email = profile.email
            const response = await logoutRequest(email);
            if(response.status == 200){
                Cookies.remove("AccessToken");
                Cookies.remove("RefreshToken")
                Cookies.remove("ProfileInfo");
                localStorage.setItem("toast_message", "Logout Successful!");
                window.location.href = "/";
            }
        }
    }
)

export default api;