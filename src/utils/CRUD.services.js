import { instance as Axios } from "./axios";


// driver
export const createDriver = async (payload) => {
  const response = await Axios.post('/driver', payload);
  return response.data;
}

export const getDrivers = async () => {
  const response = await Axios.get('/driver');
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
export const createTrip = async (payload) => {
  const response = await Axios.post('/trip', payload);
  return response.data;
}

export const editTrip = async (id, payload) => {
  const response = await Axios.patch(`/trip/${id}`, payload);
  return response.data;
}

export const deleteTrip = async (id) => {
  const response = await Axios.delete(`/trip/${id}`);
  return response.data;
}

// maintenance
export const createMaintenance = async (payload) => {
  const response = await Axios.post('/maintenance', payload);
  return response.data;
}

export const editMaintenance = async (id, payload) => {
  const response = await Axios.patch(`/maintenance/${id}`, payload);
  return response.data;
}

export const deleteMaintenance = async (id) => {
  const response = await Axios.delete(`/maintenance/${id}`);
  return response.data;
}

// dispatch
export const createDispatch = async (payload) => {
  const response = await Axios.post('/dispatch', payload);
  return response.data;
}

export const editDispatch = async (id, payload) => {
  const response = await Axios.patch(`/dispatch/${id}`, payload);
  return response.data;
}

export const deleteDispatch = async (id) => {
  const response = await Axios.delete(`/dispatch/${id}`);
  return response.data;
}