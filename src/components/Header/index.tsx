// components/Header.tsx
import Button from "@components/Button"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const { accessToken, user } = useAuth()
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate("/login")
  }

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        &lt;/&gt; ALGO
      </div>

      {accessToken && user?.avatarUrl ? (
        <div className="flex flex-row gap-4 items-center">
          <Button theme="light" onClick={() => navigate("/create")}>
            기록하기
          </Button>
        <img
          src={user.avatarUrl}
          alt="프로필"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        </div>
      ) : (
        <Button theme="light" onClick={handleLoginClick}>
          로그인
        </Button>
      )}
    </header>
  )
}

export default Header