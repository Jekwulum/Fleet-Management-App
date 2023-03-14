import { instance as Axios } from "./axios";

export const createDriver = async (payload) => {
  const response = await Axios.post('/driver', payload);
  return response.data;
}

export const editDriver = async (id, payload) => {
  const response = await Axios.patch(`/driver/${id}`, payload);
  return response.data;
}

export const deleteDriver = async (id) => {
  const response = await Axios.delete(`/driver/${id}`);
  return response.data;
}