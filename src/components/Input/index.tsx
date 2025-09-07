import { type Dispatch, type SetStateAction } from "react"
import clsx from "clsx"

interface InputLineProps {
  label: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder: string
}

const InputLine = ({ label, value, setValue, placeholder }: InputLineProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={clsx(
          "border border-gray-200 rounded px-4 py-2 focus:outline-none bg-white placeholder-gray-400"
        )}
      />
    </div>
  )
}

export default InputLine