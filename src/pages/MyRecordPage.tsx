import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecordCard from "@components/RecordCard";
import { fetchUserRecords } from "@api/user";
import Pagination from "@components/Pagination";
import Loading from "@components/Loading";
import type { Record, RecordResponse } from "types/record";

const size = 12;

const MyRecordPage = () => {
  const [records, setRecords] = useState<RecordResponse>();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = Number(searchParams.get("page")) || 1;

  const loadRecords = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetchUserRecords(page, size);
      const r = res.data.records;
      const mapped: Record[] = r.map((r: any) => ({
        id: r.id,
        type: r.categories[0] || "기타",
        site: r.source || "백준",
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords(page);
  }, [page]);

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5">
      <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
        {records?.records?.map((r) => (
          <RecordCard
            key={r.id}
            id={r.id}
            problemType={r.type}
            problemSite={r.site}
            title={r.title}
            author={r.author}
            createdAt={r.date}
            draft={false}
          />
        ))}
      </div>
      {loading && <Loading />}
      {records?.totalPages! > 1 && (
        <Pagination totalPages={records?.totalPages!} currentPage={page} />
      )}
    </div>
  );
};

export default MyRecordPage;
