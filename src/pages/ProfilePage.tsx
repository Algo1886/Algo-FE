import { useEffect } from "react";
import ProfileBox from "@components/ProfileBox";
import Button from "@components/Button";
import { useAuth } from "@contexts/AuthContext";
import { fetchUserProfile } from "@api/user";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { accessToken, setAccessToken, user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;
    fetchUserProfile()
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.error(err));
  }, [accessToken]);

  const handleLogout = () => {
    setAccessToken(""); // Context + localStorage 초기화
    setUser(null); // Context의 user 초기화
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-slate-50">
      <h1 className="text-2xl font-bold">프로필 페이지</h1>

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
