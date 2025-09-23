import { useEffect, useState } from "react";
import RecordCard from "@components/RecordCard";
import Pagination from "@components/Pagination";
import { fetchUserDrafts } from "@api/user";
import FolrderIcon from "@assets/FolderIcon.svg";
import type { Record, RecordResponse } from "types/record";

const MyDraftsPage = () => {
  const [records, setRecords] = useState<RecordResponse>();

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const res = await fetchUserDrafts();
        const r = res.data.records;
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
    loadRecords();
  }, []);

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5">
      {records?.records?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="w-50 h-50 flex rounded-full items-center justify-center bg-[#E5E5E5]">
            <img src={FolrderIcon} className="w-24 h-24" />
          </div>
          <p className="text-xl font-semibold">아직 기록이 없어요</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
            {records?.records.map((r) => (
              <RecordCard
                key={r.id}
                id={r.id}
                problemType={r.type}
                problemSite={r.site}
                title={r.title}
                author={r.author}
                createdAt={r.date}
                draft={true}
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

export default MyDraftsPage;
