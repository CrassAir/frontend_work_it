import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../api/urls";
import api from "../../api/api";


const tryGetUsersStart = () => {
    return {
        type: actionTypes.GET_USERS_START
    }
}

const tryGetUsersSuccess = (users) => {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        users: users
    }
}

const tryGetUsersFail = (error) => {
    return {
        type: actionTypes.GET_USERS_FAIL,
        error: error
    }
}

export const tryGetUsers = () => {
    return dispatch => {
        dispatch(tryGetUsersStart());
        api.get(getApiUrl() + 'account/').then(res => {
                dispatch(tryGetUsersSuccess(res.data));
            }
        ).catch(err => {
            dispatch(tryGetUsersFail(err));
        });
    }
}