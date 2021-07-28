import React from 'react';
import cls from "./Pagination.module.css";

const Pagination = (props) => {
    const {currentPage, totalCount, pageSize, onPageClick} = props
    let pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={cls.pagination}>
            {pages.map(page => <span
                    key={page}
                    className={currentPage === page ? cls.page_selected : undefined}
                    onClick={(e) => onPageClick(page)}
                >{page}</span>
            )}
        </div>
    );
};

export default Pagination;