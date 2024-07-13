import {baseAxios} from "./axios"

export const getNewProduct = async () => {
    try {
      const res = await baseAxios.get(`home/new-product?pageSize=8`);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
};

export const getBestSeller = async () => {
    try {
      const res = await baseAxios.get(`home/best-seller?pageSize=6`);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
};