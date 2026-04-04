import api, { normalizeStoredUser, storage } from "./api";

export async function registerUser(payload) {
  const { data } = await api.post("/users/register", payload);
  storage.setToken(data.token);
  storage.setUser(data.user);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post("/users/login", payload);
  storage.setToken(data.token);
  storage.setUser(data.user);
  return data;
}

export async function getProfile(userId) {
  const { data } = await api.get(`/users/${userId}`);
  if (data.user) {
    const normalizedUser = normalizeStoredUser(data.user);
    storage.setUser(normalizedUser);
    return normalizedUser;
  }
  return null;
}

export async function logoutUser() {
  try {
    await api.post("/users/logout");
  } finally {
    storage.clearToken();
    storage.clearUser();
  }
}
