import Button from "@components/Button"
import CodeEditor from "@components/CodeEditor"
import Dropdown from "@components/Dropdown"
import ChipButton from "@components/Button/ChipButton"
import { FaTrash, FaPlus } from "react-icons/fa"
import { languageTypes } from "@constants/languageTypes"

interface InputCodeProps {
  handleAdd: any
  codes: any
  setCodes: any
  handleRemove: any
  required?: boolean
  showError?: boolean
}

const InputCode = ({
  handleAdd,
  codes,
  setCodes,
  handleRemove,
  required = false,
  showError = false,
}: InputCodeProps) => {
  const isError =
    required &&
    showError &&
    (codes.length === 0 || codes.some((c: any) => !c.code.trim()))

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="font-medium text-gray-700">
          풀이 코드 {required && <span className="text-blue-500">*</span>}
        </label>
        <Button
          theme="white"
          onClick={() =>
            handleAdd(setCodes, codes, {
              code: "",
              language: "python",
              verdict: "pass",
            })
          }
        >
          <div className="flex gap-3 items-center">
            <FaPlus size={10} />
            풀이 코드 추가
          </div>
        </Button>
      </div>

      {isError && (
        <span className="text-red-500 text-sm">
          풀이 코드를 최소 1개 이상 입력해주세요
        </span>
      )}

      {codes.map((c: any, idx: any) => (
        <div
          key={idx}
          className={`border rounded-lg p-3 space-y-2 relative ${
            isError && !c.code.trim() ? "border-red-500" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <label className="font-medium text-gray-700">
                코드 {idx + 1}
              </label>
              <ChipButton
                selected={c.verdict === "pass"}
                onClick={() => {
                  const newCodes = [...codes]
                  newCodes[idx].verdict = "pass"
                  setCodes(newCodes)
                }}
              >
                성공
              </ChipButton>
              <ChipButton
                selected={c.verdict === "fail"}
                onClick={() => {
                  const newCodes = [...codes]
                  newCodes[idx].verdict = "fail"
                  setCodes(newCodes)
                }}
              >
                실패
              </ChipButton>
            </div>
            <div className="flex gap-2 items-center">
              <Dropdown
                options={languageTypes.map((lang) => lang.label)}
                selected={c.language}
                onChange={(e) => {
                  const newCodes = [...codes]
                  newCodes[idx].language = e
                  setCodes(newCodes)
                }}
              />
              {idx > 0 && (
                <button
                  className="ml-auto text-gray-500 hover:text-gray-700"
                  onClick={() => handleRemove(setCodes, codes, idx)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
          <CodeEditor
            value={c.code}
            language={c.language}
            onChange={(newCode) => {
              const newCodes = [...codes]
              newCodes[idx].code = newCode
              setCodes(newCodes)
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default InputCode