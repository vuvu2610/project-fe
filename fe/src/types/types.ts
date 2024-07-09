import { ReactNode } from "react";

export interface Product {

  id: number;
  image: string;
  title: string;
  rating: number;
  price: number;
  purchase: number;
  category: string;
  date: string;
}

export interface RoomData {
  data: Room[];
}

export interface MeetingData {
  code: number;
  data: {
    sessionId: string;
    start: string;
    end: string | null;
    meetingId: string;
    duration: number;
    links: {
      get_room: string;
      get_session: string;
    };
    playbackHlsUrl: string;
    id: string;
  };
}

export interface Room {
  roomId: string;
  customRoomId: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
    name: string;
    discontinuedReason: string | null;
    id: string;
  };
  id: string;
  links: {
    get_room: string;
    get_session: string;
  };
}

export interface Meta {
  createdAt: string;
  width: number;
  height: number;
  format: string;
}

export interface ThumbnailResponse {
  message: string;
  roomId: string;
  meta: Meta;
  filePath: string;
  fileSize: number;
  fileName: string;
}

export interface ChatHistory {
    role: string; content: string; 
}

export interface CardInfo {
    price: number;
    quantity: number; 
}

export interface Login {
  email: string;
  password: string; 
}

export interface SignUpInfo {
  name: string;
  email: string; 
  password: string; 
}

export interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  children: ReactNode;
}