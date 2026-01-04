import React, { useEffect, useRef, useState } from "react";
import { UserDetails } from "./Connection.interface";
import Connection from "./Connections";
import { useMutation } from "@tanstack/react-query";
import { componentPropsInterface } from "../Interfaces/ComponentProps.interface";
import Cookies from "js-cookie";
import { getConnectionDetailsRequest, getCurrentUserDetails, getDetailsNewConnection } from "./ConnectionRawRequests";
import { messageFormatInterface } from "./ConnectionMessages.interface";

const LandingConnectionPage: React.FC<componentPropsInterface> = ({details}) => {
  const [currentUserDetails, setCurrentUserDetails] = useState< UserDetails | []>([]);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [connectionRequests, setConnectionRequests] = useState<any[]>([]);
  const [newConnectionAcceptances, setNewConnectionAcceptances] = useState<any[]>([]);
  const [messages, setMessages] = useState<messageFormatInterface[] | []>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wsRef.current) {
      return;
    }

    const token = Cookies.get("AccessToken");
    const ws = new WebSocket(`${import.meta.env.VITE_WEBS_ADDR}/?token=${token}`);

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Websocket connection established for the connections page");
    };
    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "PENDING_CONNECTION_REQUEST" || data.type === "NEW_CONNECTION_REQUEST") {
        const senderEmail: string = data.senderEmail;
        const response = await getConnectionDetailsRequest(senderEmail);
        setConnectionRequests((prevRequests) => {
          const alreadyExists = prevRequests.some((req) => req.email === senderEmail);
          if (alreadyExists) {
            return prevRequests;
          }
          return [...prevRequests, response.profileDetails];
        });
      }
      if (data.type == "CONNECTION_REQUEST_ACCEPTED") {
        const connectedEmail = data.connectedEmail;
        const response = await getDetailsNewConnection(connectedEmail);
        setNewConnectionAcceptances((prevConnections) => {
          const exists = prevConnections.some((conn) => conn.email === connectedEmail);
          if (exists) {
            return prevConnections;
          }
          return [...prevConnections, response.connectionDetails];
        });
      }
      if (data.type == "PERSONAL_CONNECTION_CHAT") {
        const message: messageFormatInterface = {
          sender: data.sender,
          receiver: data.receiver,
          chatmessage: data.messageBody,
          date: data.date,
        };
        setMessages((messages) => {
          return [...messages, message];
        });
      }
    };
    ws.onclose = () => {
      console.log("Websocket connection closed for the connections page");
    };
  }, []);

  const { mutate: fetchCurrentUserDetails } = useMutation({
    mutationFn: (email: string) => getCurrentUserDetails(email ?? (localStorage.getItem("email") as string)),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setCurrentUserDetails(data.profileDetails as UserDetails);
      setLoading(false);
    },
    onError: (error: any) => {
      console.error(error?.message);
      setLoading(false);
    },
  });

  const refetch = () => setFetch((prev) => !prev);

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      localStorage.setItem("email", details?.email as string);
    }
    fetchCurrentUserDetails(details?.email as string);

    return () => {
      localStorage.removeItem("email");
    };
  }, [fetch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-2xl h-[10vh]">
        Fetching Connection Details....
      </div>
    );
  }

  return (
    <Connection
      details={currentUserDetails}
      refetch={refetch}
      email={details?.email ?? ""}
      connectionRequests={connectionRequests}
      setConnectionRequests={setConnectionRequests}
      newConnectionAcceptances={newConnectionAcceptances}
      messages={messages}
      setMessages={setMessages}
    />
  );
};

export default LandingConnectionPage;
