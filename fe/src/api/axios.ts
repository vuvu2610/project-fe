import axios from "axios";
import { Login } from "../types/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true
});

const navigate = (path: string) => {
  window.location.href = path;
};

export const loginUser = async (loginProp: Login) => {
  try {
    const res = await axiosInstance.post("auth/login", loginProp);
    console.info(res.data);
    // navigate('/');
  } catch (error) {
    console.warn(error);
  }
};
