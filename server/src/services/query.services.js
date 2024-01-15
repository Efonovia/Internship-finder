const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 10;
const MAX_PAGE_LIMIT = 40;

export const getPagination = (query) => {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  let limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  if(limit > MAX_PAGE_LIMIT) limit = DEFAULT_PAGE_LIMIT
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
    page
  };
}

function getAmount(skip, limit, totalDocuments) {
  if ((totalDocuments - skip - limit) >= limit) {
    return limit
  } else return totalDocuments % limit
}

export const getPaginationResults = (page, limit, skip, totalDocuments) => {
  let results = {}
  if(page < 1) {
    results.previous = { page: null, amount: null }
    results.current = { page: null, amount: null }
    results.next = { page: 1, amount: limit }
  } else if(page == 1) {
    results.previous = { page: null, amount: null }
    results.current = { page: 1, amount: limit }
    results.next = { page: 2, amount: getAmount(skip, limit, totalDocuments) }
  } else if(page > Math.ceil(totalDocuments/limit)) {
    results.previous = { page: Math.ceil(totalDocuments/limit), amount: getAmount(skip, limit, totalDocuments) }
    results.current = { page: null, amount: null }
    results.next = { page: null, amount: null }
  } else if(page == Math.ceil(totalDocuments/limit)) {
      results.previous = { page: page-1, amount: limit }
      results.current = { page: page, amount: getAmount(skip, limit, totalDocuments) }
      results.next = { page: null, amount: null }
  } else {
    results.previous = { page: page-1, amount: limit }
    results.current = { page: page, amount: limit }
    results.next = { page: page+1, amount: getAmount(skip, limit, totalDocuments) }
  }

  return results
}