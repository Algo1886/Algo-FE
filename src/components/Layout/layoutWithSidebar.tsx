import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";

const LayoutWithSidebar = () => {
  return (
    <div className="flex flex-row h-screen ml-64">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWithSidebar;
