import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";

const LayoutWithSidebar = () => {
  return (
    <div className="flex flex-row h-[calc(100vh-64px)] ml-64">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWithSidebar;
