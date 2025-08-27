import IdeaRow from "./IdeaRow";
import { ideaList } from "./_dummy/data";

const IdeaTable = () => {
  return (
    <div className="border rounded-md overflow-hidden border-gray-200">
      <div className="grid grid-cols-3 bg-gray-100 font-semibold p-2">
        <div>문제 제목</div>
        <div>문제 유형</div>
        <div>핵심 아이디어</div>
      </div>

      {ideaList.map((idea) => (
        <IdeaRow key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

export default IdeaTable;
