import { useEffect, useState } from "react"
import RecordCard from "@components/RecordCard"
import { fetchUserRecords } from "@api/user"

interface Record {
  id: number
  type: string
  site: string
  title: string
  author: string
  date: string
}

const MyRecordPage = () => {
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const res = await fetchUserRecords()
        const r = res.data.records
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

export default MyRecordPage