import { Outlet } from "react-router-dom";
import Footer from "@components/Footer";

const LayoutWithFooter = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full"> 
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default LayoutWithFooter;
