import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../../api/urls";
import api from "../../../api/api";

const getOperationsCategoryStart = () => {
    return {
        type: actionTypes.GET_OPERATIONS_CATEGORY_START
    }
}

const getOperationsCategorySuccess = (operationsCategory) => {
    return {
        type: actionTypes.GET_OPERATIONS_CATEGORY_SUCCESS,
        operationsCategory: operationsCategory
    }
}

const getOperationsCategoryFail = (error) => {
    return {
        type: actionTypes.GET_OPERATIONS_CATEGORY_FAIL,
        error: error
    }
}

const addOperationCategoryStart = () => {
    return {
        type: actionTypes.ADD_OPERATION_CATEGORY_START,
    }
}

const addOperationCategorySuccess = (operationCategory) => {
    return {
        type: actionTypes.ADD_OPERATION_CATEGORY_SUCCESS,
        operationCategory: operationCategory
    }
}

const addOperationCategoryFail = (error) => {
    return {
        type: actionTypes.ADD_OPERATION_CATEGORY_FAIL,
        error: error
    }
}

const editOperationCategoryStart = () => {
    return {
        type: actionTypes.EDIT_OPERATION_CATEGORY_START,
    }
}

const editOperationCategorySuccess = (operationCategory) => {
    return {
        type: actionTypes.EDIT_OPERATION_CATEGORY_SUCCESS,
        operationCategory: operationCategory
    }
}

const editOperationCategoryFail = (error) => {
    return {
        type: actionTypes.EDIT_OPERATION_CATEGORY_FAIL,
        error: error
    }
}

const deleteOperationCategoryStart = () => {
    return {
        type: actionTypes.DELETE_OPERATION_CATEGORY_START,
    }
}

const deleteOperationCategorySuccess = (operationCategoryId) => {
    return {
        type: actionTypes.DELETE_OPERATION_CATEGORY_SUCCESS,
        operationCategoryId: operationCategoryId
    }
}

const deleteOperationCategoryFail = (error) => {
    return {
        type: actionTypes.DELETE_OPERATION_CATEGORY_FAIL,
        error: error
    }
}

export const getOperationsCategory = (id) => {
    return dispatch => {
        dispatch(getOperationsCategoryStart());
        api.get(getApiUrl() + 'operation-category/').then(res => {
                dispatch(getOperationsCategorySuccess(res.data));
            }
        ).catch(err => {
            dispatch(getOperationsCategoryFail(err));
        });
    }
}

export const addOperationCategory = (values) => {
    return dispatch => {
        dispatch(addOperationCategoryStart());
        api.post(getApiUrl() + 'operation-category/', values).then(res => {
                dispatch(addOperationCategorySuccess(res.data));
            }
        ).catch(err => {
            dispatch(addOperationCategoryFail(err));
        });
    }
}

export const editOperationCategory = (id, values) => {
    return dispatch => {
        dispatch(editOperationCategoryStart());
        api.patch(getApiUrl() + `operation-category/${id}/`, values).then(res => {
                dispatch(editOperationCategorySuccess(res.data));
            }
        ).catch(err => {
            dispatch(editOperationCategoryFail(err));
        });
    }
}

export const deleteOperationCategory = (id) => {
    return dispatch => {
        dispatch(deleteOperationCategoryStart());
        api.delete(getApiUrl() + `operation-category/${id}/`).then(res => {
                dispatch(deleteOperationCategorySuccess(id));
            }
        ).catch(err => {
            dispatch(deleteOperationCategoryFail(err));
        });
    }
}