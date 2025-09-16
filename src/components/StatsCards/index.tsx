interface StatsCardsProps {
  stats: any;
}

interface CardProps {
  title: string;
  value: string;
  tag?: string;
  iconBg?: string;
  iconEmoji?: string;
}

const Card = ({ title, value, tag, iconBg, iconEmoji }: CardProps) => {
  return (
    <div className="flex flex-col items-start justify-center gap-3 p-4 bg-white rounded-xl shadow border border-gray-100 aspect-[300/130]">
      <div className="gap-3 flex flex-row items-center">
        <div
          className={`w-9 h-9 rounded-md flex items-center justify-center text-lg ${
            iconBg || "bg-gray-100"
          }`}
        >
          <span>{iconEmoji || "📌"}</span>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-[#0F172B] text-base font-semibold">
            {title}
          </span>
          <span className="font-semibold text-lg">{value}</span>
        </div>
      </div>
      {tag && <span className="text-gray-400 text-xs">{tag}</span>}
    </div>
  );
};

const StatsCards = ({ stats }: StatsCardsProps) => {
  console.log(stats);
  const streakDays = stats?.profile?.streakDays || 0;
  const maxStreakDays = stats?.profile?.maxStreakDays || 0;

  const totalCount = stats?.records?.totalCount || 0;
  const thisWeekCount = stats?.records?.thisWeekCount || 0;
  const successCount = stats?.records?.successCount || 0;
  const successRate =
    totalCount > 0 ? Math.round((successCount / totalCount) * 1000) / 10 : 0;

  const bookmarkCount = stats?.bookmarks?.totalCount || 0;
  const bookmarkDelta = stats?.bookmarks?.thisWeekCount || 0;

  const ideaCount = stats?.ideas?.totalCount || 0;
  const topIdeaType = stats?.ideas?.topType || "";

  const topCategory = stats?.records?.topCategory?.name || "";
  const topCategoryCount = stats?.records?.topCategory?.count || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title="연속 기록일"
        value={`${streakDays}일`}
        tag={`최장 연속: ${maxStreakDays}일`}
        iconBg="bg-orange-100"
        iconEmoji="🗓️"
      />
      <Card
        title="기록 수"
        value={`${totalCount}개`}
        tag={`이번 주: +${thisWeekCount}개`}
        iconBg="bg-blue-100"
        iconEmoji="🧾"
      />
      <Card
        title="성공률"
        value={`${successRate}%`}
        tag={`${successCount}/${totalCount} 문제 성공`}
        iconBg="bg-green-100"
        iconEmoji="📈"
      />
      <Card
        title="북마크"
        value={`${bookmarkCount}개`}
        tag={`이번 주: +${bookmarkDelta}개`}
        iconBg="bg-purple-100"
        iconEmoji="⭐"
      />
      <Card
        title="핵심 아이디어"
        value={`${ideaCount}개`}
        tag={topIdeaType ? `가장 많은 유형: ${topIdeaType}` : undefined}
        iconBg="bg-indigo-100"
        iconEmoji="🏅"
      />
      <Card
        title="가장 많이 기록한 유형"
        value={topCategory || "-"}
        tag={`${topCategoryCount}문제`}
        iconBg="bg-yellow-100"
        iconEmoji="🍪"
      />
    </div>
  );
};

export default StatsCards;
