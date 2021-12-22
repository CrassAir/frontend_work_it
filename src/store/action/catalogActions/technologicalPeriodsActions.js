import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../../api/urls";
import api from "../../../api/api";

const getTechnologicalPeriodsStart = () => {
    return {
        type: actionTypes.GET_TECHNOLOGICAL_PERIODS_START
    }
}

const getTechnologicalPeriodsSuccess = (technologicalPeriods) => {
    return {
        type: actionTypes.GET_TECHNOLOGICAL_PERIODS_SUCCESS,
        technologicalPeriods: technologicalPeriods
    }
}

const getTechnologicalPeriodsFail = (error) => {
    return {
        type: actionTypes.GET_TECHNOLOGICAL_PERIODS_FAIL,
        error: error
    }
}

const addTechnologicalPeriodStart = () => {
    return {
        type: actionTypes.ADD_TECHNOLOGICAL_PERIOD_START,
    }
}

const addTechnologicalPeriodSuccess = (technologicalPeriod) => {
    return {
        type: actionTypes.ADD_TECHNOLOGICAL_PERIOD_SUCCESS,
        technologicalPeriod: technologicalPeriod
    }
}

const addTechnologicalPeriodFail = (error) => {
    return {
        type: actionTypes.ADD_TECHNOLOGICAL_PERIOD_FAIL,
        error: error
    }
}

const editTechnologicalPeriodStart = () => {
    return {
        type: actionTypes.EDIT_TECHNOLOGICAL_PERIOD_START,
    }
}

const editTechnologicalPeriodSuccess = (technologicalPeriod) => {
    return {
        type: actionTypes.EDIT_TECHNOLOGICAL_PERIOD_SUCCESS,
        technologicalPeriod: technologicalPeriod
    }
}

const editTechnologicalPeriodFail = (error) => {
    return {
        type: actionTypes.EDIT_TECHNOLOGICAL_PERIOD_FAIL,
        error: error
    }
}

const deleteTechnologicalPeriodStart = () => {
    return {
        type: actionTypes.DELETE_TECHNOLOGICAL_PERIOD_START,
    }
}

const deleteTechnologicalPeriodSuccess = (technologicalPeriodId) => {
    return {
        type: actionTypes.DELETE_TECHNOLOGICAL_PERIOD_SUCCESS,
        technologicalPeriodId: technologicalPeriodId
    }
}

const deleteTechnologicalPeriodFail = (error) => {
    return {
        type: actionTypes.DELETE_TECHNOLOGICAL_PERIOD_FAIL,
        error: error
    }
}

export const getTechnologicalPeriods = () => {
    return dispatch => {
        dispatch(getTechnologicalPeriodsStart());
        api.get(getApiUrl() + 'technological-periods/').then(res => {
                dispatch(getTechnologicalPeriodsSuccess(res.data));
            }
        ).catch(err => {
            dispatch(getTechnologicalPeriodsFail(err));
        });
    }
}

export const addTechnologicalPeriod = (values) => {
    return dispatch => {
        dispatch(addTechnologicalPeriodStart());
        api.post(getApiUrl() + 'technological-periods/', values).then(res => {
                dispatch(addTechnologicalPeriodSuccess(res.data));
            }
        ).catch(err => {
            dispatch(addTechnologicalPeriodFail(err));
        });
    }
}

export const editTechnologicalPeriod = (id, values) => {
    return dispatch => {
        dispatch(editTechnologicalPeriodStart());
        api.patch(getApiUrl() + `technological-periods/${id}/`, values).then(res => {
                dispatch(editTechnologicalPeriodSuccess(res.data));
            }
        ).catch(err => {
            dispatch(editTechnologicalPeriodFail(err));
        });
    }
}

export const deleteTechnologicalPeriod = (id) => {
    return dispatch => {
        dispatch(deleteTechnologicalPeriodStart());
        api.delete(getApiUrl() + `technological-periods/${id}/`).then(res => {
                dispatch(deleteTechnologicalPeriodSuccess(id));
            }
        ).catch(err => {
            dispatch(deleteTechnologicalPeriodFail(err));
        });
    }
}