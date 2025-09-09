import { useEffect, useState } from "react"
import RecordCard from "@components/RecordCard"
import { fetchBookmarks } from "@api/records"
import Button from "@components/Button"

interface Record {
  id: number
  type: string
  site: string
  title: string
  author: string
  date: string
}

const MyBookmarksPage = () => {
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const res = await fetchBookmarks()
        const r = res.data.bookmarks
        const mapped: Record[] = r.map((r: any) => ({
          id: r.id,
          type: r.categories[0],
          site: r.source,
          title: r.title,
          author: r.author,
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
      {records.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="w-50 h-50 rounded-full bg-gray-300" />
          <p className="text-xl font-semibold">아직 북마크가 없어요</p>
          <p className="text-gray-600">
            다시 보고 싶은 풀이를<br />
            북마크해보세요!
          </p>
          <Button
            onClick={() => {
              window.location.href = "/my-records"
            }}
          >
            내 기록
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
          {records.map((r) => (
            <RecordCard
              draft={false}
              key={r.id}
              id={r.id}
              problemType={r.type}
              problemSite={r.site}
              title={r.title}
              author={r.author}
              createdAt={r.date}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookmarksPage