import DefaultListBox from "@components/ListBox";
import RankingList from "@components/RankingList";

interface Props {
  tagDistribution?: Record<string, number>;
  recordCount: number;
  dummyData: { name: string; count: number }[];
}

const RankingSection: React.FC<Props> = ({
  tagDistribution,
  recordCount,
  dummyData,
}) => {
  const data = tagDistribution
    ? Object.entries(tagDistribution).map(([name, percent]) => ({
        name,
        count: Math.round((percent / 100) * recordCount),
      }))
    : dummyData;

  return (
    <div className="col-span-4">
      <DefaultListBox boxTitle="유형 순위">
        <RankingList data={data} />
      </DefaultListBox>
    </div>
  );
};

export default RankingSection;
