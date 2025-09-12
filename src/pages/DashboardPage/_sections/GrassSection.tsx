import DefaultListBox from "@components/ListBox";
import GrassGraph from "@components/GrassGraph";
import type { StreakRecord } from "@api/dashboard";

interface Props {
  streakDays?: number;
  data: StreakRecord[];
}

const GrassSection: React.FC<Props> = ({ streakDays, data }) => {
  const totalSolved = data.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <div className="col-span-4">
      <DefaultListBox boxTitle="최근 1년 간의 기록">
        <GrassGraph data={data} />
        <span className="mt-4 text-sm text-[#45556C] self-start">
          올해 총 <b>{totalSolved}</b>개의 문제를 기록했습니다. (
          {streakDays ?? 0}일 연속)
        </span>
      </DefaultListBox>
    </div>
  );
};

export default GrassSection;
