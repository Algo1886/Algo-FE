import { useEffect, useState } from "react"
import RecordCard from "@components/RecordCard"
import SearchBar from "@components/SearchBar"
import { fetchRecords } from "@api/records"
import { useNavigate } from "react-router-dom"
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
  const [records, setRecords] = useState<Record[]>([])
  const [filter, setFilter] = useState("전체")
  const [sort, setSort] = useState("최신순")
  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(
      `/search-result?filter=${encodeURIComponent(filter)}&keyword=${encodeURIComponent(keyword)}`
    )
  }

  useEffect(() => {
    setLoading(true)
    const loadRecords = async () => {
      try {
        const res = await fetchRecords({ page: 1, size: 100 })
        const r = res.data.records
        const mapped: Record[] = r.map((r: any) => ({
          id: r.id,
          type: r.categories[0] || "기타",
          site: r.problem?.source || "백준",
          title: r.problem?.title || r.title,
          author: r.author?.username || r.author,
          date: r.createdAt.slice(2, 10),
        }))
        setRecords(mapped)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    loadRecords()
  }, [])

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5 max-w-[1280px] mx-auto">
      {
        !loading ? (
          <>
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
            </div>
          </>
        ):(
          <Loading />
        )
      }

    </div>
  )
}

export default MainPage