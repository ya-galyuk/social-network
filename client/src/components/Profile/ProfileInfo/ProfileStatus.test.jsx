import React from "react";
import {create} from "react-test-renderer"
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {

    test("after creation <span> should appear", () => {
        const component = create(<ProfileStatus status={"status message"}/>)
        const root = component.root
        const span = root.findByType("span")
        expect(span).not.toBeNull()
    })

    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status={"status message"}/>)
        const root = component.root
        const span = root.findByType("span")
        expect(span.children[0]).toBe("status message")
    })

    test("after creation <input> shouldn't appear", () => {
        const component = create(<ProfileStatus status={"status message"}/>)
        const root = component.root
        expect(() => {
            const input = root.findByType("input")
        }).toThrow()
    })

    test("<input> should appear in editMode instead of <span>", () => {
        const component = create(<ProfileStatus status={"status message"}/>)
        const root = component.root
        const span = root.findByType("span")
        span.props.onDoubleClick()
        const input = root.findByType("input")
        expect(input.props.value).toBe("status message")
    })
})
