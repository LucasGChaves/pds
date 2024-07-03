import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const api = axios.create({
  baseURL: API_URL,
});

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    return value;
  } catch (e) {
    // error reading value
  }
};

const setTokenExpired = async (value: string) => {
  try {
    await AsyncStorage.setItem("token", value);
  } catch (e) {}
};

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      setTokenExpired("expired");
    }
    return Promise.reject(error);
  }
);

export default api;
