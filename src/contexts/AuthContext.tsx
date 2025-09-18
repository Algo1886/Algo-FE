// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "@api/axiosInstance";

interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  streak: number;
}
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: User | null) => void;
  refreshAccessToken: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // 앱 초기 렌더 시 로컬스토리지에서 토큰 불러오기
  useEffect(() => {
    const storedAccess = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");
    if (storedAccess) setAccessTokenState(storedAccess);
    if (storedRefresh) setRefreshTokenState(storedRefresh);
    if (storedAccess) fetchUserProfile(storedAccess);
  }, []);

  const setAccessToken = (token: string) => {
    setAccessTokenState(token);
    localStorage.setItem("accessToken", token);
    fetchUserProfile(token);
  };

  const setRefreshToken = (token: string) => {
    setRefreshTokenState(token);
    localStorage.setItem("refreshToken", token);
  };

  const fetchUserProfile = async (token: string) => {
    if (!token) return;
    try {
      const res = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) return;
    try {
      const res = await api.post("/auth/refresh", { refreshToken });
      if (res.data.success && res.data.data) {
        setAccessToken(res.data.data.accessToken);
      }
    } catch (err) {
      console.error("토큰 갱신 실패", err);
      logout();
    }
  };

  const logout = () => {
    setAccessTokenState(null);
    setRefreshTokenState(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        setAccessToken,
        setRefreshToken,
        setUser,
        refreshAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
