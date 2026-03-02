import type { FC } from "react";

export interface AlertProps {
  error: boolean;
  msg: string;
}

const Alert: FC<AlertProps> = ({ error, msg }) => {
  return (
    <div
      className={`${
        error
          ? "bg-red-50 text-red-600 border-red-200"
          : "bg-emerald-50 text-emerald-700 border-emerald-200"
      } text-center p-3 rounded-lg border uppercase font-bold text-xs tracking-wider mb-6`}
    >
      {msg}
    </div>
  );
};

export default Alert;
