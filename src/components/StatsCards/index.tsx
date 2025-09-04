interface StatsCardsProps {
    stats: any
  }
  
  const StatsCards = ({ stats }: StatsCardsProps) => {
    const cards = [
      {
        title: "연속 기록일",
        value: stats.profile.streakDays + "일",
        tag: "최장 연속: " + stats.profile.maxStreakDays + "일",
        icon: "👤",
      },
      {
        title: "기록수",
        value: stats.records.totalCount + "개",
        tag: "이번 주: +" + stats.records.thisWeekCount + "개",
        icon: "📅",
      },
      {
        title: "성공률",
        value: stats.records.successRate + "%",
        tag: stats.records.successCount + "/" + stats.records.totalCount + " 문제 성공",
        icon: "🏅",
      },
      {
        title: "북마크",
        value: stats.bookmarks.totalCount + "개",
        tag: "이번 주: +" + stats.bookmarks.thisWeekCount + "개",
        icon: "🔖",
      },
      {
        title: "핵심 아이디어",
        value: stats.ideas.totalCount + "개",
        tag: "가장 많은 유형: " + stats.ideas.topCategory.name + "(" + stats.ideas.topCategory.ratio + "%)",
        icon: "🔖",
      },
      {
        title: "가장 많이 기록한 유형",
        value: stats.categories.mostSolvedCategory.name,
        tag: stats.categories.mostSolvedCategory.count + "문제 (" + stats.categories.mostSolvedCategory.ratio + "%)",
        icon: "💡",
      },
    ]
  
    return (
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
            <span className="text-2xl">{card.icon}</span>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">{card.title}</span>
              <span className="font-semibold text-lg">{card.value}</span>
              <span className="text-gray-400 text-sm">{card.tag}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default StatsCards