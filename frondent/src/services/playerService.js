import api from "./api";

export const getPlayers = (params = {}) => {
  return api.get("/players", { params });
};

export const getPlayerDetail = (playerId, season) => {
  return api.get(`/players/${playerId}`, {
    params: { season },
  });
};

export const getPlayerTransfers = (playerId) => {
  return api.get(`/players/${playerId}/transfers`);
};