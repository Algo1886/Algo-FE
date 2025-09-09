import { useState, useRef, useEffect } from "react";

interface Category {
  label: string;
  value: string;
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

  const filtered = categories.filter(cat =>
    cat.label.toLowerCase().includes(query.toLowerCase())
  );

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
                className="block px-3 py-2 hover:bg-gray-100 w-full text-left"
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