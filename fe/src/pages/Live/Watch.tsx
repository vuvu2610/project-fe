import { useEffect, useRef, useState } from "react";
import { FaVideoSlash } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkARoom, getMeetings } from "../../api/live";
import Pagianate from "../../components/PagianateNavBar/Paginate";
import routes from "../../config/routes";
import { MeetingData } from "../../types/types";
import Sidebar from "./Sidebar";

function Watch() {
  const [meetings, setMeetings] = useState<Array<MeetingData>>([]);
  const navigate = useNavigate();
  const roomInput = useRef<HTMLInputElement>(null);

  const [page, setPage] = useState(0);
  const numItemsOfPage = 20;

  useEffect(() => {
    async function fetchData() {
      const ms = await getMeetings(page + 1);

      // const data = await Promise.all(
      //   ms.map(async (meet) => {
      //     const thumbnail = await getHlsThumbnail(meet.data.meetingId);

      //     return { ...thumbnail };
      //   })
      // );

      setMeetings(ms);
    }

    fetchData();
  }, [page]);

  async function handleClick(roomId: string): Promise<void> {
    await checkARoom(roomId)
      .then((isValidate) => {
        if (isValidate) {
          navigate(routes.stream, { state: roomId });
        } else {
          toast.error("Không tìm thấy phiên live !!!");
        }
      })
      .catch(() => {
        toast.error("Không tìm thấy phiên live !!!");
      });
  }

  return (
    <div className=" max-w-width-page mt-[40px] mb-32 mx-auto px-5 relative flex gap-x-8">
      <Sidebar />
      <ul className="flex-1">
        <div className="mb-7 flex justify-end">
          <input
            ref={roomInput}
            type="text"
            placeholder="Nhập id phiên live tại đây"
            className="p-3 border border-gray-300 rounded-md  focus:outline-primary caret-primary"
          />
          <button
            onClick={() =>
              roomInput.current?.value && handleClick(roomInput.current?.value)
            }
            className="flex items-center justify-center gap-x-2 py-3 px-4 bg-gray-300 rounded-md ml-3 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Tham gia <IoPersonAdd />{" "}
          </button>
        </div>

        {meetings && meetings.length > 0 ? (
          <div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {meetings?.map((meeting, index) => (
                <li
                  className=" cursor-pointer"
                  key={index}
                  onClick={() => handleClick(meeting.data.meetingId)}
                >
                  <div className="flex items-center justify-center aspect-[2] bg-gray-400 rounded-lg ">
                    <div className="relative mx-auto h-24 w-24 bg-gray-400 rounded-full flex justify-center items-center">
                      <div className="ping ping1"></div>
                      <div className="ping ping2"></div>
                      <div className="ping ping3"></div>
                      <span className="text-white">Live</span>
                    </div>
                  </div>
                  <p className="mt-1 text-center">
                    Id: {meeting.data.meetingId}
                  </p>
                </li>
              ))}
            </div>
            <Pagianate
              onPageChange={(pageNumber) => {
                setPage(pageNumber);
              }}
              itemsLength={meetings.length}
              numberItemOnPage={numItemsOfPage}
            />
          </div>
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