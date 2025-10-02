import { type Dispatch, type SetStateAction } from "react"
import clsx from "clsx"

interface InputLineProps {
  label?: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder: string
  wordCount?: boolean
  isStep?: boolean
}

const InputBox = ({ label, value, setValue, placeholder, wordCount, isStep }: InputLineProps) => {
  return (
    <div className="flex flex-col gap-2 relative w-full">
      {label && <label className="">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (!wordCount || e.target.value.length <= 300) {
            setValue(e.target.value)
          }
          const target = e.target
          if (isStep) {
            target.style.height = "auto"
            target.style.height = Math.max(target.scrollHeight, 70) + "px"
          }
        }}
        className={clsx(
          "border border-gray-200 rounded px-4 py-2 focus:outline-none bg-white placeholder-gray-400",
          "resize-none pr-12",
          isStep ? "h-[70px]" : "h-40"
        )}
        {...(wordCount ? { maxLength: 300 } : {})}
      />
      {wordCount &&
        <span className="absolute bottom-2 right-3 text-xs text-gray-400">
        {value.length}/{300}
      </span>
      }
    </div>
  )
}

export default InputBox