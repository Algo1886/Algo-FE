import api from "./axiosInstance"

export const fetchUserProfile = async () => {
  const res = await api.get("/users/me")
  return res.data
}