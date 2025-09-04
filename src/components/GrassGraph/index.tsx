import React from "react";

interface DayData {
  date: string;
  count: number;
}

interface GrassGraphProps {
  data: DayData[];
  levels?: number[];
  colorScale?: string[];
}

const GrassGraph: React.FC<GrassGraphProps> = ({
  data,
  levels = [0, 1, 3, 5, 8],
  colorScale = ["#ebedf0", "#c6e48b", "#86de79", "#2bbe48", "#2aa743"],
}) => {
  const dateMap = new Map<string, number>();
  data.forEach((d) => dateMap.set(d.date, d.count));

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);

  // generate 53 weeks * 7 days
  const weeks: string[][] = [];

  let current = new Date(startDate);
  for (let w = 0; w < 53; w++) {
    const week: string[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  const getColor = (count: number) => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (count >= levels[i]) return colorScale[i];
    }
    return colorScale[0];
  };

  return (
    <div className="flex relative justify-between w-full">
      <div className="absolute -top-10 items-center flex flex-row gap-2 right-0">
        <span className="text-sm text-[#45556C]">적음</span>
        {colorScale.map((color, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="text-sm text-[#45556C]">많음</span>
      </div>
      {weeks.map((week, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          {week.map((day, j) => {
            const count = dateMap.get(day) ?? 0;
            return (
              <div
                key={j}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: getColor(count),
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GrassGraph;
