import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
interface Props {}
const Controls: React.FC<Props> = () => {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();
 

  return (
    <div className="flex gap-3 mb-2 flex-wrap">
      <button className="p-3 rounded-xl bg-gray-300 hover:text-white hover:bg-primary transition-all duration-300 " onClick={() => leave()}>Kết thúc phiên live</button>
     
      <button  className="p-3 rounded-xl bg-gray-300 hover:text-white hover:bg-primary transition-all duration-300 " onClick={() => toggleMic()}>Bật / Tắt Mic</button>
      <button className="p-3 rounded-xl bg-gray-300 hover:text-white hover:bg-primary transition-all duration-300 " onClick={() => toggleWebcam()}>Bật / Tắt Camera</button>
     
      <button  className="p-3 rounded-xl bg-gray-300 hover:text-white hover:bg-primary transition-all duration-300 "
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
        Bắt đầu phiên live
      </button>
      <button className="p-3 rounded-xl bg-gray-300 hover:text-white hover:bg-primary transition-all duration-300 " onClick={() => stopHls()}>Tạm dừng phiên live</button>
    </div>
  );
};

export default Controls;
