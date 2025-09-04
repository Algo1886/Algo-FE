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
  console.log(ideas)
  return (
    <div className="border rounded-md overflow-hidden border-gray-200">
      <div className="grid grid-cols-3 bg-gray-100 font-semibold p-2">
        <div>문제 제목</div>
        <div>문제 유형</div>
        <div>핵심 아이디어</div>
      </div>

      {ideas.map((idea) => (
        <IdeaRow key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

export default IdeaTable;