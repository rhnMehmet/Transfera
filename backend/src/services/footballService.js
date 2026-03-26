const axios = require("axios");

const API_URL = "https://v3.football.api-sports.io";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-apisports-key": process.env.API_FOOTBALL_KEY, // .env’den al
  },
});

exports.getPlayers = async (params) => {
  const response = await api.get("/players", { params });
  return response.data;
};

exports.getTeams = async (params) => {
  const response = await api.get("/teams", { params });
  return response.data;
};

exports.getTransfers = async (params) => {
  const response = await api.get("/transfers", { params });
  return response.data;
};

exports.getTeamSquad = async (params) => {
  const response = await api.get("/players/squads", { params });
  return response.data;
};