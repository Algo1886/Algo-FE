import ProblemChip from "@components/Chip";

export interface IIdea {
  id: string;
  title: string;
  type: string;
  keyIdea: string;
}

interface IdeaRowProps {
  idea: IIdea;
}

const IdeaRow = ({ idea }: IdeaRowProps) => {
  return (
    <div className="grid grid-cols-11 items-center border-t border-t-gray-200 py-4 p-2 hover:bg-gray-50 text-sm">
      <div className="col-span-3">최적의 알고리즘 구하기</div>
      <div className="col-span-2">
        <ProblemChip type={idea.type} />
      </div>
      <div className="col-span-6 line-clamp-2 max-w-full">
        DFS에서는 어떻게 지켜야 한다. BFS랑 이런 점에서 다르다 왜 다른건지 잘
        적어야겠지...
      </div>
    </div>
  );
};

export default IdeaRow;
