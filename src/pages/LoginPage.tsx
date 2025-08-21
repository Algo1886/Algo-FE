import KakaoLoginButton from "@components/KakaoLoginButton"
import { useAuth } from "@contexts/AuthContext"

const LoginPage = () => {
  const { accessToken } = useAuth()

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-900 mb-8 text-center">
        알고리즘 기록 플랫폼 <span className="text-indigo-600">ALGO</span>에서 <br />
        알고리즘 공부를 시작해보세요!
      </h1>
      <div className="flex flex-col gap-4 w-64">
        <KakaoLoginButton />
        <button className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-700 transition">
          깃허브 로그인
        </button>
      </div>

      {accessToken && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow text-sm text-slate-800 w-96">
          <p>Access Token: {accessToken}</p>
          {/* refreshToken은 서버 쿠키로 관리, 프론트에 노출 안 함 */}
        </div>
      )}
    </div>
  )
}

export default LoginPage