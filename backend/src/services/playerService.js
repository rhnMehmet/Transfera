import axios from "axios";

const API_URL = "http://localhost:5000/api/players";

export const getPlayers = (params = {}) => {
  return axios.get(API_URL, { params });
};