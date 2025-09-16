import ProblemChip from "@components/Chip";
import LinkIconSvg from "@assets/LinkIcon.svg";
import UserIcon from "@assets/UserIcon.svg";
import ClockIcon from "@assets/ClockIcon.svg";
import { formatDate } from "./_formatDate";
import { problemTypes } from "@constants/problemTypes";
import Button from "@components/Button";
import SuccessIcon from "@assets/SuccessIcon.svg";
import FailIcon from "@assets/FailIcon.svg";
import BookmarkIconComponent from "@assets/BookmarkIconComponent";

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
  onEdit?: () => void;
  onDelete?: () => void;
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
  const categoryLabel =
    problemTypes.find((pt) => pt.value === category)?.label || category;

  return (
    <div className="bg-white w-full rounded-lg p-5 shadow-sm border border-gray-100">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex justify-between flex-row items-center gap-2">
            <ProblemChip
              label={categoryLabel}
              bgColor="blue"
              textColor="blue"
            />
            <ProblemChip label={source} />
          </div>
        </div>
        <button onClick={onBookmarkToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 mr-1 cursor-pointer"
            fill={isBookmarked ? "#FACC15" : "#374151"}
          />
          {/* <img
            src={BookmarkIcon}
            alt="bookmark"
            className={`w-4 h-4 ${isBookmarked ? "opacity-100" : "opacity-60"}`}
          /> */}
          <BookmarkIconComponent
            width={18}
            height={22}
            fill={isBookmarked ? "#FACC15" : "none"}
          />
        </button>
      </div>
      <div className="w-full flex items-start mt-2">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 text-base"
        >
          <img
            src={LinkIconSvg}
            alt="Link Icon"
            className="inline w-5 h-5 mr-1"
          />
          문제 링크
        </a>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
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
          {formatDate(time)}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 mt-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-row gap-8">
            <div className="flex items-center gap-4">
              성공 여부
              <span
                className={`inline-flex items-center px-2 py-1 gap-1 rounded text-xs font-semibold ${
                  isSuccess
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <img
                  src={isSuccess ? SuccessIcon : FailIcon}
                  alt=""
                  className="w-2.5 h-2.5 mr-1 inline"
                />
                {isSuccess ? "성공" : "실패"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              체감 난이도:
              <span className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < difficulty ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              onClick={onEdit}
              theme="light"
              className="px-3 py-1 text-sm border border-gray-300"
            >
              수정하기
            </Button>
            <Button
              onClick={onDelete}
              theme="light"
              className="px-3 py-1 text-sm border border-red-300 text-red-600 hover:bg-red-50"
            >
              삭제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderListBox;
