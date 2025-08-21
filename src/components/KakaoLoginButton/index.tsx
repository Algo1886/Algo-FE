// components/KakaoLoginButton.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestKakaoLoginToken } from "@api/auth";
import { useAuth } from "@contexts/AuthContext";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API;
const REDIRECT_URI = "http://localhost:5173/login";

const KakaoLoginButton = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [hasSent, setHasSent] = useState(false);

  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code && !hasSent) {
      requestKakaoLoginToken(code)
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

  const goToKakaoAuth = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = url;
  };

  return (
    <button
      onClick={goToKakaoAuth}
      className="w-full py-3 rounded-xl bg-yellow-300 text-slate-900 font-semibold hover:bg-yellow-400 transition"
    >
      카카오 로그인
    </button>
  );
};

export default KakaoLoginButton;