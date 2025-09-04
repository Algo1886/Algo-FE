import React from "react"
import { useNavigate } from "react-router-dom"

interface RecordCardProps {
  id: number
  problemType: string
  problemSite: string
  title: string
  author: string
  createdAt: string
  draft: boolean
}

const RecordCard: React.FC<RecordCardProps> = ({ id, problemType, problemSite, title, author, createdAt, draft }) => {
  const navigate = useNavigate()

  let handleClick: () => void;

  if (draft) {
    handleClick = () => {
      navigate(`/record/edit/${id}`);
    }
  } else {
    handleClick = () => {
      navigate(`/read/${id}`);
    }
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow p-4 w-full max-w-md cursor-pointer hover:shadow-md transition"
    >
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
  )
}

export default RecordCard