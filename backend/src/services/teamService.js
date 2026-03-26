import axios from "axios";

const API_URL = "http://localhost:5000/api/teams";

export const getTeams = (params = {}) => {
  return axios.get(API_URL, { params });
};