import axios from "axios"
import { requestRefreshToken } from "@api/auth"

const api = axios.create({
  baseURL: "http://13.209.211.225:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const forceLogout = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  window.location.href = "/"
}

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 토큰 만료 → refresh 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers.Authorization = "Bearer " + token
            return api(originalRequest)
          })
          .catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) {
        isRefreshing = false
        forceLogout()
        return Promise.reject(error)
      }

      try {
        const res = await requestRefreshToken(refreshToken)
        const newAccessToken = res.data.accessToken
        if (!newAccessToken) throw new Error("토큰 재발급 실패")

        localStorage.setItem("accessToken", newAccessToken)
        api.defaults.headers.common.Authorization = "Bearer " + newAccessToken
        processQueue(null, newAccessToken)

        // 원래 요청 다시 실행
        originalRequest.headers.Authorization = "Bearer " + newAccessToken
        return api(originalRequest)
      } catch (err: any) {
        processQueue(err, null)
        forceLogout()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api