import React, { useState } from "react";
import { authToken, createMeeting } from "../../api/live";
import { MeetingConsumer, MeetingProvider } from "@videosdk.live/react-sdk";
import JoinScreen from "./JoinScreen";
import Container from "./Container";

// Define an interface for the component props
interface Props {}

const Live: React.FC<Props> = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [mode, setMode] = useState<string>("CONFERENCE");

  const getMeetingAndToken = async (id: string | null) => {
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
        mode: mode as 'CONFERENCE' | 'VIEWER',
        debugMode: true
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() =>
          
          <Container meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
          
        }
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
  );
};

export default Live;
