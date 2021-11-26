import {getRestAuthUrl} from '../../api/urls'

import * as actionTypes from "./actionTypes";
import api from "../../api/api";
import axios from "axios";

export const authStart = () => {
    console.log(actionTypes.AUTH_START)
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, account) => {
    console.log(actionTypes.AUTH_SUCCESS)
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
    console.log(actionTypes.AUTH_FAIL)
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    console.log(actionTypes.AUTH_LOGOUT)
    return {
        type: actionTypes.AUTH_LOGOUT
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
    console.log(username, password)
    return dispatch => {
        dispatch(authStart());
        axios.post(getRestAuthUrl() + "login/", {
            username: username,
            password: password
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
