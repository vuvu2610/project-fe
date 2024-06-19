export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyNzEwNzY2My0yYjhhLTQyNDAtYTIwOC01OGRhNWExYjlhMWYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxODgwNjA5MywiZXhwIjoxNzI2NTgyMDkzfQ.PCuCU2tnlqVW4898XGv0vCNRM8ccC3tQESBVr2oTN1I";

export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  
  const { roomId } = await res.json();
  return roomId;
};