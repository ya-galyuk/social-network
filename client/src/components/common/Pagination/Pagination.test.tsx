import React from "react";
import {create} from "react-test-renderer"
import Pagination from "./Pagination";

describe("Pagination component", () => {
    test("page count id 11 but should be show only 10", () => {
        const component = create(
            <Pagination totalCount={11} pageSize={1} portionSize={10} currentPage={1} onPageClick={() => {}}/>)
        const root = component.root
        const span = root.findAllByType("span")
        expect(span.length).toBe(10)
    })
})