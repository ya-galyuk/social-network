import React, {FC, useState} from 'react';
import cls from "./Pagination.module.css";

const Pagination: FC<PropsType> = (props) => {
    const {currentPage, totalCount, pageSize, onPageClick, portionSize = 3} = props
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const pagesCount: number = Math.ceil(totalCount / pageSize)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount: number = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber: number = portionNumber * portionSize
    const filteredPage: Array<number> = pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)

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

export default Pagination;

type PropsType = {
    currentPage: number
    totalCount: number
    pageSize: number
    onPageClick: (page: number) => void
    portionSize?: number
}