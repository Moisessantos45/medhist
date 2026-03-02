interface Pagination {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

const initialPagination: Pagination = {
  page: 1,
  page_size: 10,
  total: 0,
  total_pages: 1,
};

export { initialPagination };
export type { Pagination };