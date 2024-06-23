import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { MeetingData, ThumbnailResponse } from "../../types/types";
import { getHlsThumbnail, getMeetings } from "../../api/live";
import { FaVideoSlash } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import routes from "../../config/routes";

interface Props {}

function Watch(props: Props) {
  const {} = props;
  const [meetings, setMeetings] = useState<Array<ThumbnailResponse>>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const ms = await getMeetings();

      const data = await Promise.all(
        ms.map(async (meet) => {
          const thumbnail = await getHlsThumbnail(meet.data.meetingId);
          return { ...thumbnail };
          
        })
      );

      setMeetings(data);
    }
    
    fetchData();
  }, []);

  function handleClick(roomId: string): void {
    navigate(routes.stream, {state: roomId})
  }

  return (
    <div className=" max-w-width-page mt-[160px] pb-40 mx-auto px-5 h-96 relative flex gap-x-8">
      <Sidebar />
      <ul className="flex-1">
        {meetings && meetings.length > 0 ? (
          meetings?.map((meeting, index) => (
            <li  key={index} onClick={() => handleClick(meeting.roomId)}>
              <img src={meeting.filePath} />
            </li>
          ))
        ) : (
          <li className="grid place-items-center gap-y-3 ">
            <FaVideoSlash
              size={160}
              className="border border-gray-300 p-5 rounded-3xl text-gray-200"
            />
            <p>Rất tiếc hiện tại không có livestream nào đang phát !!!</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Watch;
