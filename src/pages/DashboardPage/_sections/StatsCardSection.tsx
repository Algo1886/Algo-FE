import DefaultListBox from "@components/ListBox";
import ThreeCircle from "@assets/ThreeCircle.svg";
import CalendarIcon from "@assets/CalendarIcon.svg";
import LineChartIcon from "@assets/LineChartIcon2.svg";
import StarIcon from "@assets/StarIcon.svg";
interface Props {
  data: {
    recordCount: number;
    streakDays?: number;
    successRate?: number;
    bookmarkCount: number;
  };
}

const Card = ({
  color,
  bg,
  title,
  value,
  iconSrc,
}: {
  color: string;
  bg: string;
  title: string;
  value: string;
  iconSrc: string;
}) => (
  <DefaultListBox>
    <div className="flex flex-row gap-4 items-center">
      <div className={`p-2 rounded-lg w-9 h-9`} style={{ backgroundColor: bg }}>
        <img
          src={iconSrc}
          alt="icon"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-sm text-[#45556C]">{title}</span>
        <span className="text-2xl font-bold" style={{ color }}>
          {value}
        </span>
      </div>
    </div>
  </DefaultListBox>
);

const StatsCardSection: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Card
        bg="#DBEAFE"
        color="#155DFC"
        title="알고리즘 기록 수"
        value={`${data.recordCount}개`}
        iconSrc={ThreeCircle}
      />
      <Card
        bg="#FFEDD4"
        color="#F54900"
        title="스트릭"
        value={`${data.streakDays ?? 0}일`}
        iconSrc={CalendarIcon}
      />
      <Card
        bg="#DCFCE7"
        color="#00A63E"
        title="총 성공률"
        value={`${data.successRate ?? 0}%`}
        iconSrc={LineChartIcon}
      />
      <Card
        bg="#F3E8FF"
        color="#9810FA"
        title="북마크"
        value={`${data.bookmarkCount}개`}
        iconSrc={StarIcon}
      />
    </>
  );
};

export default StatsCardSection;
