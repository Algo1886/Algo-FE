import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";

const LayoutWithSidebar = () => {
  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default LayoutWithSidebar;
