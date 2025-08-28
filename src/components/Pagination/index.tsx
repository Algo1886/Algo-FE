import { useNavigate, useLocation } from "react-router-dom";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getUpdatedSearch = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page.toString());
    return `${location.pathname}?${searchParams.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => navigate(getUpdatedSearch(page))}
          className={`px-3 py-1 rounded text-sm ${
            currentPage === page
              ? "bg-blue-400 text-white font-semibold"
              : "bg-white hover:bg-blue-200 text-gray-800"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
