import { useState, useEffect } from "react"
import ProfileBox from "@components/ProfileBox"
import Button from "@components/Button"
import { useAuth } from "@contexts/AuthContext"
import { fetchUserProfile, updateUserProfile, deleteUserAccount, fetchUserStats } from "@api/user"
import { requestLogout } from "@api/auth"
import { useNavigate } from "react-router-dom"
import StatsCards from "@components/StatsCards"

function ProfilePage() {
  const { accessToken, user, setUser, setAccessToken } = useAuth()
  const [stats, setStats] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) return
    fetchUserProfile()
      .then((data) => setUser(data.data))
      .catch((err) => console.error(err))

    fetchUserStats()
      .then((res) => {
        if (res.data.records.totalCount == 0) {
          setStats(null)
        } else {
          setStats(res.data)
        }
      }
      )
      .catch((err) => console.error(err))
  }, [accessToken, setUser])

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (refreshToken) await requestLogout(refreshToken)

      setAccessToken("")
      setUser(null)
      localStorage.removeItem("refreshToken")
      navigate("/")
    } catch (err) {
      console.error("로그아웃 실패", err)
      alert("로그아웃 중 오류가 발생했습니다")
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm("정말 계정을 탈퇴하시겠습니까?")) return
    try {
      await deleteUserAccount()
      setAccessToken("")
      setUser(null)
      localStorage.removeItem("refreshToken")
      navigate("/")
    } catch (err) {
      console.error("회원 탈퇴 실패", err)
      alert("회원 탈퇴 중 오류가 발생했습니다")
    }
  }

  const handleSave = async (newUsername: string, newAvatarUrl: string) => {
    try {
      const updated = await updateUserProfile({
        username: newUsername,
        avatarUrl: newAvatarUrl,
      })
      setUser(updated.data)
      setIsEditing(false)
    } catch (err) {
      console.error("프로필 수정 실패", err)
      alert("프로필 수정 중 오류 발생")
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="w-full h-screen flex flex-col items-center bg-slate-50">
      <h1 className="text-2xl font-bold mb-4">프로필 페이지</h1>

      <ProfileBox type="profileBox" />

      {isEditing ? (
        <EditForm
          user={{ username: user.username, avatarUrl: user.avatarUrl || "" }}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex flex-col gap-2 mb-6">
          <Button color="dark" onClick={() => setIsEditing(true)}>편집</Button>
          <Button color="dark" onClick={handleLogout}>로그아웃</Button>
          <Button color="red" onClick={handleDeleteAccount}>회원 탈퇴</Button>
        </div>
      )}
    {stats && <StatsCards stats={stats} />}
    </div>
  )
}

interface EditFormProps {
  user: { username: string; avatarUrl: string }
  onSave: (username: string, avatarUrl: string) => void
  onCancel: () => void
}

const EditForm = ({ user, onSave, onCancel }: EditFormProps) => {
  const [username, setUsername] = useState(user.username)
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl)

  return (
    <div className="flex flex-col gap-2 w-64">
      <input
        className="border rounded p-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border rounded p-2"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <div className="flex gap-2">
        <Button color="dark" onClick={() => onSave(username, avatarUrl)}>저장</Button>
        <Button color="light" onClick={onCancel}>취소</Button>
      </div>
    </div>
  )
}

export default ProfilePage