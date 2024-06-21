import React, { useEffect, useState } from "react";
import { MeetingData } from "../../types/types";
import { authToken, getMeetings } from "../../api/live";
import { MeetingConsumer, MeetingProvider } from "@videosdk.live/react-sdk";
import Container from "./Container";

type GetMeetingAndToken = (meetingId: string | null) => Promise<void>;
type SetMode = (mode: "CONFERENCE" | "VIEWER") => void;

function JoinScreen({
  getMeetingAndToken,
  setMode,
}: {
  getMeetingAndToken: GetMeetingAndToken;
  setMode: SetMode;
}) {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const [meetings, setMeetings] = useState<Array<MeetingData>>([]);

  const onClick = async (mode: "CONFERENCE" | "VIEWER") => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
  };

  useEffect(() => {
    getMeetings().then((ms) => setMeetings(ms));
  }, []);

  return (
    <div className="container">
      <button onClick={() => onClick("CONFERENCE")}>Create Meeting</button>
      <br />
      <br />
      {" or "}
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={() => onClick("CONFERENCE")}>Join as Host</button>
      {" | "}
      <button onClick={() => onClick("VIEWER")}>Join as Viewer</button>
      <ul>
        {meetings.map((meet, index) => (
          <li key={index}>
          <MeetingProvider
          config={{
            meetingId: meet.data.meetingId,
            micEnabled: true,
            webcamEnabled: true,
            multiStream: true,
            name: "C.V. Raman",
            mode:  "VIEWER",
            debugMode: true,
          }}
          token={authToken}
        >
          <MeetingConsumer>
            {() => (
              <p>haha</p>
            )}
          </MeetingConsumer>
        </MeetingProvider>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JoinScreen;
