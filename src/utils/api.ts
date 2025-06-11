import axios from 'axios'
import Cookies from 'js-cookie'

const getToken = ()=>{
    const token = Cookies.get("Token");
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
        const token = getToken();
        if(token != null){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        Promise.reject(error);
    }
)

export default api;