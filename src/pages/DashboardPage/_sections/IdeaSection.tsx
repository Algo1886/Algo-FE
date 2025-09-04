import DefaultListBox from "@components/ListBox";
import PreviewCard from "@components/PreviewCard";
import RightChevron from "@assets/RightChevron.svg";
import { type RecentIdea } from "@api/dashboard";

interface Props {
  recentIdeas: RecentIdea[];
}

const IdeaSection: React.FC<Props> = ({ recentIdeas }) => {
  return (
    <div className="col-span-2">
      <DefaultListBox
        boxTitle={
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-4 items-center text-xl font-semibold">
              최근 핵심 아이디어
            </div>
            <div className="flex flex-row gap-1 items-center text-sm text-[#45556C]">
              전체보기
              <img src={RightChevron} alt=">" className="inline ml-1" />
            </div>
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
              <PreviewCard
                key={idea.id}
                type={idea.category || "기타"}
                title={idea.content}
                date={idea.createdAt}
              />
            ))
          )}
        </div>
      </DefaultListBox>
    </div>
  );
};

export default IdeaSection;
