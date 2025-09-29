import { type Dispatch, type SetStateAction } from "react";
import clsx from "clsx";

interface InputLineProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  required?: boolean;
  showError?: boolean;
  additionalText?: string;
  titleLoading?: boolean;
}

const InputLine = ({
  label,
  value,
  setValue,
  placeholder,
  required = false,
  showError = false,
  additionalText,
  titleLoading = false,
}: InputLineProps) => {
  const isError = required && showError && !value.trim();

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1">
        {label}
        {required && <span className="text-blue-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={clsx(
            "w-full border rounded px-4 py-2 focus:outline-none bg-white placeholder-gray-400 pr-10", // 오른쪽 padding 추가
            isError ? "border-red-500" : "border-gray-200"
          )}
        />
        {titleLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        )}
      </div>

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