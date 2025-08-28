import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { requestKakaoLoginToken } from "@api/auth"
import { useAuth } from "@contexts/AuthContext"

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API
const REDIRECT_URI = "http://localhost:5173/login/kakao"

const KakaoLoginButton = () => {
  const navigate = useNavigate()
  const { setAccessToken, setRefreshToken } = useAuth()
  const [hasSent, setHasSent] = useState(false)

  const code = new URLSearchParams(window.location.search).get("code")

  useEffect(() => {
    if (code && !hasSent) {
      requestKakaoLoginToken(code)
        .then((data) => {
          if (data.success && data.data) {
            setAccessToken(data.data.accessToken)
            setRefreshToken(data.data.refreshToken) // 여기 추가
            navigate("/")
            setHasSent(true)
          }
        })
        .catch((err) => console.error(err))
    }
  }, [code, hasSent, setAccessToken, setRefreshToken, navigate])

  const goToKakaoAuth = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    window.location.href = url
  }

  return (
    <button
      onClick={goToKakaoAuth}
      className="w-full py-3 rounded-[12px] bg-[#FEE500] text-slate-900 font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="#000000"
      >
        <path d="M12 2C6.48 2 2 5.8 2 10.25c0 2.65 1.8 5 4.65 6.44L6 22l5.67-3.14C12.56 18.94 12.78 19 13 19c5.52 0 10-3.8 10-8.25S17.52 2 12 2z" />
      </svg>
      카카오 로그인
    </button>
  )
}

export default KakaoLoginButton