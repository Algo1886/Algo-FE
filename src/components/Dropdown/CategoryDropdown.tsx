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

interface AutocompleteDropdownProps {
  categories: Category[];
  selected: string;
  onChange: (value: string) => void;
}

const CategoryDropdown: React.FC<AutocompleteDropdownProps> = ({ categories, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (containerRef.current) setWidth(containerRef.current.offsetWidth);
  }, []);

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filtered = categories.filter(cat => {
    const label = cat.label.toLowerCase();
    const labelChosung = getChosung(cat.label).toLowerCase();
    const q = query.toLowerCase();
    const qChosung = getChosung(query).toLowerCase();
    return label.includes(q) || labelChosung.includes(qChosung);
  });

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <input
        type="text"
        value={query || categories.find(c => c.value === selected)?.label || ""}
        placeholder="유형 검색"
        onClick={() => setOpen(!open)}
        onChange={e => {
          setQuery(e.target.value);
          setOpen(true);
          if (e.target.value === "") {
            onChange("");
          }
        }}
        className="w-full bg-white rounded border border-gray-200 px-4 py-2 focus:outline-none"
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
  );
};

export default CategoryDropdown;