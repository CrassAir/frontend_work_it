import * as actionTypes from "./action/actionTypes"
import {updateObject} from "./utils";

const initialState = {
    token: null,
    error: null,
    loading: false,
    user: null,
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
        user: action.user,
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        token: null
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
    })
}

const getGreenhousesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const getGreenhousesSuccess = (state, action) => {
    return updateObject(state, {
        greenhouses: action.greenhouses,
        loading: false,
    })
}

const getGreenhousesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.GET_GREENHOUSES_START:
            return getGreenhousesStart(state, action);
        case actionTypes.GET_GREENHOUSES_SUCCESS:
            return getGreenhousesSuccess(state, action);
        case actionTypes.GET_GREENHOUSES_FAIL:
            return getGreenhousesFail(state, action);
        default:
            return state;
    }
}

export default reducer;