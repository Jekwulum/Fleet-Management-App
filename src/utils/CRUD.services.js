import { instance as Axios } from "./axios";


// driver
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

// vehicle
export const createVehicle = async (payload) => {
  const response = await Axios.post('/vehicle', payload);
  return response.data;
}

export const editVehicle = async (id, payload) => {
  const response = await Axios.patch(`/vehicle/${id}`, payload);
  return response.data;
}

export const deleteVehicle = async (id) => {
  const response = await Axios.delete(`/vehicle/${id}`);
  return response.data;
}

// trips