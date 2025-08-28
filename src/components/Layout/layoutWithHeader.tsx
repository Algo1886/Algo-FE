import Header from "@components/Header";
import { Outlet } from "react-router-dom";

const LayoutWithHeader = () => {
  return (
    <div className="w-full h-full flex flex-col bg-white items-center">
      <Header />
      <Outlet />
    </div>
  );
};

export default LayoutWithHeader;
