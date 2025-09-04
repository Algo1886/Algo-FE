import DefaultListBox from "@components/ListBox";
import GrassGraph from "@components/GrassGraph";

interface GrassDay {
  date: string;
  count: number;
}

interface Props {
  streakDays?: number;
  dummyData: GrassDay[];
}

const GrassSection: React.FC<Props> = ({ streakDays, dummyData }) => {
  const totalSolved = dummyData.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <div className="col-span-4">
      <DefaultListBox boxTitle="최근 1년 간의 기록">
        <GrassGraph data={dummyData} />
        <span className="mt-4 text-sm text-[#45556C] self-start">
          올해 총 <b>{totalSolved}</b>개의 문제를 기록했습니다. (
          {streakDays ?? 0}일 연속)
        </span>
      </DefaultListBox>
    </div>
  );
};

export default GrassSection;
