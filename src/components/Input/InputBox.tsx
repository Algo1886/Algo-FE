import { type Dispatch, type SetStateAction } from "react"
import clsx from "clsx"

interface InputLineProps {
  label?: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder: string
  wordCount?: boolean
  maxLength?: number
}

const InputBox = ({ label, value, setValue, placeholder, wordCount, maxLength = 300 }: InputLineProps) => {
  return (
    <div className="flex flex-col gap-2 relative">
      {label && <label className="">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            setValue(e.target.value)
          }
        }}
        className={clsx(
          "border border-gray-200 rounded px-4 py-2 focus:outline-none bg-white placeholder-gray-400",
          "h-40 overflow-y-auto resize-none pr-12"
        )}
        maxLength={maxLength}
      />
      {wordCount &&
        <span className="absolute bottom-2 right-3 text-xs text-gray-400">
        {value.length}/{maxLength}
      </span>
      }
    </div>
  )
}

export default InputBox