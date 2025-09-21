// MyIdeasPage.tsx
import { useEffect, useState } from "react";
import IdeaTable from "@components/IdeaTable";
import Pagination from "@components/Pagination";
import { useLocation } from "react-router-dom";
import { fetchUserIdeas } from "@api/user";
import Loading from "@components/Loading";
import Button from "@components/Button";

interface Idea {
  id: number;
  content: string;
  recordId: number;
  problemTitle: string;
  categories: string[];
}

interface IdeaResponse {
  ideas: Idea[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

const MyIdeasPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [ideas, setIdeas] = useState<IdeaResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetchUserIdeas();
        setIdeas(res.data);
      } catch (err) {
        console.error("아이디어 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [currentPage]);

  if (loading) return <Loading />;

  return (
    <div className="p-4 flex flex-col items-center w-full gap-5">
      {ideas?.ideas?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="w-50 h-50 rounded-full bg-gray-300" />
          <p className="text-xl font-semibold">아직 핵심 아이디어가 없어요</p>
          <p className="text-gray-600">
            풀이 기록 시<br />
            핵심 아이디어를 기록해보세요!
          </p>
          <Button
            onClick={() => {
              window.location.href = "/record/create";
            }}
          >
            기록하기
          </Button>
        </div>
      ) : (
        <>
          <IdeaTable ideas={ideas?.ideas!} />
          <Pagination
            totalPages={ideas?.totalPages!}
            currentPage={ideas?.page!}
          />
        </>
      )}
    </div>
  );
};

export default MyIdeasPage;
