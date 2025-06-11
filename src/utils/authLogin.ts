import api from "./api"
import apiRoutes from "./Routes/apiRoutes"

const getNewAccessToken = async(refreshToken: string) => {
    const { data } = await api.post(apiRoutes.auth.getNewAccessToken, {
        refreshToken: refreshToken
    })
    return data;
}

const logoutRequest = async(email: string) => {
    const response = await api.post(apiRoutes.auth.logout, {
        email: email
    })
    return response;
}

export {getNewAccessToken, logoutRequest};