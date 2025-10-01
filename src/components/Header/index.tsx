import Button from "@components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import routes from "@constants/routes.json";
import ProfileDropdown from "@components/Dropdown/ProfileDropdown";
// import FilterDropdown from "./_component/FilterDropdown";

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
          <div className="w-64 px-4 h-full border-r border-gray-200 flex items-center shrink-0">
            <div
              className="text-xl font-extrabold cursor-pointer"
              onClick={() => navigate("/")}
            >
              &lt;/&gt; ALGO
            </div>
          </div>
          <div className="w-full justify-between flex items-center px-4">
            <span className="text-xl font-semibold">
              {currentRoute ? currentRoute.label : "알 수 없는 페이지"}
            </span>
            {/* {currentRoute.filter && (
              <FilterDropdown initialRoute={currentRoute.path} />
            )} */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
