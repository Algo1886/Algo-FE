import ProblemChip from "@components/Chip";
import { getCategoryKoreanName } from "@utils/category";
import { useNavigate } from "react-router-dom";

interface Idea {
  id: number;
  content: string;
  recordId: number;
  problemTitle: string;
  categories: string[];
}

interface IdeaRowProps {
  idea: Idea;
  isLast: boolean;
}

const IdeaRow = ({ idea, isLast }: IdeaRowProps) => {
  const navigate = useNavigate();
  const handleClickProblem = () => {
    navigate(`/read/${idea.recordId}`);
  };
  return (
    <div
      className={`bg-white grid grid-cols-11 items-center border-t border-t-gray-200 py-4 p-2 hover:bg-gray-50 text-sm px-4 ${
        isLast && "rounded-b-xl"
      }`}
    >
      {/* 문제 제목 */}
      <div
        role="button"
        onClick={handleClickProblem}
        className="col-span-3 font-medium truncate cursor-pointer hover:decoration-1 hover:underline"
      >
        {idea.problemTitle}
      </div>

      {/* 문제 유형 → 여러 개면 Chip 여러 개 */}
      <div className="col-span-2 flex gap-1 flex-wrap ">
        {idea.categories.map((cat, idx) => (
          <ProblemChip
            key={idx}
            label={getCategoryKoreanName(cat)}
            bgColor="blue"
          />
        ))}
      </div>

      {/* 핵심 아이디어 */}
      <div className="col-span-6 line-clamp-2 max-w-full text-gray-700">
        {idea.content}
      </div>
    </div>
  );
};

export default IdeaRow;
