import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../redux/slices/filterSlice";

const Pagination = () => {
    const dispatch = useDispatch()
    const page = useSelector(state => state.filter.page)
    return (
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel='...'
                nextLabel='>'
                previousLabel='<'
                onPageChange={(e) => dispatch(setPage(e.selected + 1))}
                pageRangeDisplayed={3}
                pageCount={3}
                forcePage={page - 1}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;