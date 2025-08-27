import ProblemChip from "@components/Chip";
import LinkIconSvg from "@assets/LinkIcon.svg";
import UserIcon from "@assets/UserIcon.svg";
import ClockIcon from "@assets/ClockIcon.svg";

export interface HeaderListBoxProps {
  title: string;
  tags: string[];
  link: string;
  user: string;
  time: string;
  isSuccess: boolean;
  difficulty: number;
  isBookmarked: boolean;
  onBookmarkToggle?: () => void;
}

const HeaderListBox = ({
  title,
  tags,
  link,
  user,
  time,
  isSuccess,
  difficulty,
  isBookmarked,
  onBookmarkToggle,
}: HeaderListBoxProps) => {
  return (
    <div className="bg-white max-w-[1080px] w-full rounded-xl border-gray-300 border p-5 space-y-4">
      <div className="flex justify-between">
        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <div className="flex gap-2 mt-1">
            {tags.map((tag, index) => (
              <ProblemChip key={index} type={tag} />
            ))}
          </div>
        </div>
        <button onClick={onBookmarkToggle}>
          {isBookmarked ? (
            <i className="fa-solid fa-bookmark text-gray-800" />
          ) : (
            <i className="fa-regular fa-bookmark text-gray-400" />
          )}
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
      <div className="flex w-full items-start gap-2">
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
        <div className="flex items-center gap-4">
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
          체감 난이도:
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
    </div>
  );
};

export default HeaderListBox;
