import * as actionTypes from "./action/actionTypes"
import {updateObject} from "./utils";

const initialState = {
    token: null,
    error: null,
    loading: false,
    user: null,
    greenhouse: null,
    tabels: null,
    cells: null,
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
        user: null
    })
}

const changePasswordStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        user: null,
    })
}

const changePasswordSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        user: action.user,
    })
}

const changePasswordFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        token: null
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

const getTabelStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        cells: null,
        tabels: null,
    })
}

const getTabelSuccess = (state, action) => {
    return updateObject(state, {
        tabels: action.tabels,
        loading: false,
    })
}

const getTabelFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const getCellsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const getCellsSuccess = (state, action) => {
    return updateObject(state, {
        cells: action.cells,
        loading: false,
    })
}

const getCellsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const trySendCellsStart = (state, action) => {
    return updateObject(state, {
        cells: null,
        error: null,
        loading: true,
    })
}

const trySendCellsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        cells: action.cells
    })
}

const trySendCellsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}


const reducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.CHANGE_PASSWORD_START:
            return changePasswordStart(state, action);
        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return changePasswordSuccess(state, action);
        case actionTypes.CHANGE_PASSWORD_FAIL:
            return changePasswordFail(state, action);
        case actionTypes.GET_GREENHOUSES_START:
            return getGreenhousesStart(state, action);
        case actionTypes.GET_GREENHOUSES_SUCCESS:
            return getGreenhousesSuccess(state, action);
        case actionTypes.GET_GREENHOUSES_FAIL:
            return getGreenhousesFail(state, action);
        case actionTypes.GET_TABEL_START:
            return getTabelStart(state, action);
        case actionTypes.GET_TABEL_SUCCESS:
            return getTabelSuccess(state, action);
        case actionTypes.GET_TABEL_FAIL:
            return getTabelFail(state, action);
        case actionTypes.GET_CELLS_START:
            return getCellsStart(state, action);
        case actionTypes.GET_CELLS_SUCCESS:
            return getCellsSuccess(state, action);
        case actionTypes.GET_CELLS_FAIL:
            return getCellsFail(state, action);
        case actionTypes.TRY_SEND_CELLS_START:
            return trySendCellsStart(state, action);
        case actionTypes.TRY_SEND_CELLS_SUCCESS:
            return trySendCellsSuccess(state, action);
        case actionTypes.TRY_SEND_CELLS_FAIL:
            return trySendCellsFail(state, action);
        default:
            return state;
    }
}

export default reducer;