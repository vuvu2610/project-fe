import React, { useEffect, useState } from "react";
import { authToken, createMeeting } from "../../api/live";
import { MeetingConsumer, MeetingProvider } from "@videosdk.live/react-sdk";
import JoinScreen from "./JoinScreen";
import Container from "./Container";
import { useSelector } from "react-redux";
import { AuthState, RootState } from "../../redux/state";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

interface Props {}

const Live: React.FC<Props> = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [mode, setMode] = useState<string>("CONFERENCE");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const user = useSelector((state: RootState) => state.auth.currentUser);

  const getMeetingAndToken = async (id: string | null) => {
    const meetingId = id == null ? await createMeeting() : id;

    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
    setCamOn(false);
    setMicOn(false);
  };

  return (
    <div className="flex gap-x-4 max-w-width-page mt-[40px] pb-40 mx-auto">
      <Sidebar />
      {authToken && meetingId ? (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: micOn,
            webcamEnabled: camOn,
            multiStream: false,
            name: "C.V. Raman",
            mode: mode as "CONFERENCE" | "VIEWER",
            debugMode: true,
          }}
          token={authToken}
        >
          <MeetingConsumer>
            {() => (
              <Container
                meetingId={meetingId}
                onMeetingLeave={onMeetingLeave}
              />
            )}
          </MeetingConsumer>
        </MeetingProvider>
      ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
      )}
    </div>
  );
};

export default Live;
