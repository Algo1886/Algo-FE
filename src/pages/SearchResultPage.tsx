"use client"
import { useState, useEffect } from "react"
import RecordCard from "@components/RecordCard"
import SearchBar from "@components/SearchBar"
import { fetchRecords } from "@api/records"
import { useLocation } from "react-router-dom"

interface Record {
  id: number
  type: string
  site: string
  title: string
  author: string
  date: string
}

const PAGE_SIZE = 20

const SearchResultPage = () => {
  const [records, setRecords] = useState<Record[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [filter, setFilter] = useState(searchParams.get("filter") || "전체")
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "")
  
  const loadRecords = async (p: number = page) => {
    setLoading(true)
    try {
      const params: any = { page: p, size: PAGE_SIZE }

      if (keyword) {
        if (filter === "전체") {
          params.search = keyword
        } else if (filter === "제목") {
          params.search = keyword
        } else if (filter === "유형") {
          params.category = keyword
        } else if (filter === "작성자") {
          params.author = keyword
        } else if (filter === "링크") {
          params.search = keyword
        }
      }

      const res = await fetchRecords(params)
      const r = res.data.records
      const mapped: Record[] = r.map((r: any) => ({
        id: r.id,
        type: r.categories[0] || "기타",
        site: r.problem?.source || "백준",
        title: r.problem?.title || r.title,
        author: r.author?.username || r.author,
        date: r.createdAt.slice(0, 10),
      }))
      setRecords(mapped)
      setTotalPages(Math.ceil(res.total / PAGE_SIZE))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecords(page)
  }, [page])

  const handleSearch = () => {
    setPage(1)
    loadRecords(1)
  }

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5">
      {/* SearchBar 연동 */}
      <SearchBar
        filter={filter}
        setFilter={setFilter}
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />

      {/* 기록 카드 그리드 */}
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

      {/* 페이지네이션 */}
      <div className="flex gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          이전
        </button>
        <span className="px-3 py-1 border rounded">
          {page} / {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          다음
        </button>
      </div>

      {loading && <div className="text-gray-500 mt-2">로딩 중...</div>}
    </div>
  )
}

export default SearchResultPage