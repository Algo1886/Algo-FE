// pages/SearchResultPage.tsx
import SearchBar from "@components/SearchBar";
import RecordCard from "@components/RecordCard";

interface Record {
  id: number;
  type: string;
  site: string;
  title: string;
  author: string;
  date: string;
}

const DUMMY_RECORDS: Record[] = [
  {
    id: 1,
    type: "구현",
    site: "백준",
    title: "문제1",
    author: "Alice",
    date: "2025-08-27",
  },
  {
    id: 2,
    type: "그래프",
    site: "프로그래머스",
    title: "문제2",
    author: "Bob",
    date: "2025-08-26",
  },
  // 필요시 더 추가
];

const SearchResultPage = () => {
  return (
    <div className="flex flex-col items-center w-full p-5 gap-5">
      {/* 검색바 */}
      <SearchBar />

      {/* 레코드 그리드 */}
      <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
        {DUMMY_RECORDS.map((r) => (
          <RecordCard
            key={r.id}
            problemType={r.type}
            problemSite={r.site}
            title={r.title}
            author={r.author}
            createdAt={r.date}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;