import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { requestKakaoLoginToken } from "@api/auth";
import { useAuth } from "@contexts/AuthContext";
import Loading from "@components/Loading";

const KakaoLoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuth();

  const code = new URLSearchParams(window.location.search).get("code");
  const didRun = useRef(false);

  useEffect(() => {
    if (code && !didRun.current) {
      didRun.current = true;
      requestKakaoLoginToken(code)
        .then((data) => {
          if (data.success && data.data) {
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            navigate("/");
          } else {
            alert(`로그인 실패: ${JSON.stringify(data)}`);
          }
        })
        .catch((err) => {
          alert(`에러: ${err}`);
        });
    }
  }, [code]);

  return (
    <Loading />
  );
};

export default KakaoLoginPage;