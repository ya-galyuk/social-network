export const updateObjectInArray = (items: Array<any>, itemId: any, objPropName: string, newObjProps: any) => {
    return items.map((u: any): any => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}