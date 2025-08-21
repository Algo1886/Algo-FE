import api from "./axiosInstance"

export const requestKakaoLoginToken = async (code: string) => {
  const res = await api.post("/auth/kakao-login", { token: code })
  return res.data
}

export const requestGithubLoginToken = async (code: string) => {
  const res = await api.post("/auth/github-login", { token: code })
  return res.data
}