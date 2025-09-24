// IdeaTable.tsx
import IdeaRow from "./IdeaRow";

interface Idea {
  id: number;
  content: string;
  recordId: number;
  problemTitle: string;
  categories: string[];
}

const IdeaTable = ({ ideas }: { ideas: Idea[] }) => {
  return (
    <div className="w-full border rounded-md overflow-hidden border-gray-200">
      <div className="grid grid-cols-11 bg-gray-100 font-semibold p-2 px-4">
        <div className="col-span-3">문제 제목</div>
        <div className="col-span-2">문제 유형</div>
        <div className="col-span-6">핵심 아이디어</div>
      </div>
      {ideas.map((idea, idx) => (
        <IdeaRow key={idea.id} idea={idea} isLast={idx === ideas.length - 1} />
      ))}
    </div>
  );
};

export default IdeaTable;
