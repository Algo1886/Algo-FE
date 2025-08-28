import { useEffect, useState } from "react"
import ProfileBox from "@components/ProfileBox"
import Button from "@components/Button"
import { useAuth } from "@contexts/AuthContext"
import { fetchUserProfile } from "@api/user"
import { requestLogout } from "@api/auth" // 새로 만든 로그아웃 API
import { useNavigate } from "react-router-dom"

interface UserData {
  id: number
  username: string
  avatarUrl: string
}

function ProfilePage() {
  const { accessToken, setAccessToken, setUser } = useAuth()
  const [user, setLocalUser] = useState<UserData | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) return;
    fetchUserProfile()
      .then((data) => setLocalUser(data.data))
      .catch((err) => console.error(err))
  }, [accessToken])

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) {
        console.warn("리프레시 토큰이 없습니다")
      } else {
        await requestLogout(refreshToken)
      }

      // Context + localStorage 초기화
      setAccessToken("")
      setUser(null)
      setLocalUser(null)
      localStorage.removeItem("refreshToken")

      navigate("/")
    } catch (err) {
      console.error("로그아웃 실패", err)
      alert("로그아웃 중 오류가 발생했습니다")
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center bg-slate-50">
      <h1 className="text-2xl font-bold mb-4">프로필 페이지</h1>

      {user && (
        <>
          <ProfileBox type="profileBox" />
          <Button color="dark" onClick={handleLogout}>
            로그아웃
          </Button>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
