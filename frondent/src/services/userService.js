import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProfile = (userId) => {
  return axios.get(`${API_URL}/${userId}`, getAuthHeaders());
};

export const addFavoriteTeam = (userId, teamData) => {
  return axios.post(`${API_URL}/${userId}/favorites/teams`, teamData, getAuthHeaders());
};

export const removeFavoriteTeam = (userId, teamId) => {
  return axios.delete(`${API_URL}/${userId}/favorites/teams/${teamId}`, getAuthHeaders());
};

export const addFavoritePlayer = (userId, playerData) => {
  return axios.post(`${API_URL}/${userId}/favorites/players`, playerData, getAuthHeaders());
};

export const removeFavoritePlayer = (userId, playerId) => {
  return axios.delete(`${API_URL}/${userId}/favorites/players/${playerId}`, getAuthHeaders());
};

export const updateNotifications = (userId, notificationData) => {
  return axios.put(`${API_URL}/${userId}/notifications`, notificationData, getAuthHeaders());
};

export const updateProfile = (userId, userData) => {
  return axios.put(`${API_URL}/${userId}`, userData, getAuthHeaders());
};

export const changePassword = (userId, passwordData) => {
  return axios.put(`${API_URL}/${userId}/password`, passwordData, getAuthHeaders());
};

export const logoutRequest = () => {
  return axios.post(`${API_URL}/logout`, {}, getAuthHeaders());
};

export const deleteAccount = (userId) => {
  return axios.delete(`${API_URL}/${userId}`, getAuthHeaders());
};


