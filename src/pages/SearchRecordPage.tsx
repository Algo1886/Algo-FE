import { useState, useEffect } from "react";
import RecordCard from "@components/RecordCard";
import SearchBar from "@components/SearchBar";
import { fetchRecords } from "@api/records";
import { useNavigate, useLocation } from "react-router-dom";
import { useAmplitude } from "react-amplitude-provider";
import { MEANINGFUL_EVENT_NAMES, trackMeaningfulEvent } from "@utils/analytics";
import Dropdown from "@components/Dropdown";
import Loading from "@components/Loading";
import Pagination from "@components/Pagination";

interface Record {
  id: number;
  type: string;
  site: string;
  title: string;
  author: string;
  date: string;
}

const PAGE_SIZE = 12;

const SearchRecordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amplitude = useAmplitude();
  const searchParams = new URLSearchParams(location.search);

  console.log("sP:", searchParams.toString());

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const [records, setRecords] = useState<Record[]>([]);
  const [page, setPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(searchParams.get("filter") || "제목");
  const keyword = searchParams.get("keyword") || "";
  const [newKeyword, setNewKeyword] = useState(keyword);
  const [sort, setSort] = useState("최신순");

  const loadRecords = async (p: number = page) => {
    setLoading(true);
    try {
      const params: any = {
        page: p,
        size: PAGE_SIZE,
        sort: sort === "최신순" ? "LATEST" : "POPULAR",
      };

      if (keyword) {
        if (filter === "제목") {
          params.search = keyword;
        } else if (filter === "유형") {
          params.category = keyword;
        } else if (filter === "작성자") {
          params.author = keyword;
        } else if (filter === "링크") {
          params.search = keyword;
        }
      }

      const res = await fetchRecords(params);
      const r = res.data.records;
      const mapped: Record[] = r.map((r: any) => ({
        id: r.id,
        type: r.categories[0] || "기타",
        site: r.problem?.source || "백준",
        title: r.problem?.title || r.title,
        author: r.author?.username || r.author,
        date: r.createdAt.slice(0, 10),
      }));
      setRecords(mapped);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords(page);
  }, [page, keyword, filter, sort]);

  useEffect(() => {
    const newPage = parseInt(searchParams.get("page") || "1", 10);
    setPage(newPage);
  }, [location.search]);

  const handleSearch = () => {
    trackMeaningfulEvent(amplitude, MEANINGFUL_EVENT_NAMES.Search_Performed, {
      keyword: newKeyword,
      filter,
      sort,
    });
    navigate(
      `/search-result?filter=${encodeURIComponent(
        filter
      )}&keyword=${encodeURIComponent(newKeyword)}&page=1`
    );
  };

  return (
    <div className="flex flex-col items-center w-full p-5 gap-5 max-w-[1280px] mx-auto">
      {!loading ? (
        <>
          <SearchBar
            filter={filter}
            setFilter={setFilter}
            keyword={newKeyword}
            setKeyword={setNewKeyword}
            onSearch={handleSearch}
          />
          <div className="w-full">
            <div className="w-full flex justify-between items-center mb-4">
              <p className="text-xl font-bold">
                {keyword}에 대한 다른 사람들의 풀이 기록
              </p>
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
            <Pagination totalPages={totalPages} currentPage={page} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SearchRecordPage;
