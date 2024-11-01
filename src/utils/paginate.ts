// paginate([1, 2, 3, 4, 5, 6], 2, 2); [3, 4]
// paginate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4, 1); [1,2,3,4]

const PAGE_SIZE = 10

function paginate(array: string[], page_number: number, page_size = PAGE_SIZE) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size)
}

function getPageNumber(index: number) {
  return Math.ceil((index + 1) / PAGE_SIZE)
}

export { paginate, getPageNumber }
