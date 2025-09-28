import { type Dispatch, type SetStateAction } from "react";
import clsx from "clsx";

interface InputLineProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  required?: boolean;
  showError?: boolean; // 기록하기 눌렀을 때 에러 표시용
  additionalText?: string;
}

const InputLine = ({
  label,
  value,
  setValue,
  placeholder,
  required = false,
  showError = false,
  additionalText,
}: InputLineProps) => {
  const isError = required && showError && !value.trim();

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1">
        {label}
        {required && <span className="text-blue-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={clsx(
          "border rounded px-4 py-2 focus:outline-none bg-white placeholder-gray-400",
          isError ? "border-red-500" : "border-gray-200"
        )}
      />
      {additionalText && (
        <span className="text-[#62748E] text-sm">{additionalText}</span>
      )}
      {isError && (
        <span className="text-red-500 text-sm">필수 입력 항목입니다</span>
      )}
    </div>
  );
};

export default InputLine;
