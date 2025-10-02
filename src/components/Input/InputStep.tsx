import Button from "@components/Button"
import { FaTrash, FaPlus } from "react-icons/fa"
import InputBox from "./InputBox"

interface InputStepProps {
  handleAdd: any
  steps: any
  setSteps: any
  handleRemove: any
  required?: boolean
  showError?: boolean
}

const InputStep = ({
  handleAdd,
  steps,
  setSteps,
  handleRemove,
  required = false,
  showError = false,
}: InputStepProps) => {
  const isError =
    required &&
    showError &&
    (steps.length === 0 || steps.some((s: any) => !s.text.trim()))

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="font-medium text-gray-700">
          풀이 과정 {required && <span className="text-blue-500">*</span>}
        </label>
      </div>
      {isError && (
        <span className="text-red-500 text-sm">
          풀이 과정을 최소 1개 이상 입력해주세요
        </span>
      )}
      {steps.map((c: any, idx: any) => (
        <div
          key={idx}
          className={`rounded-lg p-3 space-y-2 relative ${
            isError && !c.text.trim() ? "border border-red-500" : ""
          }`}
        >
          <div className="flex flex-row gap-2">
          <span className="inline-flex flex-none h-7 w-7 items-center justify-center rounded-full bg-black text-white text-sm">
            {idx + 1}
          </span>
          <InputBox
            value={c.text}
            setValue={(e) => {
              const newSteps = [...steps]
              newSteps[idx].text = e
              setSteps(newSteps)
            }}
            placeholder="풀이 과정을 입력하세요"
            isStep={true}
          />
          <div className="ml-auto w-6 flex justify-center">
            {idx > 0 ? (
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleRemove(setSteps, steps, idx)}
              >
                <FaTrash />
              </button>
            ) : (
              <span className="opacity-0"><FaTrash /></span>
            )}
          </div>
          </div>
          
        </div>

      ))}
      {steps.length < 10 && (
        <div className="self-center">
          <Button
            theme="white"
            className="w-auto"
            onClick={() => handleAdd(setSteps, steps, { text: "" })}
          >
            <div className="flex gap-3 items-center">
              <FaPlus size={10} />
              풀이 과정 추가
            </div>
          </Button>
        </div>
      )}
    </div>
  )
}

export default InputStep