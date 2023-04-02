import axios from "axios";

// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = "https://fleet-api.onrender.com/api";

export const instance = axios.create({ baseURL: BASE_URL });

