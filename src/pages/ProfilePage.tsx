import { useState, useEffect } from "react";
import ProfileBox from "@components/ProfileBox";
import Button from "@components/Button";
import {
  fetchUserProfile,
  updateUserProfile,
  deleteUserAccount,
  fetchUserStats,
} from "@api/user";
import { requestLogout } from "@api/auth";
import { useNavigate } from "react-router-dom";
import StatsCards from "@components/StatsCards";
import EditButtonSvg from "@assets/EditButton.svg";

const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <span
      onClick={onClick}
      className="flex flex-row gap-2 h-fit items-center px-2 py-1 rounded-sm border border-gray-200"
    >
      <img src={EditButtonSvg} alt="편집 버튼" className="w-3 h-3" />
      <span className="font-semibold text-sm">편집</span>
    </span>
  );
};

function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const p = await fetchUserProfile();
        setProfile(p.data);
        setUsername(p.data?.username || "");
        setAvatarUrl(p.data?.avatarUrl || "");
        const s = await fetchUserStats();
        setStats(s.data);
      } catch (err) {
        console.error("프로필/통계 불러오기 실패:", err);
      }
    };
    init();
  }, []);

  const onLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await requestLogout(refreshToken);
      }
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  const onDelete = async () => {
    if (!confirm("정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."))
      return;
    try {
      await deleteUserAccount();
      navigate("/");
    } catch (err) {
      console.error("회원 탈퇴 실패:", err);
    }
  };

  const onSave = async () => {
    try {
      const res = await updateUserProfile({ username, avatarUrl });
      setProfile(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("프로필 저장 실패:", err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-[#F8FAFC]">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">프로필 정보</h2>
          {!isEditing ? (
            <EditButton onClick={() => setIsEditing(true)} />
          ) : (
            <div className="flex gap-2">
              <Button
                theme="dark"
                onClick={onSave}
                className="px-3 py-1 text-sm"
              >
                저장
              </Button>
              <Button
                theme="light"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-sm border border-gray-300"
              >
                취소
              </Button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <ProfileBox type="profileBox" />
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">닉네임</label>
              <input
                className="border rounded px-3 py-2 w-64"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">아바타 URL</label>
              <input
                className="border rounded px-3 py-2 w-[28rem]"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <StatsCards stats={stats || {}} />

      <div className="w-full flex items-start">
        <Button
          theme="light"
          onClick={onLogout}
          className="mr-2 border border-gray-300"
        >
          로그아웃
        </Button>
        <Button
          theme="light"
          onClick={onDelete}
          className="border border-gray-300 text-red-600"
        >
          회원탈퇴
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;
