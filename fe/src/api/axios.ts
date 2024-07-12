import axios from "axios";
import { Login, SignUpInfo } from "../types/types";
import { NavigateFunction } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081/api/v1/",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const navigate = (path: string) => {
  window.location.href = path;
};


export const loginUser = async(loginProp: Login) => {
    try {
        const res = await axiosInstance.post('/auth/login', loginProp);
        localStorage.setItem('isLoggedIn', 'true');  
        navigate('/');
    } catch (error) {
        console.warn(error);
    }
}

export const logoutUser = async () => {  
  try {  
      await axiosInstance.post('/auth/logout');  
      localStorage.removeItem('isLoggedIn');  
      navigate('/login');
  } catch (error) {  
      console.warn(error);  
  }  
};  

export const registerNewUser = async(user: SignUpInfo) => {

    try {
        const res = await axiosInstance.post('/auth/register',user);
        
    } catch (error) {
        console.log(error);
    }

     
}