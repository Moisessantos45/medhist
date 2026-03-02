import { useState, useRef, useEffect, type FC } from "react";
import { createPortal } from "react-dom";

export interface SelectOption {
  name: string;
  value: string;
}

interface SelectProps {
  list: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
  label?: string;
}

const Select: FC<SelectProps> = ({
  list,
  value,
  onChange,
  disabled = false,
  id,
  label,
}) => {
  const [isShow, setIsShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyles, setDropdownStyles] = useState<{
    top?: string;
    left?: string;
    width?: string;
    position?: "absolute";
  }>({});

  const selectedOption = list.find((item) => item.value === value) || {
    name: "Selecciona un valor",
    value: "",
  };

  const changeValue = (item: SelectOption) => {
    onChange(item.value);
    setIsShow(false);
  };

  useEffect(() => {
    if (isShow && buttonRef.current) {
      const updatePosition = () => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownStyles({
          top: `${rect.bottom + window.scrollY}px`,
          left: `${rect.left + window.scrollX}px`,
          width: `${rect.width}px`,
          position: "absolute",
        });
      };
      
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isShow]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <button
        ref={buttonRef}
        id={id}
        type="button"
        className="w-full bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between px-3 cursor-default h-[50px] text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        onClick={() => setIsShow(!isShow)}
        disabled={disabled}
      >
        <span className={selectedOption.value === "" ? "text-gray-400" : "text-gray-800"}>
          {selectedOption.name}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
            isShow ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isShow &&
        createPortal(
          <div
            ref={dropdownRef}
            className="z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mt-1"
            style={dropdownStyles}
          >
            <div className="max-h-40 overflow-y-auto custom-scrollbar-select">
              {list.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                    selectedOption.value === item.value
                      ? "bg-indigo-50 text-indigo-700 font-bold"
                      : "text-gray-700 hover:bg-indigo-50/50 focus:bg-indigo-50 focus:outline-none"
                  }`}
                  onClick={() => changeValue(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Select;
