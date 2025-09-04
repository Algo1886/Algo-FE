import DefaultListBox from "@components/ListBox";
import RadarCanvasChart from "@components/CustomChart";

interface Props {
  tagDistribution?: Record<string, number>;
}

const RadarSection: React.FC<Props> = ({ tagDistribution }) => {
  const isEmpty = !tagDistribution || Object.keys(tagDistribution).length === 0;

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
              labels={Object.keys(tagDistribution)}
              values={Object.values(tagDistribution)}
              maxValue={100}
              size={300}
            />
          </div>
        )}
      </DefaultListBox>
    </div>
  );
};

export default RadarSection;
