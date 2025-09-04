import { useDashboardData } from "@hooks/useDashboardData";
import StatsCardSection from "./_sections/StatsCardSection";
import RecommendationSection from "./_sections/RecommendationSection";
import IdeaSection from "./_sections/IdeaSection";
import GrassSection from "./_sections/GrassSection";
import RadarSection from "./_sections/RadarSection";
import RankingSection from "./_sections/RankingSection";

const dummyData = Array.from({ length: 365 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (364 - i));
  const count = Math.random() < 0.7 ? Math.floor(Math.random() * 10) : 0;
  return {
    date: date.toISOString().split("T")[0],
    count,
  };
});

const dummyProblemTypeData = [
  { name: "그리디", count: 25 },
  { name: "DFS", count: 25 },
  { name: "배열", count: 22 },
  { name: "스택/큐", count: 18 },
  { name: "백트래킹", count: 19 },
  { name: "정렬", count: 15 },
  { name: "BFS", count: 14 },
  { name: "DP", count: 12 },
  { name: "문자열", count: 9 },
  { name: "비트마스크", count: 4 },
];

function DashboardPage() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <div>로딩 중...</div>;
  if (error || !data) return <div>에러 발생: {error}</div>;

  return (
    <div className="w-full items-center flex flex-col p-4 bg-[#F8FAFC]">
      <div className="grid grid-cols-4 gap-4 w-full">
        <StatsCardSection data={data} />
        <RecommendationSection recommendations={data.recommendations} />
        <IdeaSection recentIdeas={data.recentIdeas} />
        <GrassSection streakDays={data.streakDays} dummyData={dummyData} />
        <RadarSection tagDistribution={data.tagDistributionPercent} />
        <RankingSection
          tagDistribution={data.tagDistributionPercent}
          recordCount={data.recordCount}
          dummyData={dummyProblemTypeData}
        />
      </div>
    </div>
  );
}
