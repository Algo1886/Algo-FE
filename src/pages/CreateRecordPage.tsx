import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProblemTitle, createRecord } from "@api/records";
import Button from "@components/Button";
import Loading from "@components/Loading";
import RecordForm from "@components/RecordForm";

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
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

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
    if (categoryError) return false;
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
    setLoading(true);
    const loadProblemInfo = async () => {
      try {
        const res = await fetchProblemTitle(problemUrl);
        setTitle(res.title)
      } catch (e) {
        console.error(e);
      }
    };
    if (problemUrl) loadProblemInfo();
    setLoading(false)
  }, [problemUrl]);

  return !loading ? (
    <RecordForm
      problemUrl={problemUrl}
      setProblemUrl={setProblemUrl}
      title={title}
      setTitle={setTitle}
      categories={categories}
      categoryError={categoryError}
      setCategoryError={setCategoryError}
      setCategories={setCategories}
      status={status}
      setStatus={setStatus}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      detail={detail}
      setDetail={setDetail}
      codes={codes}
      setCodes={setCodes}
      steps={steps}
      setSteps={setSteps}
      ideas={ideas}
      setIdeas={setIdeas}
      links={links}
      setLinks={setLinks}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
      isSubmitAttempted={isSubmitAttempted}
      buttons={
        <div className="flex gap-3 justify-end">
          <Button theme="white" onClick={handleDraft}>
            임시 저장
          </Button>
          <Button theme="dark" onClick={handleCreate}>
            기록하기
          </Button>
        </div>
      }
    />
  ) : (
    <Loading />
  );
}

export default CreateRecordPage;