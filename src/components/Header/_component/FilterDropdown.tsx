import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CATEGORY_NAME_MAP, getCategoryKoreanName } from "@utils/category";
import { fetchCategories } from "@api/records";

interface CategoryApiItem {
  id: number;
  name: string;
}

interface OptionItem {
  id: number;
  slug: string;
  label: string;
}

interface Props {
  initialRoute: string;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-ㄱ-ㅎㅏ-ㅣ가-힣]/g, "")
    .replace(/-+/g, "-");

const mapApiToOptions = (apiList: CategoryApiItem[]): OptionItem[] => {
  const inverted: Record<string, string> = Object.entries(
    CATEGORY_NAME_MAP
  ).reduce((acc, [slug, label]) => {
    acc[label] = slug;
    return acc;
  }, {} as Record<string, string>);

  return apiList.map((it) => {
    const label = it.name;
    const slugFromMap = inverted[label];
    const generated = slugFromMap || slugify(label);
    return { id: it.id, slug: generated, label };
  });
};

const FilterDropdown: React.FC<Props> = ({ initialRoute }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const initialKeyword = params.get("keyword") || "";
  const initialFilterLabel = params.get("filter") || "";

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OptionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>(() => {
    if (initialKeyword) return initialKeyword;
    if (initialFilterLabel) {
      const found = Object.entries(CATEGORY_NAME_MAP).find(
        ([, label]) => label === initialFilterLabel
      );
      return found ? found[0] : "";
    }
    return "";
  });

  useEffect(() => {
    let mounted = true;
    const fetchList = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCategories();
        if (!mounted) return;
        if (!res || !res.data) {
          setError("카테고리 로드 실패");
          setOptions([]);
          return;
        }
        setOptions(mapApiToOptions(res.data));
      } catch (e) {
        setError("카테고리 로드 에러");
        setOptions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchList();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const keyword = p.get("keyword") || "";
    const filterLabel = p.get("filter") || "";

    if (keyword) {
      if (/^\d+$/.test(keyword)) {
        setSelectedId(keyword);
        return;
      } else {
        const bySlug = options.find((o) => o.slug === keyword);
        if (bySlug) {
          setSelectedId(String(bySlug.id));
          return;
        }
        const byLabelStatic = Object.entries(CATEGORY_NAME_MAP).find(
          ([, label]) => label === keyword
        );
        if (byLabelStatic) {
          setSelectedId(byLabelStatic[0]);
          return;
        }
        setSelectedId(keyword);
        return;
      }
    }

    if (filterLabel) {
      const byOptions = options.find((o) => o.label === filterLabel);
      if (byOptions) {
        setSelectedId(String(byOptions.id));
        return;
      }
      const found = Object.entries(CATEGORY_NAME_MAP).find(
        ([, label]) => label === filterLabel
      );
      setSelectedId(found ? found[0] : "");
      return;
    }

    setSelectedId("");
  }, [location.search, options]);

  const handleNavigateWithParams = useCallback(
    (newParams: URLSearchParams) => {
      const qs = newParams.toString();
      navigate(qs ? `?${qs}` : initialRoute);
    },
    [navigate, initialRoute]
  );

  const handleSelect = (id: number) => {
    setSelectedId(String(id));
    setOpen(false);
    const newParams = new URLSearchParams(location.search);
    if (!id) {
      newParams.delete("keyword");
      newParams.delete("filter");
      handleNavigateWithParams(newParams);
      return;
    }
    const option = options.find((o) => o.id === id);
    const label = option
      ? option.id.toString()
      : getCategoryKoreanName(String(id));

    console.log("label", option, label);

    newParams.set("filter", "유형");
    newParams.set("keyword", label);
    handleNavigateWithParams(newParams);
  };

  const displayLabel = (() => {
    if (!selectedId) return "유형";
    if (/^\d+$/.test(selectedId)) {
      const opt = options.find((o) => String(o.id) === selectedId);
      if (opt) return opt.label;
      return "유형";
    } else {
      const staticLabel = CATEGORY_NAME_MAP[selectedId];
      if (staticLabel) return staticLabel;
      return getCategoryKoreanName(selectedId);
    }
  })();

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="pr-4 border rounded-xl border-gray-300 px-4 py-2 flex flex-row items-center gap-1 cursor-pointer bg-white"
      >
        {displayLabel}
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-mr-1.5"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-40 max-h-48 overflow-y-auto border border-gray-300 rounded-xl bg-white shadow-md z-10 scrollbar-hide">
          <div className="flex flex-col w-full text-center">
            <div
              onClick={() => {
                setSelectedId("");
                setOpen(false);
                const newParams = new URLSearchParams(location.search);
                newParams.delete("keyword");
                newParams.delete("filter");
                handleNavigateWithParams(newParams);
              }}
              className={`w-full px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                !selectedId ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              유형
            </div>

            {loading && <div className="px-4 py-2 text-sm">로딩중...</div>}
            {error && (
              <div className="px-4 py-2 text-sm text-red-600">
                카테고리 불러오기 실패
              </div>
            )}

            {!loading &&
              options.map(({ id, label }) => (
                <div
                  key={id}
                  onClick={() => handleSelect(id)}
                  className={`w-full px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    String(id) === selectedId ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  {label}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
