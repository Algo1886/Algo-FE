import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface DropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth)
    }
  }, [])
  
  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center rounded border border-gray-200 px-4 py-2 bg-white font-medium hover:bg-gray-100 focus:outline-none w-auto"
      >
        {selected}
        <svg
          className={clsx("ml-2 h-4 w-4 transition-transform", open && "rotate-180")}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4 4.7a.75.75 0 01-1.14 0l-4-4.7a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div
          style={{ width }}
          className="absolute mt-1 rounded border border-gray-200 bg-white z-50"
        >
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="block px-3 py-2 hover:bg-gray-100 w-full"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;