import React, { useState } from "react";

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

  const onClick = async (mode: "CONFERENCE" | "VIEWER") => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
  };

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
    </div>
  );
}

export default JoinScreen;