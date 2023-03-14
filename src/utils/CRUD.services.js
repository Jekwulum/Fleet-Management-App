import { instance as Axios } from "./axios";

export const createDriver = async (payload) => {
  const response = await Axios.post('/driver', payload);
  return response.data;
}