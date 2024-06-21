import { MeetingData, Room, RoomData } from "../types/types";

// Define authToken type
export const authToken: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyNzEwNzY2My0yYjhhLTQyNDAtYTIwOC01OGRhNWExYjlhMWYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxODgwNjA5MywiZXhwIjoxNzI2NTgyMDkzfQ.PCuCU2tnlqVW4898XGv0vCNRM8ccC3tQESBVr2oTN1I";

// Function to create a meeting room
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
    throw error; // Re-throw or handle the error as needed
  }
};

// Function to get active meetings
export const getMeetings = async (
  page: number = 1,
  perPage: number = 20
): Promise<MeetingData[]> => {
  try {
    // Fetch list of rooms
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

    // Fetch HLS status for each room concurrently
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

    console.log(rooms);
    


    // Filter active rooms based on HLS status code
    const activeRooms: MeetingData[] = rooms.filter((room) => room.code === 200);

    return activeRooms;
  } catch (error) {
    console.error("Error getting meetings:", error);
    throw error; // Re-throw or handle the error as needed
  }
};
