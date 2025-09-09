import { useState, type SetStateAction } from "react"
import { createRecord } from "@api/records"
import { useNavigate } from "react-router-dom"
import InputLine from "@components/Input"
import Dropdown from "@components/Dropdown"
import DifficultySelector from "@components/DifficultySelector"
import CategoryDropdown from "@components/Dropdown/CategoryDropdown"
import InputBox from "@components/Input/InputBox"
import InputCode from "@components/Input/InputCode"
import InputStep from "@components/Input/InputStep"
import Button from "@components/Button"
import Loading from "@components/Loading"

function CreateRecordPage() {
  const navigate = useNavigate()

  const [problemUrl, setProblemUrl] = useState("")
  const [title, setTitle] = useState("")
  const [categories, setCategories] = useState("")
  const [status, setStatus] = useState<"success" | "fail">("success")
  const [difficulty, setDifficulty] = useState(1)
  const [detail, setDetail] = useState("")
  const [codes, setCodes] = useState([{ code: "", language: "python", verdict: "success" }])
  const [steps, setSteps] = useState([{ text: "" }])
  const [ideas, setIdeas] = useState("")
  const [links, setLinks] = useState("")
  const [loading, setLoading] = useState(false)
  const categoriesList = [
    { label: "DP", value: "dp" },
    { label: "그리디", value: "greedy" },
    { label: "백트래킹", value: "backtracking" },
    { label: "투포인터", value: "two-pointers" },
    { label: "누적합", value: "prefix-sum" },
    { label: "최단경로", value: "dijkstra" },
    { label: "위상정렬", value: "topological-sort" },
    { label: "BFS", value: "bfs" },
    { label: "DFS", value: "dfs" },
    { label: "트리", value: "tree-basic" },
    { label: "정렬", value: "sorting" },
    { label: "탐색", value: "searching" },
    { label: "해시", value: "hash-map" },
    { label: "스택/큐", value: "stack-queue-deque" },
    { label: "문자열", value: "string-basic" },
    { label: "배열", value: "array" },
    { label: "기타", value: "ect" },
  ]
  const handleAdd = (setter: any, arr: any[], newItem: any) => setter([...arr, newItem])
  const handleRemove = (setter: any, arr: any[], idx: number) =>
    setter(arr.filter((_, i) => i !== idx))

  const handleCreate = async () => {
    setLoading(true)
    try {
      await createRecord({
        problemUrl,
        title,
        categories: categories.split(",").map(c => c.trim()),
        status,
        difficulty,
        detail,
        codes: codes.map((c, i) => ({ ...c, id: i, snippetOrder: i })),
        steps: steps.map((s, i) => ({ ...s, id: i, stepOrder: i })),
        ideas: [{"content": ideas}],
        links: [{"url": links}],
        draft: false,
        published: true
      })
      alert("생성 완료")
      navigate('/my-records')
    } catch (err) {
      console.error(err)
      alert("생성 실패")
    } finally {
      setLoading(false)
    }
  }

  const handleDraft = async () => {
    setLoading(true)
    try {
      await createRecord({
        problemUrl,
        title,
        categories: categories.split(",").map(c => c.trim()),
        status,
        difficulty,
        detail,
        codes: codes.map((c, i) => ({ ...c, id: i, snippetOrder: i })),
        steps: steps.map((s, i) => ({ ...s, id: i, stepOrder: i })),
        ideas: [{"content": ideas}],
        links: [{"url": links}],
        draft: true,
        published: true
      })
      alert("생성 완료")
      navigate('/my-drafts')
    } catch (err) {
      console.error(err)
      alert("생성 실패")
    } finally {
      setLoading(false)
    }
  }

  return (
    !loading
    ? (
      <div className="max-w-[900px] mx-auto p-6 space-y-10">
      <InputLine 
        label="문제 URL"
        value={problemUrl}
        setValue={setProblemUrl}
        placeholder="문제 URL을 입력하세요"
      />
      <InputLine 
        label="문제 제목"
        value={title}
        setValue={setTitle}
        placeholder="문제 제목을 입력하세요"
      />
    <div className="flex items-center gap-4">
      <label className="font-medium text-gray-700">문제 유형</label>
      <CategoryDropdown
        categories={categoriesList}
        selected={categories}
        onChange={(val: SetStateAction<string>) => setCategories(val)}
      />
      <label className="font-medium text-gray-700">성공 여부</label>
      <Dropdown
        options={["성공", "실패"]}
        selected={status == "success" ? "성공" : "실패"}
        onChange={e => setStatus(e == "성공" ? "success" : "fail")}
      />
      <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
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
    />
    <InputStep
      handleAdd={handleAdd}
      steps={steps}
      setSteps={setSteps}
      handleRemove={handleRemove}
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
        <Button
        theme="white"
        onClick={handleDraft}
      >
        임시 저장
      </Button>
      <Button
        theme="dark"
        onClick={handleCreate}
      >
        기록하기
      </Button>
    </div>
</div>
    ) : (
<Loading/>
    )
  )
}

export default CreateRecordPage