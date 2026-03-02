import type { Pagination } from "@/entities/pagination";

const getNumber = (value: unknown, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const mapPagination = (data: Record<string, unknown>):Pagination => {
  return {
    page: getNumber(data.page, 1),
    page_size: getNumber(data.pageSize, 10),
    total: getNumber(data.total, 0),
    total_pages: getNumber(data.totalPages, 1),
  };
};

export { mapPagination };
