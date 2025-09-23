import { useEffect, useState } from "react";
import RecordCard from "@components/RecordCard";
import { fetchUserRecommend } from "@api/user";
import type { Record } from "types/record";
import BookChart from "@assets/BookChartIcon.svg";

const MyRecommendPage = () => {
  const [records, setRecords] = useState<Record[]>();

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const res = await fetchUserRecommend();
        const recordsArray = res.data;
        const mapped: Record[] = recordsArray.map((r: any) => ({
          id: r.id,
          type: r.categories[0],
          site: r.source,
          title: r.title,
          author: r.author,
          date: r.createdAt.slice(0, 10),
        }));
        setRecords(mapped);
      } catch (err) {
        console.error(err);
      }
    };
    loadRecords();
  }, []);

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5">
      {records?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="w-50 h-50 rounded-full bg-[#E5E5E5] flex items-center justify-center">
            <img src={BookChart} className="w-24 h-24" />
          </div>
          <p className="text-gray-600">
            모든 추천 기록을
            <br />
            복습하셨어요!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
          {records?.map((r) => (
            <RecordCard
              key={r.id}
              id={r.id}
              problemType={r.type}
              problemSite={r.site}
              title={r.title}
              author={r.author}
              createdAt={r.date}
              draft={false}
              isReviewing={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecommendPage;
