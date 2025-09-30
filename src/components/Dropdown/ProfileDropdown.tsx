import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { requestLogout } from "@api/auth";
import { useConfirm } from "@contexts/ConfirmContext";

interface ProfileDropdownProps {
  avatarUrl?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ avatarUrl }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { refreshToken, logout } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const defaultAvatar = "https://www.gravatar.com/avatar/"; // TODO: default 이미지 주소로 변경
  const { confirm } = useConfirm();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { label: "기록허브", path: "/dashboard" },
    {
      label: "로그아웃",
      action: async () => {
        const result = await confirm({ title: "로그아웃", detail: "로그아웃 하시겠습니까?"});
        if (!result) return;
        if (refreshToken) {
          try {
            await requestLogout(refreshToken);
          } catch (err) {
            console.error("로그아웃 실패", err);
          }
        }
        logout();
      },
    }
  ];

  return (
    <div className="relative" ref={containerRef}>
      <img
        src={avatarUrl || defaultAvatar}
        alt="프로필"
        className="border border-gray-200 w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div
          className="absolute top-full mt-2 min-w-max rounded border border-gray-200 bg-white shadow-lg z-50 max-w-[90vw]"
          style={{
            left: windowWidth >= 1280 ? "50%" : "auto",
            right: windowWidth < 1280 ? 0 : "auto",
            transform: windowWidth >= 1280 ? "translateX(-50%)" : "none",
          }}
        >
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOpen(false);
                if (opt.path) navigate(opt.path);
                if (opt.action) opt.action();
              }}
              className="w-full text-center py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
