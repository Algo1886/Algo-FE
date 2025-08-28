import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { requestGithubLoginToken } from "@api/auth"
import { useAuth } from "@contexts/AuthContext"

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID
const REDIRECT_URI = "http://localhost:5173/login/github"

const GithubLoginButton = () => {
  const navigate = useNavigate()
  const { setAccessToken } = useAuth()
  const [hasSent, setHasSent] = useState(false)

  const code = new URLSearchParams(window.location.search).get("code")

  useEffect(() => {
    if (code && !hasSent) {
      requestGithubLoginToken(code)
        .then((data) => {
          if (data.success && data.data) {
            setAccessToken(data.data.accessToken)
            localStorage.setItem("refreshToken", data.data.refreshToken) // 추가
            navigate("/")
            setHasSent(true)
          }
        })
        .catch((err) => console.error(err))
    }
  }, [code, hasSent, setAccessToken, navigate])

  const goToGithubAuth = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user user:email`
    window.location.href = url
  }

  return (
    <button
      onClick={goToGithubAuth}
      className="w-full py-3 rounded-[12px] bg-black text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer"
    >
      GitHub 로그인
    </button>
  )
}

export default GithubLoginButton