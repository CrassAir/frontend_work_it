export const updateObject = (oldObject, updateProp) => {
    return {
        ...oldObject,
        ...updateProp
    }
}