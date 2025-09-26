import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { fetchRecords } from "@api/records"
import RecordCard from "@components/RecordCard"
import SearchBar from "@components/SearchBar"
import Dropdown from "@components/Dropdown"
import Loading from "@components/Loading"

interface Record {
  id: number
  type: string
  site: string
  title: string
  author: string
  date: string
}

const MainPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState<Record[]>([])
  const [filter, setFilter] = useState("제목")
  const [sort, setSort] = useState("최신순")
  const [keyword, setKeyword] = useState("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSearch = () => {
    navigate(
      `/search-result?filter=${encodeURIComponent(filter)}&keyword=${encodeURIComponent(keyword)}`
    )
  }

  const loadRecords = async (pageNum: number) => {
    setLoading(true)
    try {
      const res = await fetchRecords({ page: pageNum, size: 20, sort: sort === "최신순" ? "LATEST" : "POPULAR" })
      const r = res.data.records
      const mapped: Record[] = r.map((r: any) => ({
        id: r.id,
        type: r.categories[0] || "기타",
        site: r.problem?.source || "백준",
        title: r.problem?.title || r.title,
        author: r.author?.username || r.author,
        date: r.createdAt
      }))
      setRecords(prev => pageNum === 1 ? mapped : [...prev, ...mapped])
      setHasMore(mapped.length > 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // 초기 렌더 + 정렬 변경 시
  useEffect(() => {
    setPage(1)
    loadRecords(1)
  }, [sort])

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading || !hasMore) return
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setPage(prev => prev + 1)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore])

  // 페이지 변경 시 새로운 데이터 로드
  useEffect(() => {
    if (page === 1) return
    loadRecords(page)
  }, [page])

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5 max-w-[1280px] mx-auto" ref={containerRef}>
      <SearchBar
        filter={filter}
        setFilter={setFilter}
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />
      <div className="w-full">
        <div className="w-full flex justify-between items-center mb-4">
          <p className="text-xl font-bold">다른 사람들의 풀이 기록</p>
          <Dropdown
            options={["최신순", "인기순"]}
            selected={sort}
            onChange={setSort}
          />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        {loading && <Loading />}
      </div>
    </div>
  )
}

export default MainPage