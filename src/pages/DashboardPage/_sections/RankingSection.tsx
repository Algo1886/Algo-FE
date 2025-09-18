import DefaultListBox from "@components/ListBox";
import RankingList from "@components/RankingList";

export interface CategoryDistributionItem {
  slug: string;
  name: string;
  count: number;
  ratio: number;
}

interface Props {
  categories: CategoryDistributionItem[];
  recordCount: number;
}

const RankingSection: React.FC<Props> = ({ categories, recordCount }) => {
  const sorted = [...categories].sort((a, b) => b.count - a.count);
  const _data = sorted.map((c) => ({
    name: c.name || c.slug,
    count: c.count,
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
