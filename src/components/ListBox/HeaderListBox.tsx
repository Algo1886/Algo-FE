import ProblemChip from "@components/Chip";
import LinkIconSvg from "@assets/LinkIcon.svg";
import UserIcon from "@assets/UserIcon.svg";
import ClockIcon from "@assets/ClockIcon.svg";

export interface HeaderListBoxProps {
  title: string;
  category: string;
  source: string;
  link: string;
  user: string;
  time: string;
  isSuccess: boolean;
  difficulty: number;
  isBookmarked: boolean;
  onBookmarkToggle?: () => void;
  onEdit?: () => void;   // 수정 핸들러
  onDelete?: () => void; // 삭제 핸들러
}

const HeaderListBox = ({
  title,
  category,
  source,
  link,
  user,
  time,
  isSuccess,
  difficulty,
  isBookmarked,
  onBookmarkToggle,
  onEdit,
  onDelete,
}: HeaderListBoxProps) => {
  return (
    <div className="bg-white w-full rounded border-gray-200 border p-5 space-y-4">
      <div className="flex justify-between">
        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex justify-between flex-row items-center gap-2">
            <ProblemChip label={category} bgColor="blue" textColor="blue" />
            <ProblemChip label={source} />
          </div>
        </div>
        <button onClick={onBookmarkToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 mr-1"
            fill={isBookmarked ? "#FACC15" : "#374151"}
          >
            <path d="M5 3v18l7-5 7 5V3H5z" />
          </svg>
        </button>
      </div>

      <div className="w-full flex items-start">
        <a href={link} className="text-blue-500 text-base">
          <img
            src={LinkIconSvg}
            alt="Link Icon"
            className="inline w-5 h-5 mr-1"
          />
          문제 링크
        </a>
      </div>

      <div className="flex w-full items-start gap-4">
        <span>
          <img src={UserIcon} alt="User Icon" className="inline w-4 h-4 mr-1" />
          {user}
        </span>
        <span>
          <img
            src={ClockIcon}
            alt="Clock Icon"
            className="inline w-4 h-4 mr-1"
          />
          {time}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          성공 여부
          <span
            className={`px-2 py-0.5 rounded text-xs font-semibold ${
              isSuccess
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isSuccess ? "성공" : "실패"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          체감 난이도
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < difficulty ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* 오른쪽 하단 버튼 */}
      {onEdit && onDelete && (
        <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
        >
          수정하기
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50"
        >
          삭제하기
        </button>
      </div>
      )}
    </div>
  );
};

export default HeaderListBox;