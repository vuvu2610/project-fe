import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
interface Props {}
const Controls: React.FC<Props> = () => {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();

  return (
    <div>
      <button onClick={() => leave()}>Leave</button>
      &emsp;|&emsp;
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      &emsp;|&emsp;
      <button
        onClick={() => {
          startHls({
            layout: {
              type: "SPOTLIGHT",
              priority: "PIN",
              gridSize: 20,  // Changed to number as it should be
            },
            theme: "LIGHT",
            mode: "video-and-audio",
            quality: "high",
            orientation: "landscape",
          });
        }}
      >
        Start HLS
      </button>
      <button onClick={() => stopHls()}>Stop HLS</button>
    </div>
  );
};

export default Controls;
