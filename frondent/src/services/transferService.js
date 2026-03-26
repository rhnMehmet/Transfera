import api from "./api";

export const getTransfers = (params = {}) => {
  return api.get("/transfers", { params });
};