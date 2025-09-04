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
    <div className="w-full mx-auto">
      <h3 className="text-lg font-semibold mb-2">유형 순위</h3>
      <ul className="divide-y divide-gray-200 border-b-gray-200 border-b">
        {visibleData.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-800">
                {item.name}
              </span>
            </div>
            <div className="text-right text-sm tabular-nums text-gray-700 min-w-[80px]">
              <span className="mr-2">{item.count}</span>
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
          className="mt-2 text-sm border px-3 py-1 rounded hover:bg-gray-50"
        >
          더 보기 (+{remaining})
        </button>
      )}
    </div>
  );
};

export default RankingList;
