import axios from "axios";

const API_URL = "http://localhost:5000/api/transfers";

export const getTransfers = (params = {}) => {
  return axios.get(API_URL, { params });
};