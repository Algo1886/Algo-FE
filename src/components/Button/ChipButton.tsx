import { FaCheck, FaTimes } from "react-icons/fa"

interface ChipButtonProps {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}

const ChipButton = ({ selected, onClick, children }: ChipButtonProps) => {
  const isSuccess = children === "성공"

  return (
    <button
      className={`flex items-center gap-2 px-4 py-1 rounded text-sm ${
        selected
          ? isSuccess
            ? "bg-green-100 text-green-400 border border-green-300"
            : "bg-red-100 text-red-400 border border-red-300"
          : "text-gray-400 bg-gray-100"
      }`}
      onClick={onClick}
    >
      {isSuccess ? (
    <FaCheck size={10} />
    ) : (
    <FaTimes size={10}/>
    )}
      {children}
    </button>
  )
}

export default ChipButton