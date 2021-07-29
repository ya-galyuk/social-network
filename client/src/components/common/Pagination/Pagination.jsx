import React, {useState} from 'react';
import cls from "./Pagination.module.css";

const Pagination = (props) => {
        const {currentPage, totalCount, pageSize, onPageClick, portionSize = 3} = props
        const [portionNumber, setPortionNumber] = useState(1)
        const pagesCount = Math.ceil(totalCount / pageSize)

        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        const portionCount = Math.ceil(pagesCount / portionSize)
        const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
        const rightPortionPageNumber = portionNumber * portionSize
        const filteredPage = pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)

        return (
            <div className={cls.pagination}>
                {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>&#60;</button>}

                {filteredPage.map(page =>
                    <span key={page} className={currentPage === page ? cls.page_selected : undefined}
                          onClick={(e) => onPageClick(page)}>{page}</span>
                )}

                {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>&#62;</button>}
            </div>
        );
    }
;

export default Pagination;