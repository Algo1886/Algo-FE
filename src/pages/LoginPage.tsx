import KakaoLoginButton from "@components/KakaoLoginButton"
import GithubLoginButton from "@components/GithubLoginButton"
import { useAuth } from "@contexts/AuthContext"

const LoginPage = () => {
  const { accessToken } = useAuth()
  const headerHeight = 64 // 레이아웃 헤더 높이(px)

  return (
    <div className="w-full bg-slate-50">
      <main
        className={`flex flex-col items-center justify-center`}
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          알고리즘 기록 플랫폼 <span className="text-indigo-600">ALGO</span>에서 <br />
          알고리즘 공부를 시작해보세요!
        </h1>
        <div className="flex flex-col gap-4 w-64">
          <KakaoLoginButton />
          <GithubLoginButton />
        </div>

        {accessToken && (
          <div className="mt-6 p-4 bg-white rounded-xl shadow text-sm text-slate-800 w-96">
            <p>Access Token: {accessToken}</p>
            {/* refreshToken은 서버 쿠키로 관리, 프론트에 노출 안 함 */}
          </div>
        )}
      </main>
    </div>
  )
}

export default LoginPage