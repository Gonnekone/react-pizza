import React from 'react';
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import {useDispatch} from "react-redux";
import {setPageNumber} from "../../redux/filterSlice/slice.js";

function Pagination() {
    const dispatch = useDispatch();

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => dispatch(setPageNumber(e.selected+1))}
            pageRangeDisplayed={4}
            pageCount={3} // TODO: write normal backend
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;