import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../../api/urls";
import api from "../../../api/api";

const getOperationalStandardsStart = () => {
    return {
        type: actionTypes.GET_OPERATION_STANDARDS_START
    }
}

const getOperationalStandardsSuccess = (operationalStandards) => {
    return {
        type: actionTypes.GET_OPERATION_STANDARDS_SUCCESS,
        operationalStandards: operationalStandards
    }
}

const getOperationalStandardsFail = (error) => {
    return {
        type: actionTypes.GET_OPERATION_STANDARDS_FAIL,
        error: error
    }
}

const addOperationalStandardStart = () => {
    return {
        type: actionTypes.ADD_OPERATION_STANDARD_START,
    }
}

const addOperationalStandardSuccess = (operationalStandard) => {
    return {
        type: actionTypes.ADD_OPERATION_STANDARD_SUCCESS,
        operationalStandard: operationalStandard
    }
}

const addOperationalStandardFail = (error) => {
    return {
        type: actionTypes.ADD_OPERATION_STANDARD_FAIL,
        error: error
    }
}

const editOperationalStandardStart = () => {
    return {
        type: actionTypes.EDIT_OPERATION_STANDARD_START,
    }
}

const editOperationalStandardSuccess = (operationalStandard) => {
    return {
        type: actionTypes.EDIT_OPERATION_STANDARD_SUCCESS,
        operationalStandard: operationalStandard
    }
}

const editOperationalStandardFail = (error) => {
    return {
        type: actionTypes.EDIT_OPERATION_STANDARD_FAIL,
        error: error
    }
}

const deleteOperationalStandardStart = () => {
    return {
        type: actionTypes.DELETE_OPERATION_STANDARD_START,
    }
}

const deleteOperationalStandardSuccess = (operationalStandardId) => {
    return {
        type: actionTypes.DELETE_OPERATION_STANDARD_SUCCESS,
        operationalStandardId: operationalStandardId
    }
}

const deleteOperationalStandardFail = (error) => {
    return {
        type: actionTypes.DELETE_OPERATION_STANDARD_FAIL,
        error: error
    }
}

export const getOperationalStandards = () => {
    return dispatch => {
        dispatch(getOperationalStandardsStart());
        api.get(getApiUrl() + 'operational-standards/').then(res => {
                dispatch(getOperationalStandardsSuccess(res.data));
            }
        ).catch(err => {
            dispatch(getOperationalStandardsFail(err));
        });
    }
}

export const addOperationalStandard = (values) => {
    return dispatch => {
        dispatch(addOperationalStandardStart());
        api.post(getApiUrl() + 'operational-standards/', values).then(res => {
                dispatch(addOperationalStandardSuccess(res.data));
            }
        ).catch(err => {
            dispatch(addOperationalStandardFail(err));
        });
    }
}

export const editOperationalStandard = (id, values) => {
    return dispatch => {
        dispatch(editOperationalStandardStart());
        api.patch(getApiUrl() + `operational-standards/${id}/`, values).then(res => {
                dispatch(editOperationalStandardSuccess(res.data));
            }
        ).catch(err => {
            dispatch(editOperationalStandardFail(err));
        });
    }
}

export const deleteOperationalStandard = (id) => {
    return dispatch => {
        dispatch(deleteOperationalStandardStart());
        api.delete(getApiUrl() + `operational-standards/${id}/`).then(res => {
                dispatch(deleteOperationalStandardSuccess(id));
            }
        ).catch(err => {
            dispatch(deleteOperationalStandardFail(err));
        });
    }
}