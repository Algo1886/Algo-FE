import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requestKakaoLoginToken } from "@api/auth";
import { useAuth } from "@contexts/AuthContext";
import Loading from "@components/Loading";

const KakaoLoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuth();

  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code) {
      requestKakaoLoginToken(code)
        .then((data) => {
          if (data.success && data.data) {
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            navigate("/");
          } else {
            console.error("로그인 실패:", data);
          }
        })
        .catch(console.error)
    }
  }, [code, setAccessToken, setRefreshToken, navigate]);

  return (
    <Loading />
  );
};

export default KakaoLoginPage;