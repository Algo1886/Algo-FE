import api from "./axiosInstance"

export const fetchUserProfile = async () => {
  const res = await api.get("/users/me")
  return res.data
}

export const fetchUserStreak = async () => {
  const res = await api.get("/users/me/streak")
  console.log(res.data)
  return res.data.totalCount
}

export const updateUserProfile = async (data: { username?: string; avatarUrl?: string }) => {
  const res = await api.patch("/users/me", data)
  return res.data
}

export const deleteUserAccount = async () => {
  const res = await api.delete("/users/me")
  return res.data
}

export const fetchUserRecords = async (page: number = 1, size: number = 12) => {
  const res = await api.get("/users/me/records", { params: { page, size } })
  return res.data
}

export const fetchUserDrafts = async () => {
  const res = await api.get("/users/me/drafts")
  console.log(res)
  return res.data
}

export const fetchUserIdeas = async () => {
  const res = await api.get("/users/me/ideas")
  return res.data
}

export const fetchUserStats = async () => {
  const res = await api.get("/users/me/stats")
  return res.data
}

export const fetchUserRecommend = async () => {
  const res = await api.get("/users/me/reviews")
  console.log(res.data)
  return res.data
}