"use client"
import { useState, useEffect } from "react"
import { createRecord, editRecord, fetchRecordById } from "@api/records"
import { useNavigate, useParams } from "react-router-dom"
import { deleteRecordById } from "@api/records"

function EditRecordPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()  // URL에서 id 가져오기
  
  useEffect(() => {
    const loadRecord = async () => {
      try {
        if (!id) return
        const res = await fetchRecordById(Number(id))
        const data = res.data
        console.log(data.isDraft)
  
        // 불러온 데이터로 폼 초기화
        setProblemUrl(data.problemUrl || "")
        setTitle(data.title || "")
        setIsDraft(data.isDraft || false)
        setCategories((data.categories || []).join(", "))
        setStatus(data.status as "success" | "fail")
        setDifficulty(data.difficulty || 1)
        setDetail(data.detail || "")
        setCodes(data.codes?.map((c: { code: any; language: any; verdict: any }) => ({
          code: c.code,
          language: c.language,
          verdict: c.verdict
        })) || [])
        setSteps(data.steps?.map((s: { text: any }) => ({ text: s.text })) || [])
        setIdeas(data.ideas?.map((i: { content: any }) => ({ content: i.content })) || [])
        setLinks(data.links?.map((l: { url: any }) => ({ url: l.url })) || [])
        
      } catch (err) {
        console.error(err)
      }
    }
    loadRecord()
  }, [id])
  const [problemUrl, setProblemUrl] = useState("")
  const [title, setTitle] = useState("")
  const [categories, setCategories] = useState("")
  const [status, setStatus] = useState<"success" | "fail">("success")
  const [difficulty, setDifficulty] = useState(1)
  const [detail, setDetail] = useState("")
  const [codes, setCodes] = useState([{ code: "", language: "python", verdict: "fail" }])
  const [steps, setSteps] = useState([{ text: "" }])
  const [ideas, setIdeas] = useState([{ content: "" }])
  const [links, setLinks] = useState([{ url: "" }])
  const [loading, setLoading] = useState(false)
  const [isDraft, setIsDraft] = useState(false)

  const handleAdd = (setter: any, arr: any[], newItem: any) => setter([...arr, newItem])
  const handleRemove = (setter: any, arr: any[], idx: number) =>
    setter(arr.filter((_, i) => i !== idx))

  const handleEdit = async () => {
    setLoading(true)
    try {
      await editRecord(Number(id), {
        problemUrl,
        title,
        categories: categories.split(",").map(c => c.trim()),
        status,
        difficulty,
        detail,
        codes: codes.map((c, i) => ({ ...c, id: i, snippetOrder: i })),
        steps: steps.map((s, i) => ({ ...s, id: i, stepOrder: i })),
        ideas: ideas.map((i, idx) => ({ ...i, id: idx })),
        links: links.map((l, idx) => ({ ...l, id: idx })),
        draft: false,
        published: true
      })
      alert("수정 완료")
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
        await editRecord(Number(id), {
          problemUrl,
          title,
          categories: categories.split(",").map(c => c.trim()),
          status,
          difficulty,
          detail,
          codes: codes.map((c, i) => ({ ...c, id: i, snippetOrder: i })),
          steps: steps.map((s, i) => ({ ...s, id: i, stepOrder: i })),
          ideas: ideas.map((i, idx) => ({ ...i, id: idx })),
          links: links.map((l, idx) => ({ ...l, id: idx })),
          draft: true,
          published: true
        })
        alert("수정 완료")
        navigate('/my-records')
      } catch (err) {
        console.error(err)
        alert("생성 실패")
      } finally {
        setLoading(false)
      }
  }

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
        ideas: ideas.map((i, idx) => ({ ...i, id: idx })),
        links: links.map((l, idx) => ({ ...l, id: idx })),
        draft: false,
        published: true
      })
      await deleteRecordById(Number(id))
      alert("생성 완료")
      navigate('/my-records')
    } catch (err) {
      console.error(err)
      alert("생성 실패")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">풀이 작성</h1>

      <div className="space-y-4 bg-white border border-gray-200 rounded-xl shadow p-6">
        {/* 문제 URL */}
        <div className="space-y-1">
          <label className="font-medium text-gray-700">문제 URL</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={problemUrl}
            onChange={e => setProblemUrl(e.target.value)}
          />
        </div>

        {/* 문제 제목 */}
        <div className="space-y-1">
          <label className="font-medium text-gray-700">문제 제목</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* 문제 유형 */}
        <div className="space-y-1">
          <label className="font-medium text-gray-700">문제 유형 (콤마로 구분)</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={categories}
            onChange={e => setCategories(e.target.value)}
          />
        </div>

        {/* 성공 여부 + 난이도 */}
        <div className="flex items-center gap-6">
          <div>
            <label className="font-medium text-gray-700">성공 여부</label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={status}
              onChange={e => setStatus(e.target.value as "success" | "fail")}
            >
              <option value="success">성공</option>
              <option value="fail">실패</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">체감 난이도</label>
            {[1, 2, 3, 4, 5].map(n => (
              <span
                key={n}
                onClick={() => setDifficulty(n)}
                className={`cursor-pointer text-lg ${n <= difficulty ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* 문제 설명 */}
        <div className="space-y-1">
          <label className="font-medium text-gray-700">문제 설명</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={detail}
            onChange={e => setDetail(e.target.value)}
          />
        </div>

        {/* 코드 블록 */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">소스코드</label>
          {codes.map((c, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-3 space-y-2 relative">
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={c.code}
                onChange={e => {
                  const newCodes = [...codes]
                  newCodes[idx].code = e.target.value
                  setCodes(newCodes)
                }}
              />
              <div className="flex gap-2 items-center">
                <select
                  className="border border-gray-300 rounded-lg px-2 py-1"
                  value={c.language}
                  onChange={e => {
                    const newCodes = [...codes]
                    newCodes[idx].language = e.target.value
                    setCodes(newCodes)
                  }}
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                </select>
                <select
                  className="border border-gray-300 rounded-lg px-2 py-1"
                  value={c.verdict}
                  onChange={e => {
                    const newCodes = [...codes]
                    newCodes[idx].verdict = e.target.value as "success" | "fail"
                    setCodes(newCodes)
                  }}
                >
                  <option value="success">성공</option>
                  <option value="fail">실패</option>
                </select>
                <button
                  className="ml-auto text-red-500 font-semibold"
                  onClick={() => handleRemove(setCodes, codes, idx)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          <button
            className="text-blue-600 font-medium"
            onClick={() => handleAdd(setCodes, codes, { code: "", language: "python", verdict: "fail" })}
          >
            코드 블록 추가
          </button>
        </div>

        {/* 풀이 과정 */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">풀이 과정</label>
          {steps.map((s, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-3 relative">
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={s.text}
                onChange={e => {
                  const newSteps = [...steps]
                  newSteps[idx].text = e.target.value
                  setSteps(newSteps)
                }}
              />
              <button
                className="absolute top-2 right-2 text-red-500 font-semibold"
                onClick={() => handleRemove(setSteps, steps, idx)}
              >
                삭제
              </button>
            </div>
          ))}
          <button
            className="text-blue-600 font-medium"
            onClick={() => handleAdd(setSteps, steps, { text: "" })}
          >
            풀이 과정 추가
          </button>
        </div>

        {/* 아이디어 */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">핵심 아이디어</label>
          {ideas.map((i, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={i.content}
                onChange={e => {
                  const newIdeas = [...ideas]
                  newIdeas[idx].content = e.target.value
                  setIdeas(newIdeas)
                }}
              />
              <button
                className="text-red-500 font-semibold"
                onClick={() => handleRemove(setIdeas, ideas, idx)}
              >
                삭제
              </button>
            </div>
          ))}
          <button
            className="text-blue-600 font-medium"
            onClick={() => handleAdd(setIdeas, ideas, { content: "" })}
          >
            아이디어 추가
          </button>
        </div>

        {/* 링크 */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">다른 기록 참고</label>
          {links.map((l, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={l.url}
                onChange={e => {
                  const newLinks = [...links]
                  newLinks[idx].url = e.target.value
                  setLinks(newLinks)
                }}
              />
              <button
                className="text-red-500 font-semibold"
                onClick={() => handleRemove(setLinks, links, idx)}
              >
                삭제
              </button>
            </div>
          ))}
          <button
            className="text-blue-600 font-medium"
            onClick={() => handleAdd(setLinks, links, { url: "" })}
          >
            링크 추가
          </button>
        </div>

          {isDraft ? 
              <>
              <button
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              onClick={handleCreate}
              disabled={loading}
              >
                  {loading ? "생성 중..." : "풀이 생성"}
              </button>
              {/* 임시 저장 버튼 */}
              <button
                  className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  onClick={handleDraft}
                  disabled={loading}
              >
              {loading ? "생성 중..." : "임시 저장"}
            </button>
          </>
           : 
            <button
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            onClick={handleEdit}
            disabled={loading}
            >
            {loading ? "생성 중..." : "수정하기"}
            </button>
          }

      </div>
    </div>
  )
}

export default EditRecordPage