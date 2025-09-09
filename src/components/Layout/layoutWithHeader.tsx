import Header from "@components/Header";
import { Outlet } from "react-router-dom";

const LayoutWithHeader = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <div className="w-full pt-16"> 
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWithHeader;
