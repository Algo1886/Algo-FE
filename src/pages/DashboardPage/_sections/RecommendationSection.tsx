import DefaultListBox from "@components/ListBox";
import PreviewCard from "@components/PreviewCard";
import RightChevron from "@assets/RightChevron.svg";
import { type Recommendation } from "@api/dashboard";

interface Props {
  recommendations: Recommendation[];
}

const RecommendationSection: React.FC<Props> = ({ recommendations }) => {
  return (
    <div className="col-span-2">
      <DefaultListBox
        boxTitle={
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-4 items-center text-xl font-semibold">
              추천 복습 기록
            </div>
            <div className="flex flex-row gap-1 items-center text-sm text-[#45556C]">
              전체보기
              <img src={RightChevron} alt=">" className="inline ml-1" />
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          {recommendations.length === 0 ? (
            <div className="text-sm text-[#45556C]">
              추천 복습 기록이 없습니다.
            </div>
          ) : (
            recommendations.map((rec) => (
              <PreviewCard
                key={rec.id}
                type={rec.categories[0] || "기타"}
                title={rec.title}
                date={rec.reviewDate}
              />
            ))
          )}
        </div>
      </DefaultListBox>
    </div>
  );
};

export default RecommendationSection;
