import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../api/urls";
import api from "../../api/api";

const getGreenhousesStart = () => {
    return {
        type: actionTypes.GET_GREENHOUSES_START
    }
}

const getGreenhousesSuccess = (greenhouses) => {
    return {
        type: actionTypes.GET_GREENHOUSES_SUCCESS,
        greenhouses: greenhouses
    }
}

const getGreenhousesFail = (error) => {
    return {
        type: actionTypes.GET_GREENHOUSES_FAIL,
        error: error
    }
}

export const getGreenhouses = () => {
    return dispatch => {
        dispatch(getGreenhousesStart());
        api.get(getApiUrl() + "greenhouses/").then(res => {
                let greenhouses = res.data
                dispatch(getGreenhousesSuccess(greenhouses));
            }
        ).catch(err => {
            dispatch(getGreenhousesFail(err));
        });
    }
}