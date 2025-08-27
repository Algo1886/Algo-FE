interface ProblemChipProps {
  type: string;
}

const ProblemChip = ({ type }: ProblemChipProps) => {
  return (
    <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded text-xs text-center flex items-center font-medium">
      {type}
    </span>
  );
};

export default ProblemChip;
