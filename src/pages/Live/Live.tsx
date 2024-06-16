import React, { useRef, useEffect, useState } from "react";
import SimplePeer from "simple-peer";
import Chat from "./Chat";

const Live: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const peerRef = useRef<SimplePeer.Instance | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/video-chat");

    ws.current.onmessage = (message) => {
      try {
        const signal = JSON.parse(message.data);
        console.log(signal);

        if (
          signal.type === "offer" ||
          signal.type === "answer" ||
          signal.type === "candidate"
        ) {
          if (peerRef.current) {
            peerRef.current.signal(signal);
          }
        } else if (signal.CHAT) {
          // Handle chat message if needed
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const peer = new SimplePeer({
          initiator: window.location.hash === "#init",
          trickle: false,
          stream: stream,
        });

        peer.on("signal", (data) => {
          if (ws.current) {
            ws.current.send(JSON.stringify(data));
          }
        });

        peer.on("stream", (stream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }
        });

        peerRef.current = peer;
      });

    // Clean up WebSocket connection and peer on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 justify-around items-center p-4">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-1/2 border-2 border-black rounded"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-1/2 border-2 border-black rounded"
        />
      </div>
      <Chat ws={ws} />
    </div>
  );
};

export default Live;