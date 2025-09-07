import { type Dispatch, type SetStateAction } from "react"
import clsx from "clsx"

interface InputLineProps {
  label?: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder: string
}

const InputBox = ({ label, value, setValue, placeholder }: InputLineProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && < label className="">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={clsx(
            "border border-gray-200 rounded px-4 py-2 focus:outline-none bg-white placeholder-gray-400",
            "h-40 overflow-y-auto resize-none"
        )}
      />
    </div>
  )
}

export default InputBox