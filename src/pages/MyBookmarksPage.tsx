import { useEffect, useState } from "react";
import RecordCard from "@components/RecordCard";
import { fetchBookmarks } from "@api/records";
import Button from "@components/Button";
import type { Record, RecordResponse } from "types/record";
import Pagination from "@components/Pagination";
import BookmarkIcon from "@assets/BookmarkIcon.svg";
import { useLocation } from "react-router-dom";

const MyBookmarksPage = () => {
  const [records, setRecords] = useState<RecordResponse>();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || "";

  const loadRecords = async () => {
    try {
      const category = keyword ?? undefined;
      const res = await fetchBookmarks(category);
      const r = res.data.bookmarks;
      const mapped: Record[] = r.map((r: any) => ({
        id: r.id,
        type: r.categories[0],
        site: r.source,
        title: r.title,
        author: r.author,
        date: r.createdAt.slice(0, 10),
      }));
      setRecords({
        records: mapped,
        page: res.data.page,
        size: res.data.size,
        totalElements: res.data.totalElements,
        totalPages: res.data.totalPages,
        first: res.data.first,
        last: res.data.last,
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadRecords();
  }, [keyword]);

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5">
      {records?.records?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="w-50 h-50 rounded-full bg-[#E5E5E5] flex items-center justify-center">
            <img src={BookmarkIcon} className="w-24 h-24" />
          </div>
          <p className="text-xl font-semibold">아직 북마크가 없어요</p>
          <p className="text-gray-600">
            다시 보고 싶은 풀이를
            <br />
            북마크해보세요!
          </p>
          <Button
            onClick={() => {
              window.location.href = "/my-records";
            }}
          >
            내 기록
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
            {records?.records.map((r) => (
              <RecordCard
                draft={false}
                key={r.id}
                id={r.id}
                problemType={r.type}
                problemSite={r.site}
                title={r.title}
                author={r.author}
                createdAt={r.date}
              />
            ))}
          </div>
          <Pagination
            totalPages={records?.totalPages!}
            currentPage={records?.page!}
          />
        </>
      )}
    </div>
  );
};

export default MyBookmarksPage;
