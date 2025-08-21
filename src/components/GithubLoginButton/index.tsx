// components/GithubLoginButton.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestGithubLoginToken } from "@api/auth";
import { useAuth } from "@contexts/AuthContext";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5173/login";

const GithubLoginButton = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [hasSent, setHasSent] = useState(false);

  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code && !hasSent) {
      requestGithubLoginToken(code)
        .then((data) => {
          if (data.success && data.data) {
            setAccessToken(data.data.accessToken);
            navigate("/");
            setHasSent(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [code, hasSent, setAccessToken, navigate]);

  const goToGithubAuth = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
    window.location.href = url;
  };

  return (
    <button
      onClick={goToGithubAuth}
      className="w-full py-3 rounded-[12px] bg-slate-900 text-white font-semibold hover:bg-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
    >
      {/* 깃허브 로고 SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 0-.288-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.323 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.004 2.045.137 3 .404 2.29-1.553 3.296-1.23 3.296-1.23.654 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.625-5.475 5.922.43.37.814 1.096.814 2.21 0 1.596-.014 2.884-.014 3.274 0 .322.216.698.825.58C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
      깃허브 로그인
    </button>
  );
};

export default GithubLoginButton;