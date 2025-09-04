import ProblemChip from "@components/Chip";

interface PreviewCardProps {
  type: string;
  title: string;
  date: string;
}

const PreviewCard = ({ type, title, date }: PreviewCardProps) => {
  return (
    <div className="flex flex-col p-4 rounded-xl bg-white border-[#E2E8F0] border items-start gap-2">
      <span className="w-fit">
        <ProblemChip type={type} />
      </span>
      <span className="font-medium text-base text-[#0F172B]">{title}</span>
      <span className="text-[#45556C] text-sm">{date}</span>
    </div>
  );
};

export default PreviewCard;
