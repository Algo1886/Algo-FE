"use client"
import { type Dispatch, type SetStateAction } from "react"
import Button from "@components/Button"
import Dropdown from "@components/Dropdown"

interface SearchBarProps {
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  keyword: string
  setKeyword: Dispatch<SetStateAction<string>>
  onSearch: () => void
}

const SearchBar = ({ filter, setFilter, keyword, setKeyword, onSearch }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-2 w-full max-w-4xl mx-auto">
      {/* 검색 아이콘 */}
      <div className="flex items-center justify-center px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </div>

      {/* 드롭다운 */}
      <Dropdown
        options={["전체", "유형", "제목", "링크", "작성자"]}
        selected={filter}
        onChange={setFilter}
      />

      {/* 입력창 */}
      <input
        type="text"
        placeholder="알고리즘 기록을 검색해 보세요!"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />

      {/* 검색 버튼 */}
      <Button onClick={onSearch}>검색</Button>
    </div>
  )
}

export default SearchBar