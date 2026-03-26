import api from "./api";

export const getTeams = (params = {}) => {
  return api.get("/teams", { params });
};

export const getTeamDetail = (teamId) => {
  return api.get(`/teams/${teamId}`);
};

export const getTeamSquad = (teamId) => {
  return api.get(`/teams/${teamId}/squad`);
};