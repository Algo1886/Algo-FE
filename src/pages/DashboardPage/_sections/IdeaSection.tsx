import DefaultListBox from "@components/ListBox";
import PreviewCard from "@components/PreviewCard";
import RightChevron from "@assets/RightChevron.svg";
import { type RecentIdea } from "@api/dashboard";
import { useNavigate } from "react-router-dom";

interface Props {
  recentIdeas: RecentIdea[];
}

const IdeaSection: React.FC<Props> = ({ recentIdeas }) => {
  const navigate = useNavigate();

  const handleClickIdea = (idea: RecentIdea) => {
    // console.log("idea", idea);
    navigate(`/read/${idea.recordId}`);
  };
  return (
    <div className="col-span-2">
      <DefaultListBox
        boxTitle={
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-4 items-center text-xl font-semibold">
              최근 핵심 아이디어
            </div>
            <a
              href="/my-ideas"
              className="flex flex-row gap-1 items-center text-sm text-[#45556C] cursor-pointer"
            >
              전체보기
              <img src={RightChevron} alt=">" className="inline ml-1" />
            </a>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          {recentIdeas.length === 0 ? (
            <div className="text-sm text-[#45556C]">
              최근 핵심 아이디어가 없습니다.
            </div>
          ) : (
            recentIdeas.map((idea) => (
              <span
                key={idea.id}
                className="cursor-pointer"
                role="button"
                onClick={() => handleClickIdea(idea)}
              >
                <PreviewCard
                  type={idea.categories[0] || "기타"}
                  title={idea.content || idea.problemTitle}
                  date={idea.createdAt}
                />
              </span>
            ))
          )}
        </div>
      </DefaultListBox>
    </div>
  );
};

export default IdeaSection;
