import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type GetMeetingAndToken = (meetingId: string | null) => Promise<void>;
type SetMode = (mode: "CONFERENCE" | "VIEWER") => void;

function JoinScreen({
  getMeetingAndToken,
  setMode,
}: {
  getMeetingAndToken: GetMeetingAndToken;
  setMode: SetMode;
}) {
  const location = useLocation();
  const {t} = useTranslation();

  const [meetingId, setMeetingId] = useState<string | null>(
    location.state ? location.state : null
  );

  const onClick = async (mode: "CONFERENCE" | "VIEWER") => {
    setMode(mode);

    await getMeetingAndToken(meetingId);
  };

  useEffect(() => {
    if (location.state) {
      onClick("VIEWER");
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-y-3">
        <h1 className="text-2xl">{t("text.well-back")}</h1>
        <button
          onClick={() => onClick("CONFERENCE")}
          className="p-3 min-w-32 rounded-xl bg-gray-300 hover:text-white hover:bg-primary transition-all duration-300 "
        >
          {t("nav.live")}
        </button>
      </div>
    </div>
  );
}

export default JoinScreen;
