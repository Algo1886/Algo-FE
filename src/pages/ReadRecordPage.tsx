import { useEffect, useState } from "react"
import DefaultListBox from "@components/ListBox"
import HeaderListBox from "@components/ListBox/HeaderListBox"
import { fetchRecordById, createBookmarkById, deleteBookmarkById } from "@api/records"
import { useParams } from "react-router-dom"
import { deleteRecordById } from "@api/records"
import { useNavigate } from "react-router-dom"

interface RecordResponse {
  id: number
  title: string
  problemUrl: string
  problem: {
    id: number
    source: string
    displayId: string
  }
  categories: string[]
  status: string
  difficulty: number
  detail: string
  codes: { id: number; code: string; language: string; verdict: string; snippetOrder: number }[]
  steps: { id: number; stepOrder: number; text: string }[]
  ideas: { id: number; content: string }[]
  links: { id: number; url: string }[]
  author: { id: number; username: string; avatarUrl: string }
  isDraft: boolean
  isPublished: boolean
  isBookmarked: boolean
  isOwner: boolean
  createdAt: string
  updatedAt: string
}

const ReadRecordPage = () => {
  const navigate = useNavigate()
  const [record, setRecord] = useState<RecordResponse | null>(null)
  const { id } = useParams<{ id: string }>()  // URL에서 id 가져오기

  useEffect(() => {
    const loadRecord = async () => {
      try {
        if (!id) return
        const res = await fetchRecordById(Number(id))
        setRecord(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    loadRecord()
  }, [id])

  const handleBookmarkToggle = () => {
    // TODO: 서버 연동 시 API 호출
    if (record) {
      if (record.isBookmarked) {
        deleteBookmarkById(record.id)
      } else {
        createBookmarkById(record.id)
      }
      setRecord({ ...record, isBookmarked: !record.isBookmarked })
    }
  }

  if (!record) return <div>로딩 중...</div>

  return (
    <div className="w-full flex flex-col items-center p-5 gap-5">
      <HeaderListBox
        title={record.title}
        tags={record.categories}
        link={record.problemUrl}
        user={record.author.username}
        time={new Date(record.createdAt).toLocaleString()}
        isSuccess={record.status === "success"}
        difficulty={record.difficulty}
        isBookmarked={record.isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
        onEdit={() => navigate(`/record/edit/${record.id}`)} // 수정 API 연결
        onDelete={async () => {
          await deleteRecordById(record.id)
          navigate(-1)
        }}
      />
      {record.codes.map((c) => (
        <DefaultListBox key={c.id} boxTitle={`코드 (${c.language})`}>
          <code className="bg-black w-full text-white rounded-lg py-4 whitespace-break-spaces flex items-start text-left px-8">
            {c.code}
          </code>
        </DefaultListBox>
      ))}

      {record.steps.length > 0 && (
        <DefaultListBox boxTitle="단계">
          {record.steps.map((s) => (
            <p key={s.id}>
              {s.stepOrder}: {s.text}
            </p>
          ))}
        </DefaultListBox>
      )}

      {record.ideas.length > 0 && (
        <DefaultListBox boxTitle="아이디어">
          {record.ideas.map((i) => (
            <p key={i.id}>{i.content}</p>
          ))}
        </DefaultListBox>
      )}

      {record.links.length > 0 && (
        <DefaultListBox boxTitle="링크">
          {record.links.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer">
              {l.url}
            </a>
          ))}
        </DefaultListBox>
      )}

      {record.detail && (
        <DefaultListBox boxTitle="상세 설명">
          <p>{record.detail}</p>
        </DefaultListBox>
      )}
    </div>
  )
}

export default ReadRecordPage