import Button from "@components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import routes from "@constants/routes.json";
import ProfileDropdown from "@components/Dropdown/ProfileDropdown";

const Header = () => {
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = routes.find((route) => route.path === location.pathname);
  const isMyPage = !!currentRoute;

  return (
    <header className="w-full bg-white border-b border-gray-200 top-0 z-50 fixed">
      {!isMyPage ? (
        <div className="max-w-[1280px] mx-auto h-16 flex items-center justify-between px-6">
          <div
            className="text-xl font-extrabold cursor-pointer"
            onClick={() => navigate("/")}
          >
            &lt;/&gt; ALGO
          </div>
          {accessToken ? (
            <div className="flex flex-row gap-4 items-center">
              <Button onClick={() => navigate("/record/create")}>
                기록하기
              </Button>
              <ProfileDropdown avatarUrl={user?.avatarUrl} />
            </div>
          ) : (
            <Button onClick={() => navigate("/login")}>로그인</Button>
          )}
        </div>
      ) : (
        <div className="mx-auto h-16 flex items-center bg-white">
          <div className="w-64 px-4 h-full border-r border-gray-200 flex items-center">
            <div
              className="text-xl font-extrabold cursor-pointer"
              onClick={() => navigate("/")}
            >
              &lt;/&gt; ALGO
            </div>
          </div>
          <span className="text-xl font-semibold pl-4">
            {currentRoute ? currentRoute.label : "알 수 없는 페이지"}
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
