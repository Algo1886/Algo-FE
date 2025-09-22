import { useState, useRef, useEffect } from "react";

interface Category {
  label: string;
  value: string;
}

// 한글 초성 변환 함수
const CHOSUNG_LIST = [
  "ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"
];

function getChosung(str: string) {
  return str
    .split("")
    .map(c => {
      const code = c.charCodeAt(0) - 0xac00;
      if (code < 0 || code > 11171) return c;
      const chosungIndex = Math.floor(code / 588);
      return CHOSUNG_LIST[chosungIndex];
    })
    .join("");
}

interface CategoryDropdownProps {
  categories: Category[];
  selected: string;
  onChange: (value: string) => void;
  required?: boolean;
  showError?: boolean;
  errorMessage?: string;
  categoryError: boolean;
  setCategoryError: (value: boolean) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  selected,
  onChange,
  required,
  showError,
  categoryError,
  setCategoryError
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (containerRef.current) setWidth(containerRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        const exists = categories.some(c => c.value === selected);
        setCategoryError(!exists);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selected, categories]);

  const filtered = categories.filter(cat => {
    const label = cat.label.toLowerCase();
    const labelChosung = getChosung(cat.label).toLowerCase();
    const q = query.toLowerCase();
    const qChosung = getChosung(query).toLowerCase();
    return label.includes(q) || labelChosung.includes(qChosung);
  });

  const isError = required && showError && !selected;

  return (
    <div className="flex flex-col gap-1" >
      <label className="font-medium text-gray-700">
        문제 유형 <span className="text-blue-500">*</span>
      </label>
      <div className="relative inline-block text-left bg-white" ref={containerRef}>
        <input
          type="text"
          value={query || categories.find(c => c.value === selected)?.label || ""}
          placeholder="유형 검색"
          onClick={() => setOpen(!open)}
          onChange={e => {
            const inputValue = e.target.value;
            setQuery(inputValue);
            setOpen(true);

            const matched = categories.find(
              c => c.label.toLowerCase() === inputValue.toLowerCase()
            );
            if (matched) {
              onChange(matched.value);
              setCategoryError(false);
            } else {
              onChange(""); // 선택 해제
            }
          }}
          className={`w-full rounded border px-4 py-2 focus:outline-none ${isError || categoryError ? "border-red-500" : "border-gray-200"}`}
        />
        {open && (
          <div
            style={{ width }}
            className="absolute mt-1 rounded border border-gray-200 bg-white z-50 max-h-60 overflow-auto"
          >
            {filtered.length > 0 ? (
              filtered.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onChange(cat.value);
                    setQuery("");
                    setOpen(false);
                  }}
                  className="cursor-pointer block px-3 py-2 hover:bg-gray-100 w-full text-left"
                >
                  {cat.label}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-400">검색 결과 없음</div>
            )}
          </div>
        )}
      </div>
      {isError && <span className="text-red-500 text-sm">문제 유형을 선택해주세요</span>}
      {!isError && categoryError && <span className="text-red-500 text-sm">리스트 내 유형을 선택해주세요</span>}
    </div>

  );
};

export default CategoryDropdown;