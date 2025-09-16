import api from "./axiosInstance"
import axios from "axios"

export const requestKakaoLoginToken = async (code: string) => {
  const res = await api.post("/auth/kakao-login", { token: code })
  return res.data
}

export const requestGithubLoginToken = async (code: string) => {
  const res = await api.post("/auth/github-login", { token: code })
  return res.data
}

export const requestLogout = async (refreshToken: string) => {
  const res = await api.post("/auth/logout", { refreshToken })
  return res.data
}

// refresh 요청은 api 대신 순수 axios 사용 (만료된 accessToken 헤더 방지)
export const requestRefreshToken = async (refreshToken: string) => {
  const res = await axios.post("http://13.209.211.225:8080/api/auth/refresh", { refreshToken }, {
    headers: { "Content-Type": "application/json" }
  })
  return res.data
}