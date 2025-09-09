const BG_COLOR_MAP = {
  gray: "bg-gray-200",
  blue: "bg-blue-200",
} as const

const TEXT_COLOR_MAP = {
  black: "text-black",
  blue: "text-blue-800",
} as const

interface ProblemChipProps {
  label: string
  bgColor?: keyof typeof BG_COLOR_MAP
  textColor?: keyof typeof TEXT_COLOR_MAP
}

const ProblemChip = ({ label, bgColor = "gray", textColor = "black" }: ProblemChipProps) => {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full text-center flex items-center font-medium
        ${BG_COLOR_MAP[bgColor]} ${TEXT_COLOR_MAP[textColor]}`}
    >
      {label}
    </span>
  )
}

export default ProblemChip