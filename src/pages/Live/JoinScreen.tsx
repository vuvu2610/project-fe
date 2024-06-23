import { useEffect, useState } from "react";

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

  useEffect(() => {}, []);

  return (
    <div className="container">
      {/* <button onClick={() => onClick("CONFERENCE")}>Create Meeting</button>
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
      <button onClick={() => onClick("VIEWER")}>Join as Viewer</button> */}

      <div className="flex flex-col items-center gap-y-3">
        <h1 className="text-2xl">Chào mứng bạn quay trở lại !!!</h1>
        <button
          onClick={() => onClick("CONFERENCE")}
          className="p-3 rounded-xl bg-gray-300 hover:text-white hover:bg-primary transition-all duration-300 "
        >
          Phát trực tiếp
        </button>
      </div>
    </div>
  );
}

export default JoinScreen;
