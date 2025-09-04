import DefaultListBox from "@components/ListBox";
import RadarCanvasChart from "@components/CustomChart";

interface Props {
  tagDistribution?: Record<string, number>;
}

const RadarSection: React.FC<Props> = ({ tagDistribution }) => {
  if (!tagDistribution) return null;

  return (
    <div className="col-span-4">
      <DefaultListBox boxTitle="유형 분포">
        <div className="w-[300px] h-[300px] self-center">
          <RadarCanvasChart
            labels={Object.keys(tagDistribution)}
            values={Object.values(tagDistribution)}
            maxValue={100}
            size={300}
          />
        </div>
      </DefaultListBox>
    </div>
  );
};

export default RadarSection;
