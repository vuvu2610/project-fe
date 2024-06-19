import React, { useMemo } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import ParticipantView from "./ParticipantView";

const SpeakerView: React.FC = () => {
  const { participants, hlsState } = useMeeting();

  const speakers = useMemo(() => {
    const speakerParticipants = Array.from(participants.values()).filter(
      (participant) => {
        return participant.mode === Constants.modes.CONFERENCE;
      }
    );

    return speakerParticipants;
  }, [participants]);

  return (
    <div>
      <p>Current HLS State: {hlsState}</p>
      <Controls />
      {speakers.map((participant) => (
        <ParticipantView participantId={participant.id} key={participant.id} />
      ))}
    </div>
  );
};

export default SpeakerView;
