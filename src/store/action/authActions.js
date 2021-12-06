import {getApiUrl, getRestAuthUrl} from '../../api/urls'

import * as actionTypes from "./actionTypes";
import api from "../../api/api";
import axios from "axios";
import {useSnackbar} from "notistack";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, account) => {
    let acc = JSON.parse(account)
    api.interceptors.request.use(config => {
        config.headers["Authorization"] = `Token ${localStorage.getItem('token')}`;
        return config
    })
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: acc
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const changePasswordStart = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD_START
    }
}

export const changePasswordSuccess = (user) => {
    return {
        type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        user: user
    }
}

export const changePasswordFail = (error) => {
    return {
        type: actionTypes.CHANGE_PASSWORD_FAIL,
        error: error
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expirationDate');
        axios.post(getRestAuthUrl() + "logout/", {})
            .then(res => dispatch(authLogout()))
        // localStorage.clear()
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(getRestAuthUrl() + "login/", {
            username: username,
            password: password,
            source: 'frontend'
        },).then(res => {
                const token = res.data.key
                const account = JSON.stringify(res.data.account);
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('user', account)
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(authSuccess(token, account));
            }
        ).catch(err => {
            dispatch(authFail(err));
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token) {
            dispatch(authSuccess(token, user))
        } else if (token === undefined) {
            dispatch(logout());

            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {
        } else {
            dispatch(authFail())
        }
    }
}

export const changePassword = (username, password) => {
    return dispatch => {
        dispatch(changePasswordStart())
        api.post(getApiUrl() + `account/${username}/change_password/`, {password: password})
            .then(res => {
                console.log(res.data)
                dispatch(changePasswordSuccess(res.data))
            }).catch(err => dispatch(changePasswordFail(err)))
    }
}
