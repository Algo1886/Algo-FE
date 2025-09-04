import { useEffect, useState } from "react"
import RecordCard from "@components/RecordCard"
import SearchBar from "@components/SearchBar"
import { fetchRecords } from "@api/records"
import { useNavigate } from "react-router-dom"

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
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/search-result?filter=${encodeURIComponent(filter)}&keyword=${encodeURIComponent(keyword)}`)
  }
  useEffect(() => {
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
          date: r.createdAt.slice(0, 10),
        }))
        setRecords(mapped)
      } catch (err) {
        console.error(err)
      }
    }
    loadRecords()
  }, [])

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5">
      <SearchBar
        filter={filter}
        setFilter={setFilter}
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />
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
    </div>
  )
}

export default MainPage