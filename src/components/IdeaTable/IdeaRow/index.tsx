import ProblemChip from "@components/Chip";

interface Idea {
  id: number;
  content: string;
  recordId: number;
  problemTitle: string;
  categories: string[];
}

interface IdeaRowProps {
  idea: Idea;
}

const IdeaRow = ({ idea }: IdeaRowProps) => {
  return (
    <div className="grid grid-cols-11 items-center border-t border-t-gray-200 py-4 p-2 hover:bg-gray-50 text-sm">
      {/* 문제 제목 */}
      <div className="col-span-3 font-medium truncate">
        {idea.problemTitle}
      </div>

      {/* 문제 유형 → 여러 개면 Chip 여러 개 */}
      <div className="col-span-2 flex gap-1 flex-wrap">
        {idea.categories.map((cat, idx) => (
          <ProblemChip key={idx} label={cat} />
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