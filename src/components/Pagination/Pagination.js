import React from 'react'

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pagePrev = () => {
    if (currentPage <= 1) return
    paginate(currentPage -= 1)
  }

  const pageNext = () => {
    if (currentPage >= pageNumbers.length) return
    paginate(currentPage += 1)
  }

  return (
    <>
      <div className="py-2">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            <li className="mr-2">
              <button onClick={pagePrev}
                className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-500 bg-white text-blue-500">
                <i className="fas fa-chevron-left -ml-px"></i>
              </button>
            </li>
            {
              pageNumbers.map((pageNumber, idx) => (
                <li key={idx} className="mr-2">
                  <button onClick={() => {
                    paginate(pageNumber);
                  }}
                    className={"first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-500 outline-none active:outline-none " + (currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-white text-blue-500")}>
                    {pageNumber}
                  </button>
                </li>
              ))
            }
            <li className="mr-2">
              <button onClick={pageNext}
                className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-500 bg-white text-blue-500">
                <i className="fas fa-chevron-right -mr-px"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Pagination
