import Button from "@components/Button";
import CodeEditor from "@components/CodeEditor";
import Dropdown from "@components/Dropdown";
import ChipButton from "@components/Button/ChipButton";
import { FaTrash, FaPlus } from "react-icons/fa"

interface InputCodeProps {
    handleAdd: any
    codes: any
    setCodes: any
    handleRemove: any
}

const InputCode = ({ handleAdd, codes, setCodes, handleRemove }: InputCodeProps) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
            <label className="font-medium text-gray-700">풀이 코드</label>
            <Button theme="white" onClick={() => handleAdd(setCodes, codes, { code: "", language: "python", verdict: "success" })}>
              <div className="flex gap-3 items-center">
              <FaPlus size={10}/>
                풀이 코드 추가
              </div>
            </Button>
            </div>
            {codes.map((c: any, idx: any) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-3 space-y-2 relative">
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                <label className="font-medium text-gray-700">코드 {idx+1}</label>
                <ChipButton
                selected={c.verdict === "success"}
                onClick={() => {
                    const newCodes = [...codes]
                    newCodes[idx].verdict = "success"
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
                options={["python", "javascript", "java"]}
                selected={c.language}
                onChange={e => {
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

export default InputCode;