import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPage,
  setPreviousPage,
  setNextPage,
} from "../service/globalPropsSlice";

const Pagination = () => {
  const { currentPage, previousPage, nextPage } = useSelector(
    (state) => state.globalProps
  );

  const dispatch = useDispatch();

  const handlePreviousPage = () => {
    if (previousPage !== null) {
      dispatch(setCurrentPage(previousPage));
      dispatch(setPreviousPage(previousPage - 1));
      dispatch(setNextPage(nextPage - 1));
    }
  };

  const handleNextPage = () => {
    if (nextPage !== null) {
      dispatch(setCurrentPage(nextPage));
      dispatch(setPreviousPage(previousPage + 1));
      dispatch(setNextPage(nextPage + 1));
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <nav aria-label="Pagination">
        <ul className="pagination">
          <li
            className={`page-item ${previousPage === null ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={handlePreviousPage}
              disabled={previousPage === null}
            >
              &lt; Previous
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">Page {currentPage}</span>
          </li>
          <li className={`page-item ${nextPage === null ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={handleNextPage}
              disabled={nextPage === null}
            >
              Next &gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
