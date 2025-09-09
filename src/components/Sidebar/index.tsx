import ProfileBox from "@components/ProfileBox";
import RoutingConstants from "@constants/routes.json";

import DashboardIcon from "@assets/DashboardIcon.svg";
import BookIcon from "@assets/BookIcon.svg";
import LineChartIcon from "@assets/LineChartIcon.svg";
import BarChartIcon from "@assets/BarChartIcon.svg";
import BookmarkIcon from "@assets/BookmarkIcon.svg";
import SettingIcon from "@assets/SettingIcon.svg";
import UserIcon from "@assets/UserIcon.svg";

import { useLocation } from "react-router-dom";

const ICONS: Record<string, string> = {
  Dashboard: DashboardIcon,
  Book: BookIcon,
  LineChart: LineChartIcon,
  BarChart: BarChartIcon,
  Bookmark: BookmarkIcon,
  Setting: SettingIcon,
  User: UserIcon,
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="w-64 h-screen flex flex-col border-r border-r-gray-200 fixed left-0 top-0 bg-white mt-16">
      <ProfileBox type="sidebar" />
      <div className="flex flex-col px-2 py-2 gap-1.5">
        {RoutingConstants.map((item, index) => {
          const Icon = ICONS[item.icon];
          return (
            <a
              key={index}
              href={item.path}
              className={`flex items-center rounded-lg gap-3 px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors ${
                location.pathname === item.path
                  ? "bg-gray-200 font-semibold"
                  : ""
              }`}
            >
              <img src={Icon} alt={`${item.label} icon`} className="w-4 h-4" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
export default Sidebar;
