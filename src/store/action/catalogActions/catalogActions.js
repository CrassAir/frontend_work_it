import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../../api/urls";
import api from "../../../api/api";

const getCropsStart = () => {
    return {
        type: actionTypes.GET_CROPS_START
    }
}

const getCropsSuccess = (crops) => {
    return {
        type: actionTypes.GET_CROPS_SUCCESS,
        crops: crops
    }
}

const getCropsFail = (error) => {
    return {
        type: actionTypes.GET_CROPS_FAIL,
        error: error
    }
}

const getHybridsStart = () => {
    return {
        type: actionTypes.GET_HYBRIDS_START
    }
}

const getHybridsSuccess = (hybrids) => {
    return {
        type: actionTypes.GET_HYBRIDS_SUCCESS,
        hybrids: hybrids
    }
}

const getHybridsFail = (error) => {
    return {
        type: actionTypes.GET_HYBRIDS_FAIL,
        error: error
    }
}

const getVegetationPhasesStart = () => {
    return {
        type: actionTypes.GET_VEGETATION_PHASES_START
    }
}

const getVegetationPhasesSuccess = (vegetationPhases) => {
    return {
        type: actionTypes.GET_VEGETATION_PHASES_SUCCESS,
        vegetationPhases: vegetationPhases
    }
}

const getVegetationPhasesFail = (error) => {
    return {
        type: actionTypes.GET_VEGETATION_PHASES_FAIL,
        error: error
    }
}

export const getCrops = () => {
    return dispatch => {
        dispatch(getCropsStart());
        api.get(getApiUrl() + 'crops/').then(res => {
                dispatch(getCropsSuccess(res.data))
            }
        ).catch(err => {
            dispatch(getCropsFail(err))
        })
    }
}

export const getHybrids = () => {
    return dispatch => {
        dispatch(getHybridsStart());
        api.get(getApiUrl() + 'hybrid/').then(res => {
                dispatch(getHybridsSuccess(res.data))
            }
        ).catch(err => {
            dispatch(getHybridsFail(err))
        })
    }
}

export const getVegetationPhases = () => {
    return dispatch => {
        dispatch(getVegetationPhasesStart());
        api.get(getApiUrl() + 'vegetationphase/').then(res => {
                dispatch(getVegetationPhasesSuccess(res.data))
            }
        ).catch(err => {
            dispatch(getVegetationPhasesFail(err))
        })
    }
}