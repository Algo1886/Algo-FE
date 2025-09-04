import { useDashboardData } from "@hooks/useDashboardData";
import StatsCardSection from "./_sections/StatsCardSection";
import RecommendationSection from "./_sections/RecommendationSection";
import IdeaSection from "./_sections/IdeaSection";
import GrassSection from "./_sections/GrassSection";
import RadarSection from "./_sections/RadarSection";
import RankingSection from "./_sections/RankingSection";

const DashboardPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <div>로딩 중...</div>;
  if (error || !data) return <div>에러 발생: {error}</div>;

  return (
    <div className="w-full items-center flex flex-col p-4 bg-[#F8FAFC]">
      <div className="grid grid-cols-4 gap-4 w-full">
        <StatsCardSection data={data} />
        <RecommendationSection recommendations={data.recommendations} />
        <IdeaSection recentIdeas={data.recentIdeas} />
        <GrassSection streakDays={data.streakDays} data={data.records} />
        <RadarSection tagDistribution={data.tagDistributionPercent} />
        <RankingSection
          tagDistribution={data.tagDistributionPercent}
          recordCount={data.recordCount}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
