import type { Pagination } from "@/entities/pagination";

interface PaginationProps {
  pagination: Pagination;
  onPageChange?: (page: number) => void;
}

const PageNavigator = ({ pagination, onPageChange }: PaginationProps) => {
  return (
    <div className="pt-4 mt-2 border-t border-slate-200 flex justify-between items-center px-2 pb-4">
      <button
        onClick={() => onPageChange && onPageChange(pagination.page - 1)}
        disabled={pagination.page <= 1}
        className={`
                  px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center
                  ${pagination.page <= 1 ? "bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 shadow-sm"}
                `}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Anterior
      </button>

      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Página <span className="text-slate-800">{pagination.page}</span> de{" "}
        <span className="text-slate-800">{pagination.total_pages}</span>
      </div>

      <button
        onClick={() => onPageChange && onPageChange(pagination.page + 1)}
        disabled={pagination.page >= pagination.total_pages}
        className={`
                  px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center
                  ${pagination.page >= pagination.total_pages ? "bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 shadow-sm"}
                `}
      >
        Siguiente
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default PageNavigator;
