import { Link, type LinkProps } from "react-router";
import type { FC, ReactNode } from "react";

interface ReturnLinkProps extends LinkProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

const ReturnLink: FC<ReturnLinkProps> = ({
  children,
  className = "",
  title,
  ...props
}) => {
  return (
    <Link
      className={`inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-semibold transition-colors ${className}`.trim()}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      {children || title || "Volver"}
    </Link>
  );
};

export default ReturnLink;
