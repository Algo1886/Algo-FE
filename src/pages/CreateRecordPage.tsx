import { useState, useEffect, type SetStateAction } from "react";
import { createRecord } from "@api/records";
import { useNavigate } from "react-router-dom";
import InputLine from "@components/Input";
import Dropdown from "@components/Dropdown";
import DifficultySelector from "@components/DifficultySelector";
import CategoryDropdown from "@components/Dropdown/CategoryDropdown";
import InputBox from "@components/Input/InputBox";
import InputCode from "@components/Input/InputCode";
import InputStep from "@components/Input/InputStep";
import Button from "@components/Button";
import Loading from "@components/Loading";
import { problemTypes } from "@constants/problemTypes";
import { extractProblemId, fetchProblemTitle } from "@api/records";
import clsx from "clsx"

function CreateRecordPage() {
  const navigate = useNavigate();

  const [problemUrl, setProblemUrl] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [status, setStatus] = useState<"success" | "fail">("success");
  const [difficulty, setDifficulty] = useState(0);
  const [detail, setDetail] = useState("");
  const [codes, setCodes] = useState([{ code: "", language: "python", verdict: "pass" }]);
  const [steps, setSteps] = useState([{ text: "" }]);
  const [ideas, setIdeas] = useState("");
  const [links, setLinks] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false); // 🔹 추가
  const categoryError = isSubmitAttempted && !categories.trim()

  const handleAdd = (setter: any, arr: any[], newItem: any) =>
    setter([...arr, newItem]);
  const handleRemove = (setter: any, arr: any[], idx: number) =>
    setter(arr.filter((_, i) => i !== idx));

  const validateRequired = () => {
    if (!problemUrl.trim()) return false;
    if (!title.trim()) return false;
    if (!categories.trim()) return false;
    if (difficulty <= 0) return false;
    if (!codes.some(c => c.code.trim())) return false;
    if (!steps.some(s => s.text.trim())) return false;
    return true;
  };

  const handleCreate = async () => {
    setIsSubmitAttempted(true);
    if (!validateRequired()) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await createRecord({
        problemUrl,
        customTitle: title,
        categories: categories.split(",").map((c) => c.trim()),
        status,
        difficulty,
        detail,
        codes: codes.map((c) => ({ ...c })),
        steps: steps.map((s) => ({ ...s })),
        ideas: [{ content: ideas }],
        links: [{ url: links }],
        draft: false,
        published: true,
      });
      alert("생성 완료");
      navigate("/my-records");
    } catch (err) {
      console.error(err);
      alert("생성 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = async () => {
    setLoading(true);
    try {
      await createRecord({
        problemUrl,
        title,
        categories: categories.split(",").map((c) => c.trim()),
        status,
        difficulty,
        detail,
        codes: codes.map((c, i) => ({ ...c, id: i, snippetOrder: i })),
        steps: steps.map((s, i) => ({ ...s, id: i, stepOrder: i })),
        ideas: [{ content: ideas }],
        links: [{ url: links }],
        draft: true,
        published: true,
      });
      alert("생성 완료");
      navigate("/temp-record");
    } catch (err) {
      console.error(err);
      alert("생성 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProblemInfo = async () => {
      const problemId = extractProblemId(problemUrl);
      if (!problemId) return;
      try {
        const title = await fetchProblemTitle(problemId);
        setTitle(title);
      } catch (e) {
        console.error(e);
      }
    };

    if (problemUrl) loadProblemInfo();
  }, [problemUrl]);

  return !loading ? (
    <div className="max-w-[900px] mx-auto p-6 space-y-10">
      <InputLine
        label="문제 URL"
        value={problemUrl}
        setValue={setProblemUrl}
        placeholder="문제 URL을 입력하세요"
        required
        showError={isSubmitAttempted}
      />
      <InputLine
        label="문제 제목"
        value={title}
        setValue={setTitle}
        placeholder="문제 제목을 입력하세요"
        required
        showError={isSubmitAttempted}
      />
      <div className="flex items-center gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">
          문제 유형 <span className="text-blue-500">*</span>
        </label>
        <div className={clsx("rounded", categoryError ? "border border-red-500" : "")}>
          <CategoryDropdown
            categories={problemTypes}
            selected={categories}
            onChange={(val: SetStateAction<string>) => setCategories(val)}
          />
        </div>
        {categoryError && <span className="text-red-500 text-sm">문제 유형을 선택해주세요</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">
          성공 여부 <span className="text-blue-500">*</span>
        </label>
          <Dropdown
            options={["성공", "실패"]}
            selected={status == "success" ? "성공" : "실패"}
            onChange={(e) => setStatus(e == "성공" ? "success" : "fail")}
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
        wordCount={true}
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
      />
      <InputBox
        label="다른 기록 참고"
        value={links}
        setValue={setLinks}
        placeholder="참고한 다른 기록을 입력하세요"
      />
      <div className="flex gap-3 justify-end">
        <Button theme="white" onClick={handleDraft}>
          임시 저장
        </Button>
        <Button theme="dark" onClick={handleCreate}>
          기록하기
        </Button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default CreateRecordPage;