import DefaultListBox from "@components/ListBox";
import RankingList from "@components/RankingList";

interface Props {
  tagDistribution: Record<string, number>;
  recordCount: number;
}

const RankingSection: React.FC<Props> = ({ tagDistribution, recordCount }) => {
  const _data = Object.entries(tagDistribution).map(([name, percent]) => ({
    name,
    count: Math.round((percent / 100) * recordCount),
  }));

  return (
    <div className="col-span-4">
      <DefaultListBox boxTitle="유형 순위">
        <RankingList data={_data} />
      </DefaultListBox>
    </div>
  );
};

export default RankingSection;
