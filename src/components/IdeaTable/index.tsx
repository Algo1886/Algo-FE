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
    <div className="border rounded-t-md overflow-hidden border-gray-200">
      <div className="grid grid-cols-3 bg-gray-100 font-semibold p-2">
        <div>문제 제목</div>
        <div>문제 유형</div>
        <div>핵심 아이디어</div>
      </div>

      {ideas.length > 0 ? (
        ideas.map((idea) => <IdeaRow key={idea.id} idea={idea} />)
      ) : (
        <div className="p-4 text-center text-gray-500">
          아이디어가 없습니다.
        </div>
      )}
    </div>
  );
};

export default IdeaTable;
