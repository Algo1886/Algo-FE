import api from "./axiosInstance"

export const fetchUserProfile = async () => {
  const res = await api.get("/users/me")
  return res.data
}

export const updateUserProfile = async (data: { username?: string; avatarUrl?: string }) => {
  const res = await api.patch("/users/me", data)
  return res.data
}

export const deleteUserAccount = async () => {
  const res = await api.delete("/users/me")
  return res.data
}