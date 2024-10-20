"use client"
import { useMemo } from "react";

export default function Pagination({ page, setPage, totalItemCount }) {
  const pageNo = useMemo(() => Math.floor(totalItemCount / 10), [totalItemCount]);

  return totalItemCount > 10 ?
    <nav aria-label="Page navigation example" className="py-4 flex-center bg-white table-pagination">
      <ul className="pagination gap-2">
        <li className="page-item">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="page-link"
            aria-label="Previous">
            <span aria-hidden="true">&lt;</span>
          </button>
        </li>
        {
          Array.from({ length: pageNo }).map((el, i) => (
            <li key={i} className="page-item">
              <button
                onClick={() => setPage(i + 1)}
                className={`page-link ${i + 1 === page ? "active" : null}`}>{i + 1}
              </button>
            </li>
          ))
        }

        <li className="page-item">
          <button
            disabled={page === pageNo}
            onClick={() => setPage(page + 1)}
            className="page-link"
            aria-label="Next">
            <span aria-hidden="true">&gt;</span>
          </button>
        </li>
      </ul>
    </nav>
  : null
}