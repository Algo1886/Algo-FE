import IdeaTable from "@components/IdeaTable";
import Pagination from "@components/Pagination";
import { useLocation } from "react-router-dom";

const IdeaPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = 10;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">아이디어 페이지</h1>
      <IdeaTable />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default IdeaPage;
