// MyIdeasPage.tsx
import { useEffect, useState } from "react";
import IdeaTable from "@components/IdeaTable";
import Pagination from "@components/Pagination";
import { useLocation } from "react-router-dom";
import { fetchUserIdeas } from "@api/user";

interface Idea {
  id: number;
  content: string;
  recordId: number;
  problemTitle: string;
  categories: string[];
}

const MyIdeasPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = 10;

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetchUserIdeas();
        setIdeas(res.data.ideas);
      } catch (err) {
        console.error("아이디어 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [currentPage]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">아이디어 페이지</h1>
      <IdeaTable ideas={ideas} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default MyIdeasPage;
