import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CATEGORY_NAME_MAP } from "@utils/category";

const FilterDropdown = ({ initialRoute }: { initialRoute: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const initialKeyword = params.get("keyword") || "";
  const initialFilterLabel = params.get("filter") || "";

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(() => {
    if (initialKeyword) return initialKeyword;
    if (initialFilterLabel) {
      const found = Object.entries(CATEGORY_NAME_MAP).find(
        ([, label]) => label === initialFilterLabel
      );
      return found ? found[0] : "";
    }
    return "";
  });

  const options = useMemo(() => Object.entries(CATEGORY_NAME_MAP), []);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const keyword = p.get("keyword") || "";
    const filterLabel = p.get("filter") || "";

    if (keyword) {
      setSelected(keyword);
      return;
    }

    if (filterLabel) {
      const found = Object.entries(CATEGORY_NAME_MAP).find(
        ([, label]) => label === filterLabel
      );
      setSelected(found ? found[0] : "");
      return;
    }

    setSelected("");
  }, [location.search]);

  const handleSelect = (slug: string) => {
    setSelected(slug);
    setOpen(false);

    const newParams = new URLSearchParams(location.search);
    console.log("select slug:", slug);
    if (!slug) {
      newParams.delete("keyword");
      newParams.delete("filter");
      navigate(initialRoute);
      return;
    }
    if (slug) {
      newParams.set("filter", "유형");
      newParams.set("keyword", slug);
    } else {
      newParams.delete("keyword");
      newParams.set("filter", "유형");
    }

    const qs = newParams.toString();
    console.log("qs:", qs);
    navigate(qs ? `?${qs}` : "");
  };

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="pr-4 border rounded-xl border-gray-300 px-4 py-2 flex flex-row items-center gap-1 cursor-pointer bg-white"
      >
        {selected ? CATEGORY_NAME_MAP[selected] : "유형"}
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
        <div className="absolute right-0 mt-2 w-24 max-h-40 overflow-y-auto border border-gray-300 rounded-xl bg-white shadow-md z-10 scrollbar-hide">
          <div className="flex flex-col w-full text-center">
            <div
              onClick={() => handleSelect("")}
              className={`w-full px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                !selected ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              유형
            </div>

            {options.map(([slug, label]) => (
              <div
                key={slug}
                onClick={() => handleSelect(slug)}
                className={`w-full px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  slug === selected ? "bg-gray-200 font-semibold" : ""
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
