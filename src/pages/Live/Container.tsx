import React, { useState } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import SpeakerView from "./SpeakerView";
import ViewerView from "./ViewerView";

interface ContainerProps {
  meetingId: string;
  onMeetingLeave: () => void;
}

const Container: React.FC<ContainerProps> = (props) => {
  const [joined, setJoined] = useState<string | null>(null);

  const { join } = useMeeting();

  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined === "JOINED" ? (
        mMeeting.localParticipant?.mode === Constants.modes.CONFERENCE ? (
          <SpeakerView />
        ) : mMeeting.localParticipant?.mode === Constants.modes.VIEWER ? (
          <ViewerView />
        ) : null
      ) : joined && joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
};

export default Container;
