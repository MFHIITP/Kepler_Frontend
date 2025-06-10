import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function MeetingRoom() {
  const { roomId, username } = useParams();
  const meetingRef = useRef(null);

  useEffect(() => {
    const initMeeting = async () => {
      const appID = 984474632;
      const serverSecret = "c766227ff9548d6d4bd0efc28e5ca5a6";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId ?? "",
        `${Date.now().toString()}`,
        username
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    };

    initMeeting();
  }, [roomId, username]);

  return (
    <div className="bg-white flex flex-col">
      <div ref={meetingRef} className="relative">
        <div className="absolute left-4 bottom-4 text-2xl  text-white">
          Kepler
        </div>
      </div>
    </div>
  );
}

export default MeetingRoom;
