import React, { useState } from "react";

interface ProblemType {
  name: string;
  count: number;
}

interface RankingListProps {
  data: ProblemType[];
}

const RankingList: React.FC<RankingListProps> = ({ data }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const sorted = [...data].sort((a, b) => b.count - a.count);
  const total = sorted.reduce((sum, item) => sum + item.count, 0);

  const visibleData = sorted.slice(0, visibleCount);

  const remaining = sorted.length - visibleCount;

  const formatPercent = (count: number) =>
    total === 0 ? "0%" : ((count / total) * 100).toFixed(1) + "%";

  return (
    <div className="w-full flex items-center flex-col">
      <ul className="divide-y divide-gray-200 border-b-gray-100 border-b w-full">
        {visibleData.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm border-gray-200 border px-2 py-1 rounded">
                {item.name}
              </span>
            </div>
            <div className="text-right text-sm tabular-nums text-gray-700 min-w-[80px]">
              <span className="mr-4">{item.count}</span>
              <span className="text-gray-500">{formatPercent(item.count)}</span>
            </div>
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <button
          onClick={() =>
            setVisibleCount((prev) => Math.min(prev + 5, sorted.length))
          }
          className="mt-2 text-sm border px-3 py-1 border-gray-200 rounded-lg shadow-xs cursor-pointer hover:bg-gray-50"
        >
          더 보기 (+{remaining})
        </button>
      )}
    </div>
  );
};

export default RankingList;
