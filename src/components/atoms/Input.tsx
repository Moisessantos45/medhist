import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  required?: boolean;
}

const Input = ({
  label,
  id,
  required = false,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-2 pl-1">
        {label}
      </label>
      <input
        id={id}
        className={`w-full p-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium ${className}`.trim()}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;
