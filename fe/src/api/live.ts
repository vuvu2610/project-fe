import { MeetingData, Room, RoomData, ThumbnailResponse } from "../types/types";

export const authToken: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIzNTQ3NDNiZi1iMGQ4LTQ3ZDEtYmFmOS05NmE1NjdjOTQyMjkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyMTA1NzA5MiwiZXhwIjoxODc4ODQ1MDkyfQ.jPUMwg93QIj8ERpbYPjJCO-aNOh27ZBOEE2ZK81_Apc";

export const createMeeting = async (): Promise<string> => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const { roomId }: { roomId: string } = await res.json();
    return roomId;
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw error;
  }
};

export const checkARoom = async (roomId: string): Promise<boolean> => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms/${roomId}`, {
      method: "GET",
      headers: {
        authorization: authToken,
        "Content-Type": "application/json",
      },
    });

    return res.ok;
  } catch (error) {
    return false;
  }
};

export const getMeetings = async (
  page: number = 1,
  perPage: number = 20
): Promise<MeetingData[]> => {
  try {
    
    const roomResponse = await fetch(
      `https://api.videosdk.live/v2/rooms?page=${page}&perPage=${perPage}`,
      {
        method: "GET",
        headers: {
          authorization: authToken,
          "Content-Type": "application/json",
        },
      }
    );

    const roomData: RoomData = await roomResponse.json();

    const rooms: MeetingData[] = await Promise.all(
      roomData.data.map(async (room: Room) => {
        const hlsResponse = await fetch(
          `https://api.videosdk.live/v2/hls/${room.roomId}/active`,
          {
            method: "GET",
            headers: {
              authorization: authToken,
              "Content-Type": "application/json",
            },
          }
        );

        return await hlsResponse.json();
      })
    );

    const activeRooms: MeetingData[] = rooms.filter(
      (room) => room.code === 200
    );

    return activeRooms;
  } catch (error) {
    console.error("Error getting meetings:", error);
    throw error;
  }
};

export const getHlsThumbnail = async (
  roomId: string
): Promise<ThumbnailResponse> => {
  try {
    const response = await fetch(`https://api.videosdk.live/v2/hls/capture`, {
      method: "POST",
      headers: {
        authorization: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: roomId }),
    });

    const data = await response.json();
    

    return data;
  } catch (error) {
    console.error("Error capturing HLS thumbnail:", error);
    throw error;
  }
};
