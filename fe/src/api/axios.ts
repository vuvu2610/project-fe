import axios from "axios";
import { Cart, CartItem, Login } from "../types/types";
import { getDispatch } from "../utils/helper";
import { fetchEnd, fetchStart } from "../redux/appSlice";

const dispatch = getDispatch();

const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true
});

export const loginUser = async (loginProp: Login) => {
  try {
    const res = await baseAxios.post("auth/login", loginProp);
    return res.data;
  } catch (error) {
    console.warn(error);
  }
};

export const getCart = async (userId: number): Promise<Cart> => {
  try {
    const res = await baseAxios.get(`carts/${userId}`);
    return res.data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const addCartItem = async (cartId: number, cartItem: CartItem) => {
  try {
    const res = await baseAxios.post(`carts/${cartId}/items`, cartItem);
    return res.data;
  } catch (error) {
    console.warn(error);
  }
};

export const deleteCartItem = async (cartItemId: number) => {
  try {
    const res = await baseAxios.delete(`items/${cartItemId}`);
    return res.data;
  } catch (error) {
    console.warn(error);
  }
};

export const updateCartItem = async (
  cartItemId: number,
  cartItem: CartItem
) => {
  try {
    const res = await baseAxios.post(`items/${cartItemId}`, cartItem);
    return res.data;
  } catch (error) {
    console.warn(error);
  }
};

export const callApi = async (callBack: any) => {
  try {
    dispatch(fetchStart());
    const res = await callBack();
    dispatch(fetchEnd());
    return res;
  } catch (error) {
    dispatch(fetchEnd());
  }
};
