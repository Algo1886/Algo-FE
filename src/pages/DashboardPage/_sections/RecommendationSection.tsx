import DefaultListBox from "@components/ListBox";
import PreviewCard from "@components/PreviewCard";
import RightChevron from "@assets/RightChevron.svg";
import { type Recommendation } from "@api/dashboard";
import { useNavigate } from "react-router-dom";
import { getCategoryKoreanName } from "@utils/category";

interface Props {
  recommendations: Recommendation[];
}

const RecommendationSection: React.FC<Props> = ({ recommendations }) => {
  const navigate = useNavigate();
  const handleClickRec = (rec: Recommendation) => {
    console.log("추천 복습 기록 클릭:", rec);
    navigate(`/read/${rec.id}?isReviewing=true`);
  };
  return (
    <div className="col-span-2">
      <DefaultListBox
        boxTitle={
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-4 items-center text-xl font-semibold">
              추천 복습 기록
            </div>
            <a
              href="/my-recommend"
              className="flex flex-row gap-1 items-center text-sm text-[#45556C] cursor-pointer"
            >
              전체보기
              <img src={RightChevron} alt=">" className="inline ml-1" />
            </a>
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
              <span
                role="button"
                key={rec.id}
                className="cursor-pointer"
                onClick={() => handleClickRec(rec)}
              >
                <PreviewCard
                  type={getCategoryKoreanName(rec.categories[0]) || "기타"}
                  title={rec.title}
                  date={rec.createdAt.replaceAll(".", "/")}
                />
              </span>
            ))
          )}
        </div>
      </DefaultListBox>
    </div>
  );
};

export default RecommendationSection;
