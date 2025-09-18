import DefaultListBox from "@components/ListBox";
import RadarCanvasChart from "@components/CustomChart";

interface Props {
  categories?: Category[];
}

interface Category {
  slug: string;
  name: string;
  count: number;
  ratio: number;
}

const prepareRadarData = (categories: Category[] = []) => {
  const sorted = [...categories].sort((a, b) => b.count - a.count);
  const top = sorted.slice(0, 6);
  const labels = top.map((c) => c.name || c.slug);
  const values = top.map((c) => Number(c.ratio || 0));
  while (labels.length < 6) {
    labels.push("");
    values.push(0);
  }
  const rawMax = Math.max(...values, 1);
  const maxValue = Math.ceil(rawMax / 10) * 10;
  return { labels, values, maxValue };
};

const RadarSection: React.FC<Props> = ({ categories }) => {
  const isEmpty = !categories || categories.length < 3;
  const { labels, values, maxValue } = prepareRadarData(categories);

  return (
    <div className="col-span-4">
      <DefaultListBox boxTitle="유형 분포">
        {isEmpty ? (
          <div className="w-full h-[300px] flex items-center justify-center text-gray-400 text-sm">
            아직 충분한 데이터가 없습니다.
          </div>
        ) : (
          <div className="w-[300px] h-[300px] self-center">
            <RadarCanvasChart
              labels={labels}
              values={values}
              maxValue={maxValue}
              size={300}
            />
          </div>
        )}
      </DefaultListBox>
    </div>
  );
};

export default RadarSection;
