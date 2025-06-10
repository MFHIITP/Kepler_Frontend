import React, { useState } from "react";
import { playlist } from "../lists.js";
import ReactPlayer from "react-player/youtube";

function Playlist(props) {
  const [ind, setIndex] = useState(1);
  return (
    <div className="h-full">
      <div className="flex flex-row gap-x-12 h-full">
        <div className="rounded-lg p-2 w-[60%] h-full">
          {playlist[`${props.exam}`].map((val, index) => (
            <div
              key={index}
              className={`${val.id == ind ? "h-full" : "hidden"}`}
            >
              {val.type == "drive" ? (
                <>
                  <iframe
                    src={val.link}
                    allowFullScreen
                    className="h-full w-full rounded-lg"
                    onContextMenu={(e)=>{e.preventDefault()}}
                  ></iframe>
                </>
              ) : (
                <></>
              )}
              {val.type == "youtube" ? (
                <div className="h-full">
                  <ReactPlayer
                    url={val.link}
                    playing={val.id == ind}
                    controls={true} // Enable YouTube controls
                    light={true} // Enable light mode (thumbnail image shown before play)
                    width="100%"
                    height="100%"
                    onPlay={() => console.log("Video is playing")}
                    config={{
                      youtube: {
                        playerVars: {
                          modestbranding: 1, // Use 1 to hide YouTube branding
                          rel: 0, // Disable related videos at the end
                          showinfo: 0, // Disable video info
                          controls: 1, // Enable YouTube controls
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-y-5 w-[30%] mx-4 overflow-auto scrollbar-thin">
          {playlist[`${props.exam}`].map((val, index) => (
            <div
              key={index}
              className={`rounded-lg flex gap-x-8 p-4 cursor-pointer ${
                val.id == ind ? "bg-orange-500" : "bg-white"
              }`}
              onClick={() => {
                setIndex(val.id);
              }}
            >
              {val.type == "youtube" ? (
                <div className="flex gap-x-12">
                  <img src={val.image} alt="" className=" h-16 rounded-lg" />
                  <div className="flex flex-col gap-y-4">
                    {val.name}
                    {val.time}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {val.type == "drive" ? (
                <>
                  <div className="flex gap-x-12">
                    <img src={val.image} alt="" className=" h-16 rounded-lg" />
                    <div className="flex flex-col gap-y-4">
                      {val.name}
                      {val.time}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
