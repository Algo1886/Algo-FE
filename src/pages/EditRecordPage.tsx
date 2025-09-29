import { useState, useEffect } from "react";
import {
  createRecord,
  editRecord,
  fetchRecordById,
  deleteRecordById,
  fetchProblemTitle,
} from "@api/records";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@components/Button";
import Loading from "@components/Loading";
import RecordForm from "@components/RecordForm";
import { useAmplitude } from "react-amplitude-provider";
import { MEANINGFUL_EVENT_NAMES, trackMeaningfulEvent } from "@utils/analytics";

function EditRecordPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const amplitude = useAmplitude();

  const [problemUrl, setProblemUrl] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState(0);
  const [status, setStatus] = useState<"success" | "fail">("success");
  const [difficulty, setDifficulty] = useState(0);
  const [detail, setDetail] = useState("");
  const [codes, setCodes] = useState([
    { code: "", language: "python", verdict: "success" },
  ]);
  const [steps, setSteps] = useState([{ text: "" }]);
  const [ideas, setIdeas] = useState("");
  const [links, setLinks] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleLoading, setTitleLoading] = useState(false);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  useEffect(() => {
    const loadRecord = async () => {
      try {
        if (!id) return;
        const res = await fetchRecordById(Number(id));
        const data = res.data;
        setProblemUrl(data.problemUrl || "");
        setTitle(data.title || "");
        setIsDraft(data.isDraft || false);
        setCategories((data.categories || []).join(", "));
        setStatus(data.status as "success" | "fail");
        setDifficulty(data.difficulty || 1);
        setDetail(data.detail || "");
        setCodes(
          data.codes?.map((c: any) => ({
            code: c.code,
            language: c.language,
            verdict: c.verdict,
          })) || []
        );
        setSteps(data.steps?.map((s: any) => ({ text: s.text })) || []);
        setIdeas(data.ideas[0].content || "");
        setLinks(data.links[0].url || "");
      } catch (err) {
        console.error(err);
      }
    };
    loadRecord();
  }, [id]);

  useEffect(() => {
    const loadProblemInfo = async () => {
      if (!problemUrl) return
      setTitleLoading(true)
      try {
        const res = await fetchProblemTitle(problemUrl)
        setTitle(res.title)
      } catch (e) {
        console.error(e)
      } finally {
        setTitleLoading(false)
      }
    }
    loadProblemInfo()
  }, [problemUrl])

  const validateRequired = () => {
    if (!problemUrl.trim()) return false;
    if (!title.trim()) return false;
    if (!categories) return false;
    if (difficulty <= 0) return false;
    if (!codes.some((c) => c.code.trim())) return false;
    if (!steps.some((s) => s.text.trim())) return false;
    return true;
  };

  const handleAdd = (setter: any, arr: any[], newItem: any) =>
    setter([...arr, newItem]);
  const handleRemove = (setter: any, arr: any[], idx: number) =>
    setter(arr.filter((_, i) => i !== idx));

  const handleEdit = async () => {
    setIsSubmitAttempted(true);
    if (!validateRequired()) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      await editRecord(Number(id), {
        problemUrl,
        customTitle: title,
        categories: [categories],
        status,
        difficulty,
        detail,
        codes: codes.map((c, i) => ({ ...c, id: i, snippetOrder: i })),
        steps: steps.map((s, i) => ({ ...s, id: i, stepOrder: i })),
        ideas: [{ content: ideas }],
        links: [{ url: links }],
        draft: false,
        published: true,
      });
      trackMeaningfulEvent(amplitude, MEANINGFUL_EVENT_NAMES.Record_Edited, {
        recordId: Number(id),
      });
      alert("수정 완료");
      navigate("/my-records");
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = async () => {
    setIsSubmitAttempted(true);
    if (!validateRequired()) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      await editRecord(Number(id), {
        problemUrl,
        title,
        categories: [categories],
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
      alert("임시 저장 완료");
      navigate("/temp-record");
      trackMeaningfulEvent(amplitude, MEANINGFUL_EVENT_NAMES.Draft_Saved, {
        stage: "edit",
        recordId: Number(id),
      });
    } catch (err) {
      console.error(err);
      alert("임시 저장 실패");
    } finally {
      setLoading(false);
    }
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
        title,
        categories: [categories],
        status,
        difficulty,
        detail,
        codes: codes.map((c, i) => ({ ...c, id: i, snippetOrder: i })),
        steps: steps.map((s, i) => ({ ...s, id: i, stepOrder: i })),
        ideas: [{ content: ideas }],
        links: [{ url: links }],
        draft: false,
        published: true,
      });
      await deleteRecordById(Number(id));
      alert("새 기록 생성 완료");
      navigate("/my-records");
    } catch (err) {
      console.error(err);
      alert("생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return !loading ? (
    <RecordForm
      problemUrl={problemUrl}
      setProblemUrl={setProblemUrl}
      title={title}
      setTitle={setTitle}
      titleLoading={titleLoading}
      categories={categories}
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
        isDraft ? (
          <>
            <Button theme="dark" onClick={handleCreate}>
              풀이 생성
            </Button>
            <Button theme="white" onClick={handleDraft}>
              임시 저장
            </Button>
          </>
        ) : (
          <Button theme="dark" onClick={handleEdit}>
            수정하기
          </Button>
        )
      }
    />
  ) : (
    <Loading />
  );
}

export default EditRecordPage;
