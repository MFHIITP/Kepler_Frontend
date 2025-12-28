import React, { useEffect, useState } from 'react';
import { UserDetails } from './Connection.interface';
import Connection from './Connections';
import { useMutation } from '@tanstack/react-query';
import { componentPropsInterface } from '../Interfaces/ComponentProps.interface';
import Cookies from 'js-cookie';
import { getConnectionDetailsRequest, getCurrentUserDetails, getDetailsNewConnection } from './ConnectionRawRequests';
import { messageFormatInterface } from './ConnectionMessages.interface';

const LandingConnectionPage: React.FC<componentPropsInterface> = ({ details }) => {

  const [currentUserDetails, setCurrentUserDetails] = useState<UserDetails | []>([]);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [connectionRequests, setConnectionRequests] = useState<any[]>([]);
  const [newConnectionAcceptances, setNewConnectionAcceptances] = useState<any[]>([]);
  const [messages, setMessages] = useState<messageFormatInterface[] | []>([]);

  const token = Cookies.get("AccessToken");
  
  const ws = new WebSocket(`${import.meta.env.VITE_WEBS_ADDR}/?token=${token}`);
  ws.onopen = () => {
    console.log("Websocket connection established for the connections page");
  }
  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    if(data.type === 'PENDING_CONNECTION_REQUEST' || data.type === 'NEW_CONNECTION_REQUEST'){
      const infoEmail: string = data.senderEmail;
      const response: {profileDetails: any, message: string} = await getConnectionDetailsRequest(infoEmail);
      setConnectionRequests((prevRequests) => {
        const alreadyExists = prevRequests.some(request => request.email == infoEmail);
        if(alreadyExists){
          return prevRequests;
        }
        return [...prevRequests, response.profileDetails]
      });
    }
    if(data.type == 'CONNECTION_REQUEST_ACCEPTED'){
      const connectedEmail = data.connectedEmail;
      const response = await getDetailsNewConnection(connectedEmail);
      setNewConnectionAcceptances((prevConnections) => {
        const sameConnection = prevConnections.some((connection) => connection.email == connectedEmail);
        if(sameConnection){
          return prevConnections;
        }
        return [...prevConnections, response.connectionDetails]
      });
    }
  }
  ws.onclose = () => {
    console.log("Websocket connection closed for the connections page");
  }

  const {mutate: fetchCurrentUserDetails} = useMutation({
    mutationFn: (email: string) => getCurrentUserDetails(email ?? localStorage.getItem("email") as string),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setCurrentUserDetails(data.profileDetails as UserDetails);
      setLoading(false)
    },
    onError: (data) => {
      console.log(data.message);
      setLoading(false);
    }
  });

  const refetch = () => setFetch(!fetch); 

  useEffect(() => {
    if(!localStorage.getItem("email")){
      localStorage.setItem("email", details?.email as string);
    }
    fetchCurrentUserDetails(details?.email as string);

    return () => {
      localStorage.removeItem("email");
    }
  }, [fetch]);

  if(loading){
    return <div className='flex justify-center items-center text-2xl h-[10vh]'>Fetching Connection Details....</div>
  }

  return <Connection details={currentUserDetails} refetch = {refetch} email={details?.email ?? ""} connectionRequests = {connectionRequests} setConnectionRequests = {setConnectionRequests} newConnectionAcceptances = {newConnectionAcceptances} messages = {messages}/>;
}

export default LandingConnectionPage;