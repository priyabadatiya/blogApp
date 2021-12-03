import React from "react";
import "../styles/style.css";

function Pagination(props) {
  let { articlesCount, articlesPerPage, activePage, updateCurrentPageIndex } =
    props;
  // console.log(articlesCount, articlesPerPage);
  let numberOfPages = Math.ceil(articlesCount / articlesPerPage);
  // console.log(numberOfPages);
  let pagesArray = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pagesArray.push(i);
  }
  return (
    <div className="container  space-x-24 ">
      <div className="pb-12 pt-6 flex justify-around">
        <div className="prev">
          <p
            onClick={() =>
              updateCurrentPageIndex(activePage - 1 < 1 ? 1 : activePage - 1)
            }
          >
            Prev
          </p>
        </div>
        <div className="pagination-count">
          {pagesArray.map((page) => {
            // console.log(page);
            return (
              <span
                key={page}
                onClick={() => updateCurrentPageIndex(page)}
                className={`${
                  activePage === page ? "active pages  " : "mx-2 "
                }`}
              >
                {page}
              </span>
            );
          })}
        </div>
        <div className="next">
          <button
            onClick={() =>
              updateCurrentPageIndex(
                activePage + 1 > numberOfPages ? numberOfPages : activePage + 1
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;