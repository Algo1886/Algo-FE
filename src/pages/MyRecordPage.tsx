import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import RecordCard from "@components/RecordCard"
import { fetchUserRecords } from "@api/user"
import Pagination from "@components/Pagination"
import Loading from "@components/Loading"

interface Record {
  id: number
  type: string
  site: string
  title: string
  author: string
  date: string
}

const size = 12

const MyRecordPage = () => {
  const [records, setRecords] = useState<Record[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const page = Number(searchParams.get("page")) || 1

  const loadRecords = async (page: number) => {
    setLoading(true)
    try {
      const res = await fetchUserRecords(page, size)
      const r = res.data.records
      const mapped: Record[] = r.map((r: any) => ({
        id: r.id,
        type: r.categories[0] || "기타",
        site: r.source || "백준",
        title: r.title,
        author: r.author,
        date: r.createdAt.slice(0, 10),
      }))
      setRecords(mapped)

      // totalCount 없으면 현재 페이지 + 1로 가정해서 다음 버튼 나오도록
      const totalCount = res.data.totalCount ?? (page * size + (r.length === size ? size : 0))
      setTotalPages(Math.ceil(totalCount / size))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecords(page)
  }, [page])

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5">
      <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
        {records.map((r) => (
          <RecordCard
            key={r.id}
            id={r.id}
            problemType={r.type}
            problemSite={r.site}
            title={r.title}
            author={r.author}
            createdAt={r.date}
            draft={false}
          />
        ))}
      </div>
      {loading && <Loading/> }
      {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={page} />}
    </div>
  )
}

export default MyRecordPage