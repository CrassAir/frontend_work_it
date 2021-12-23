import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../../api/urls";
import api from "../../../api/api";

const getTechnologicalOperationsStart = () => {
    return {
        type: actionTypes.GET_TECHNOLOGICAL_OPERATIONS_START
    }
}

const getTechnologicalOperationsSuccess = (technologicalOperations) => {
    return {
        type: actionTypes.GET_TECHNOLOGICAL_OPERATIONS_SUCCESS,
        technologicalOperations: technologicalOperations
    }
}

const getTechnologicalOperationsFail = (error) => {
    return {
        type: actionTypes.GET_TECHNOLOGICAL_OPERATIONS_FAIL,
        error: error
    }
}

const addTechnologicalOperationStart = () => {
    return {
        type: actionTypes.ADD_TECHNOLOGICAL_OPERATION_START,
    }
}

const addTechnologicalOperationSuccess = (technologicalOperation) => {
    return {
        type: actionTypes.ADD_TECHNOLOGICAL_OPERATION_SUCCESS,
        technologicalOperation: technologicalOperation
    }
}

const addTechnologicalOperationFail = (error) => {
    return {
        type: actionTypes.ADD_TECHNOLOGICAL_OPERATION_FAIL,
        error: error
    }
}

const editTechnologicalOperationStart = () => {
    return {
        type: actionTypes.EDIT_TECHNOLOGICAL_OPERATION_START,
    }
}

const editTechnologicalOperationSuccess = (technologicalOperation) => {
    return {
        type: actionTypes.EDIT_TECHNOLOGICAL_OPERATION_SUCCESS,
        technologicalOperation: technologicalOperation
    }
}

const editTechnologicalOperationFail = (error) => {
    return {
        type: actionTypes.EDIT_TECHNOLOGICAL_OPERATION_FAIL,
        error: error
    }
}

const deleteTechnologicalOperationStart = () => {
    return {
        type: actionTypes.DELETE_TECHNOLOGICAL_OPERATION_START,
    }
}

const deleteTechnologicalOperationSuccess = (technologicalOperationId) => {
    return {
        type: actionTypes.DELETE_TECHNOLOGICAL_OPERATION_SUCCESS,
        technologicalOperationId: technologicalOperationId
    }
}

const deleteTechnologicalOperationFail = (error) => {
    return {
        type: actionTypes.DELETE_TECHNOLOGICAL_OPERATION_FAIL,
        error: error
    }
}

export const getTechnologicalOperations = () => {
    return dispatch => {
        dispatch(getTechnologicalOperationsStart());
        api.get(getApiUrl() + 'technological-operations/').then(res => {
                dispatch(getTechnologicalOperationsSuccess(res.data));
            }
        ).catch(err => {
            dispatch(getTechnologicalOperationsFail(err));
        });
    }
}

export const addTechnologicalOperation = (values) => {
    return dispatch => {
        dispatch(addTechnologicalOperationStart());
        api.post(getApiUrl() + 'technological-operations/', values).then(res => {
                dispatch(addTechnologicalOperationSuccess(res.data));
            }
        ).catch(err => {
            dispatch(addTechnologicalOperationFail(err));
        });
    }
}

export const editTechnologicalOperation = (id, values) => {
    return dispatch => {
        dispatch(editTechnologicalOperationStart());
        api.patch(getApiUrl() + `technological-operations/${id}/`, values).then(res => {
                dispatch(editTechnologicalOperationSuccess(res.data));
            }
        ).catch(err => {
            dispatch(editTechnologicalOperationFail(err));
        });
    }
}

export const deleteTechnologicalOperation = (id) => {
    return dispatch => {
        dispatch(deleteTechnologicalOperationStart());
        api.delete(getApiUrl() + `technological-operations/${id}/`).then(res => {
                dispatch(deleteTechnologicalOperationSuccess(id));
            }
        ).catch(err => {
            dispatch(deleteTechnologicalOperationFail(err));
        });
    }
}