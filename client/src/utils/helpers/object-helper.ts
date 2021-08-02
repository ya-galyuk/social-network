export const updateObjectInArray = (items: Array<any>, value: string, objPropName: string, newObjProps: any) => {
    return items.map((u: any): any => {
        if (u[objPropName] === value) {
            return {...u, ...newObjProps}
        }
        return u
    })
}