// Importing Hls.js
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useMeeting } from "@videosdk.live/react-sdk";
import Chat from "./Chat";

const ViewerView: React.FC = () => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const { hlsUrls, hlsState } = useMeeting();

  useEffect(() => {
    if (hlsUrls.playbackHlsUrl && hlsState === "HLS_PLAYABLE") {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxLoadingDelay: 1,
          defaultAudioCodec: "mp4a.40.2",
          maxBufferLength: 0,
          maxMaxBufferLength: 1,
          startLevel: 0,
          startPosition: -1,
          maxBufferHole: 0.001,
          highBufferWatchdogPeriod: 0,
          nudgeOffset: 0.05,
          nudgeMaxRetry: 1,
          maxFragLookUpTolerance: 0.1,
          liveSyncDurationCount: 1,
          abrEwmaFastLive: 1,
          abrEwmaSlowLive: 3,
          abrEwmaFastVoD: 1,
          abrEwmaSlowVoD: 3,
          maxStarvationDelay: 1,
        });

        const player = playerRef.current;

        if (player) {
          hls.loadSource(hlsUrls.playbackHlsUrl);
          hls.attachMedia(player);
        }
      } else {
        const player = playerRef.current;

        if (player && typeof player.play === "function") {
          player.src = hlsUrls.playbackHlsUrl;
          player.play().catch((error) => {
            console.error("player.play() failed", error);
          });
        }
      }
    }
  }, [hlsUrls, hlsState]);

  return (
    <div>
      {hlsState !== "HLS_PLAYABLE" ? (
        <div>
          <p>HLS has not started yet or is stopped</p>
        </div>
      ) : (
        hlsState === "HLS_PLAYABLE" && (
          <div>
            <video
              ref={playerRef}
              id="hlsPlayer"
              autoPlay
              controls
              style={{ width: "100%", height: "100%" }}
              playsInline
              muted
              onError={(err) => {
                console.log(err, "hls video error");
              }}
            />
            <Chat />
          </div>
        )
      )}
      
    </div>
  );
};

export default ViewerView;