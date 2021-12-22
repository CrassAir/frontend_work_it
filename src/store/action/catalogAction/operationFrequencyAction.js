import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../../api/urls";
import api from "../../../api/api";

const getOperationsFrequencyStart = () => {
    return {
        type: actionTypes.GET_OPERATIONS_FREQUENCY_START
    }
}

const getOperationsFrequencySuccess = (operationsFrequency) => {
    return {
        type: actionTypes.GET_OPERATIONS_FREQUENCY_SUCCESS,
        operationsFrequency: operationsFrequency
    }
}

const getOperationsFrequencyFail = (error) => {
    return {
        type: actionTypes.GET_OPERATIONS_FREQUENCY_FAIL,
        error: error
    }
}

const addOperationFrequencyStart = () => {
    return {
        type: actionTypes.ADD_OPERATION_FREQUENCY_START,
    }
}

const addOperationFrequencySuccess = (operationFrequency) => {
    return {
        type: actionTypes.ADD_OPERATION_FREQUENCY_SUCCESS,
        operationFrequency: operationFrequency
    }
}

const addOperationFrequencyFail = (error) => {
    return {
        type: actionTypes.ADD_OPERATION_FREQUENCY_FAIL,
        error: error
    }
}

const editOperationFrequencyStart = () => {
    return {
        type: actionTypes.EDIT_OPERATION_FREQUENCY_START,
    }
}

const editOperationFrequencySuccess = (operationFrequency) => {
    return {
        type: actionTypes.EDIT_OPERATION_FREQUENCY_SUCCESS,
        operationFrequency: operationFrequency
    }
}

const editOperationFrequencyFail = (error) => {
    return {
        type: actionTypes.EDIT_OPERATION_FREQUENCY_FAIL,
        error: error
    }
}

const deleteOperationFrequencyStart = () => {
    return {
        type: actionTypes.DELETE_OPERATION_FREQUENCY_START,
    }
}

const deleteOperationFrequencySuccess = (operationFrequencyId) => {
    return {
        type: actionTypes.DELETE_OPERATION_FREQUENCY_SUCCESS,
        operationFrequencyId: operationFrequencyId
    }
}

const deleteOperationFrequencyFail = (error) => {
    return {
        type: actionTypes.DELETE_OPERATION_FREQUENCY_FAIL,
        error: error
    }
}

export const getOperationsFrequency = (id) => {
    return dispatch => {
        dispatch(getOperationsFrequencyStart());
        api.get(getApiUrl() + 'operation-frequency/').then(res => {
                dispatch(getOperationsFrequencySuccess(res.data));
            }
        ).catch(err => {
            dispatch(getOperationsFrequencyFail(err));
        });
    }
}

export const addOperationFrequency = (values) => {
    return dispatch => {
        dispatch(addOperationFrequencyStart());
        api.post(getApiUrl() + 'operation-frequency/', values).then(res => {
                dispatch(addOperationFrequencySuccess(res.data));
            }
        ).catch(err => {
            dispatch(addOperationFrequencyFail(err));
        });
    }
}

export const editOperationFrequency = (id, values) => {
    return dispatch => {
        dispatch(editOperationFrequencyStart());
        api.patch(getApiUrl() + `operation-frequency/${id}/`, values).then(res => {
                dispatch(editOperationFrequencySuccess(res.data));
            }
        ).catch(err => {
            dispatch(editOperationFrequencyFail(err));
        });
    }
}

export const deleteOperationFrequency = (id) => {
    return dispatch => {
        dispatch(deleteOperationFrequencyStart());
        api.delete(getApiUrl() + `operation-frequency/${id}/`).then(res => {
                dispatch(deleteOperationFrequencySuccess(id));
            }
        ).catch(err => {
            dispatch(deleteOperationFrequencyFail(err));
        });
    }
}