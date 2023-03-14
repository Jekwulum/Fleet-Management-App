import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const instance = axios.create({ baseURL: BASE_URL });

