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
        <Button
          theme="white"
          onClick={() => handleAdd(setSteps, steps, { text: "" })}
        >
          <div className="flex gap-3 items-center">
            <FaPlus size={10} />
            풀이 과정 추가
          </div>
        </Button>
      </div>

      {isError && (
        <span className="text-red-500 text-sm">
          풀이 과정을 최소 1개 이상 입력해주세요
        </span>
      )}

      {steps.map((c: any, idx: any) => (
        <div
          key={idx}
          className={`border rounded-lg p-3 space-y-2 relative ${
            isError && !c.text.trim() ? "border-red-500" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between">
            <label className="font-medium text-gray-700">풀이 {idx + 1}</label>
            <div className="flex gap-2 items-center">
              {idx > 0 && (
                <button
                  className="ml-auto text-gray-500 hover:text-gray-700"
                  onClick={() => handleRemove(setSteps, steps, idx)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
          <InputBox
            value={c.text}
            setValue={(e) => {
              const newSteps = [...steps]
              newSteps[idx].text = e
              setSteps(newSteps)
            }}
            placeholder="풀이 과정을 입력하세요"
          />
        </div>
      ))}
    </div>
  )
}

export default InputStep