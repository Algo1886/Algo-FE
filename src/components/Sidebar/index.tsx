import ProfileBox from "@components/ProfileBox";
import RoutingConstants from "@constants/routes.json";

import DashboardIcon from "@assets/DashboardIcon.svg";
import BookIcon from "@assets/BookIcon.svg";
import LineChartIcon from "@assets/LineChartIcon.svg";
import BarChartIcon from "@assets/BarChartIcon.svg";
import BookmarkIcon from "@assets/BookmarkIcon.svg";
import SettingIcon from "@assets/SettingIcon.svg";
import UserIcon from "@assets/UserIcon.svg";

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
  return (
    <nav className="w-64 shrink-0 flex flex-col">
      <ProfileBox type="sidebar" />
      {/* routing area */}
      <div className="flex flex-col px-1 py-2 gap-1.5">
        {RoutingConstants.map((item, index) => {
          const Icon = ICONS[item.icon];
          return (
            <a
              key={index}
              href={item.path}
              className="flex items-center rounded-md gap-3 px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors"
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
