import React from "react";

interface RecordCardProps {
  problemType: string; // 예: "구현", "그리디"
  problemSite: string; // 예: "백준", "프로그래머스"
  title: string;
  author: string;
  createdAt: string; // 예: "2025-08-27"
}

const RecordCard: React.FC<RecordCardProps> = ({ problemType, problemSite, title, author, createdAt }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-md">
      {/* 상단 Chip */}
      <div className="flex gap-2 mb-2">
        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">{problemType}</span>
        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{problemSite}</span>
      </div>

      {/* 문제 제목 */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* 구분선 */}
      <hr className="border-t border-gray-200 my-2" />

      {/* 작성자 & 작성일 */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>{author}</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
};

export default RecordCard;