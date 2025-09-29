import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import InputLine from "@components/Input";
import InputBox from "@components/Input/InputBox";
import InputCode from "@components/Input/InputCode";
import InputStep from "@components/Input/InputStep";
import Dropdown from "@components/Dropdown";
import CategoryAutocomplete from "@components/Dropdown/CategoryAutocomplete";
import DifficultySelector from "@components/DifficultySelector";
import { fetchCategories } from "@api/records";

interface RecordFormProps {
  problemUrl: string;
  setProblemUrl: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  categories: number;
  setCategories: Dispatch<SetStateAction<number>>;
  status: "success" | "fail";
  setStatus: Dispatch<SetStateAction<"success" | "fail">>;
  difficulty: number;
  setDifficulty: Dispatch<SetStateAction<number>>;
  detail: string;
  setDetail: Dispatch<SetStateAction<string>>;
  codes: { code: string; language: string; verdict: string }[];
  setCodes: Dispatch<
    SetStateAction<{ code: string; language: string; verdict: string }[]>
  >;
  steps: { text: string }[];
  setSteps: Dispatch<SetStateAction<{ text: string }[]>>;
  ideas: string;
  setIdeas: Dispatch<SetStateAction<string>>;
  links: string;
  setLinks: Dispatch<SetStateAction<string>>;
  handleAdd: (setter: any, arr: any[], newItem: any) => void;
  handleRemove: (setter: any, arr: any[], idx: number) => void;
  isSubmitAttempted: boolean;
  buttons: React.ReactNode;
}

export default function RecordForm({
  problemUrl,
  setProblemUrl,
  title,
  setTitle,
  categories,
  setCategories,
  status,
  setStatus,
  difficulty,
  setDifficulty,
  detail,
  setDetail,
  codes,
  setCodes,
  steps,
  setSteps,
  ideas,
  setIdeas,
  links,
  setLinks,
  handleAdd,
  handleRemove,
  isSubmitAttempted,
  buttons,
}: RecordFormProps) {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    fetchCategories().then(res => {
      setTypes(res.data)
    })
  }, [])
  return (
    <div className="max-w-[900px] mx-auto p-6 space-y-10">
      <InputLine
        label="문제 URL"
        value={problemUrl}
        setValue={setProblemUrl}
        placeholder="문제 URL을 입력하세요"
        required
        showError={isSubmitAttempted}
        additionalText="백준/프로그래머스 문제는 자동으로 문제 제목이 입력됩니다."
      />
      <InputLine
        label="문제 제목"
        value={title}
        setValue={setTitle}
        placeholder="문제 제목을 입력하세요"
        required
        showError={isSubmitAttempted}
      />
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <CategoryAutocomplete
            categories={types}
            selected={categories}
            onChange={setCategories}
            isSubmitAttempted={isSubmitAttempted}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">
            성공 여부 <span className="text-blue-500">*</span>
          </label>
          <Dropdown
            options={["성공", "실패"]}
            selected={status === "success" ? "성공" : "실패"}
            onChange={(e) => setStatus(e === "성공" ? "success" : "fail")}
          />
        </div>

        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          required
          showError={isSubmitAttempted}
        />
      </div>

      <InputBox
        label="문제 설명"
        value={detail}
        setValue={setDetail}
        placeholder="문제 설명을 입력하세요"
      />
      <InputCode
        handleAdd={handleAdd}
        codes={codes}
        setCodes={setCodes}
        handleRemove={handleRemove}
        required
        showError={isSubmitAttempted}
      />
      <InputStep
        handleAdd={handleAdd}
        steps={steps}
        setSteps={setSteps}
        handleRemove={handleRemove}
        required
        showError={isSubmitAttempted}
      />
      <InputBox
        label="핵심 아이디어"
        value={ideas}
        setValue={setIdeas}
        placeholder="아이디어를 입력하세요"
        wordCount
      />
      <InputBox
        label="다른 기록 참고"
        value={links}
        setValue={setLinks}
        placeholder="참고한 다른 기록을 입력하세요"
      />
      <div className="flex gap-3 justify-end">{buttons}</div>
    </div>
  );
}
