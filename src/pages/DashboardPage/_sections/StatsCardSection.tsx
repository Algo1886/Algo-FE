import DefaultListBox from "@components/ListBox";

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
}: {
  color: string;
  bg: string;
  title: string;
  value: string;
}) => (
  <DefaultListBox>
    <div className="flex flex-row gap-4 items-center">
      <div className={`p-2 rounded-lg w-9 h-9`} style={{ backgroundColor: bg }}>
        <div className="w-full h-full rounded-full" />
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
      />
      <Card
        bg="#FFEDD4"
        color="#F54900"
        title="스트릭"
        value={`${data.streakDays ?? 0}일`}
      />
      <Card
        bg="#DCFCE7"
        color="#00A63E"
        title="총 성공률"
        value={`${data.successRate ?? 0}%`}
      />
      <Card
        bg="#F3E8FF"
        color="#9810FA"
        title="북마크"
        value={`${data.bookmarkCount}개`}
      />
    </>
  );
};

export default StatsCardSection;
