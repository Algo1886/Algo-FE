import ProblemChip from "@components/Chip";
import LinkIconSvg from "@assets/LinkIcon.svg";
import UserIcon from "@assets/UserIcon.svg";
import ClockIcon from "@assets/ClockIcon.svg";
import { formatDate } from "./_formatDate";
import Button from "@components/Button";
import SuccessIcon from "@assets/SuccessIcon.svg";
import FailIcon from "@assets/FailIcon.svg";
import BookmarkIconComponent from "@assets/BookmarkIconComponent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { postReviewComplete } from "@api/records";
import { useAmplitude } from "react-amplitude-provider";
import { MEANINGFUL_EVENT_NAMES, trackMeaningfulEvent } from "@utils/analytics";
import { useCategories } from "@hooks/useCategories";

interface Category {
  id: number;
  name: string;
}
export interface HeaderListBoxProps {
  id: string;
  title: string;
  category: Category[];
  source: string;
  link: string;
  user: string;
  time: string;
  updateTime?: string;
  isSuccess: boolean;
  difficulty: number;
  isBookmarked: boolean;
  onBookmarkToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isReviewing?: boolean;
}

const HeaderListBox = ({
  id,
  title,
  category,
  source,
  link,
  user,
  time,
  updateTime,
  isSuccess,
  difficulty,
  isBookmarked,
  onBookmarkToggle,
  onEdit,
  onDelete,
  isReviewing,
}: HeaderListBoxProps) => {
  const { getCategoryLabel } = useCategories();
  const categoryLabel = getCategoryLabel(category[0].id);
  const navigate = useNavigate();
  const { user: myProfile } = useAuth();
  const amplitude = useAmplitude();
  const isEditable = myProfile?.username === user;

  const handleClickReviewComplete = async () => {
    await postReviewComplete(id).then(() => {
      trackMeaningfulEvent(amplitude, MEANINGFUL_EVENT_NAMES.Review_Submitted, {
        recordId: id,
      });
      navigate("/my-recommend", {
        replace: true,
      });
    });
  };

  const handleClickAuthor = (author: string) => {
    navigate(
      `/search-result?filter=${encodeURIComponent(
        "작성자"
      )}&keyword=${encodeURIComponent(author)}`
    );
  };

  const handleClickCategoryChip = (category: string) => {
    navigate(
      `/search-result?filter=${encodeURIComponent(
        "유형"
      )}&keyword=${encodeURIComponent(category)}`
    );
  };

  return (
    <div className="bg-white w-full rounded-lg p-5 border border-gray-200">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex justify-between flex-row items-center gap-2">
            <button
              className="cursor-pointer"
              onClick={() => handleClickCategoryChip(categoryLabel)}
            >
              <ProblemChip
                label={categoryLabel}
                bgColor="blue"
                textColor="blue"
              />
            </button>
            <ProblemChip label={source} />
          </div>
        </div>
        <button onClick={onBookmarkToggle} className="cursor-pointer">
          <BookmarkIconComponent
            width={18}
            height={22}
            fill={isBookmarked ? "#FACC15" : "none"}
          />
        </button>
      </div>
      <div className="w-full flex items-center mt-2">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 text-base flex items-center gap-1.5"
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
        <button
          className="cursor-pointer flex gap-1"
          onClick={() => handleClickAuthor(user)}
        >
          <img src={UserIcon} alt="User Icon" className="inline w-5 h-5 mr-1" />
          {user}
        </button>
        <span className="flex gap-1">
          <img
            src={ClockIcon}
            alt="Clock Icon"
            className="inline w-5 h-5 mr-1"
          />
          {formatDate(time)}{" "}
          {updateTime && `수정 후: ${formatDate(updateTime)}`}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 mt-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-row gap-8">
            <div className="flex items-center gap-4">
              성공 여부
              <span
                className={`inline-flex items-center px-2.5 py-1 gap-1 rounded text-xs font-semibold border ${
                  isSuccess
                    ? "bg-green-100 text-green-800 border-green-300"
                    : "bg-red-100 text-red-700 border-red-300"
                }`}
              >
                <img
                  src={isSuccess ? SuccessIcon : FailIcon}
                  alt=""
                  className={`w-2.5 h-2.5 mr-1 inline `}
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
          {isEditable && onEdit && onDelete && (
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
                className="px-3 py-1 text-sm border border-gray-300"
              >
                삭제하기
              </Button>
            </div>
          )}
        </div>
      </div>
      {isReviewing && (
        <div
          role="button"
          onClick={handleClickReviewComplete}
          className="w-full mt-4 py-4 text-base rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] text-center cursor-pointer hover:bg-gray-100"
        >
          복습 완료
        </div>
      )}
    </div>
  );
};

export default HeaderListBox;
