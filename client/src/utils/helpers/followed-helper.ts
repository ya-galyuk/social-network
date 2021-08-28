export const convertToBoolOrNull = (followed: boolean | string | null) => {
    if (typeof followed === 'string') {
        return followed === "true" ? true : followed === "false" ? false : null
    }
    return null
}