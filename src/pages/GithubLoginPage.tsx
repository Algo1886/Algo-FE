// pages/GithubLoginPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestGithubLoginToken } from "@api/auth";
import { useAuth } from "@contexts/AuthContext";

const GithubLoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuth();
  const [hasSent, setHasSent] = useState(false);

  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code && !hasSent) {
      requestGithubLoginToken(code)
        .then((data) => {
          if (data.success && data.data) {
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            navigate("/");
            setHasSent(true);
          }
        })
        .catch(console.error);
    }
  }, [code, hasSent, setAccessToken, setRefreshToken, navigate]);

  return <div>깃허브 로그인 처리 중...</div>;
};

export default GithubLoginPage;