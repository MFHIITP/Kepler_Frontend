import api from "../../utils/api"
import apiRoutes from "../../utils/Routes/apiRoutes"
import { ProfileDetailsInterface } from "./Connection.interface";

export const getCurrentUserDetails = async(email: string) => {
    const {data} = await api.post(apiRoutes.connection.getPersonalDetails, {
        email: email,
    })
    return data;
}

export const savePersonalDetails = async(personalDetails: ProfileDetailsInterface) => {
  const { data } = await api.post(apiRoutes.connection.savePersonalDetails, {
    email: personalDetails.email,
    githubUrl: personalDetails.githuburl,
    linkedinUrl: personalDetails.linkedinurl,
    portfolioUrl: personalDetails.portfoliourl,
    bio: personalDetails.bio,
    headline: personalDetails.headline,
    techStack: personalDetails.techstack,
    projects: JSON.stringify(personalDetails.projects),
    skills: personalDetails.skills,
    isOpenToWork: personalDetails.isOpenToWork,
    avatar: personalDetails.avatar,
    endorsements: personalDetails.endorsements,
  });
  return data;
}

export const acceptRejectConnectionRequest = async(senderEmail: string, receiverEmail: string, status: boolean) => {
    const { data } = await api.post(apiRoutes.connection.acceptRejectConnectionRequest, {
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
        status: status
    });
    return data;
}

export const deleteConnectionRequest = async(senderEmail: string, receiverEmail: string) => {
    const { data } = await api.post(apiRoutes.connection.deleteConnectionRequest, {
        userEmail: senderEmail,
        connectionEmail: receiverEmail,
    });
    return data;
}

export const getConnectionDetailsRequest = async(email: string) => {
    const { data } = await api.post(apiRoutes.connection.getConnectionDetailsRequest, {
        email: email,
    }) 
    return data;
}

export const sendConnectionRequest = async(senderEmail: string, receiverEmail: string) => {
    const { data } = await api.post(apiRoutes.connection.sendConnectionRequest, {
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
    });
    return data;
}

export const getDetailsNewConnection = async(emailId: string) => {
    const { data } = await api.post(apiRoutes.connection.getDetailsNewConnection, {
        email: emailId,
    })
    return data;
}