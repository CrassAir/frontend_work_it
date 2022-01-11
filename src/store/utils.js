export const updateObject = (oldObject, updateProp) => {
    return {
        ...oldObject,
        ...updateProp
    }
}

export const updateListById = (oldList, newElem) => {
    return [...oldList.map((val) => {
        if (val.id === newElem.id) return newElem
        return val
    })]
}

export const deleteListById = (oldList, deleteElemId) => {
    let newData = []
    oldList.forEach((val) => {
        if (val.id !== deleteElemId) newData.push(val)
    })
    return [...newData]
}