import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../api/urls";
import api from "../../api/api";

const getTabelsStart = () => {
    return {
        type: actionTypes.GET_TABEL_START
    }
}

const getTabelsSuccess = (tabels) => {
    return {
        type: actionTypes.GET_TABEL_SUCCESS,
        tabels: tabels
    }
}

const getTabelsFail = (error) => {
    return {
        type: actionTypes.GET_TABEL_FAIL,
        error: error
    }
}

const getCellsStart = () => {
    return {
        type: actionTypes.GET_CELLS_START
    }
}

const getCellsSuccess = (cells) => {
    return {
        type: actionTypes.GET_CELLS_SUCCESS,
        cells: cells
    }
}

const getCellsFail = (error) => {
    return {
        type: actionTypes.GET_CELLS_FAIL,
        error: error
    }
}

const trySendCellsDataStart = () => {
    return {
        type: actionTypes.TRY_SEND_CELLS_START,
    }
}

const trySendCellsDataSuccess = (cells) => {
    return {
        type: actionTypes.TRY_SEND_CELLS_SUCCESS,
        cells: cells
    }
}

const trySendCellsDataFail = (error) => {
    return {
        type: actionTypes.TRY_SEND_CELLS_FAIL,
        error: error
    }
}

export const getTabels = (date_time) => {
    return dispatch => {
        dispatch(getTabelsStart());
        let url = getApiUrl() + 'tabel/'
        if (date_time) url += `?date_time=${date_time}`
        api.get(url).then(res => {
                dispatch(getTabelsSuccess(res.data));
            }
        ).catch(err => {
            dispatch(getTabelsFail(err));
        });
    }
}

export const tryGetCellsByTabel = (tabel_id) => {
    return dispatch => {
        dispatch(getCellsStart())
        let url = getApiUrl() + `tabel-cell/?tabel_id=${tabel_id}`
        api.get(url).then(res => {
                let cells = convertCells(res.data)
                dispatch(getCellsSuccess(cells))
            }
        ).catch(err => {
            dispatch(getCellsFail(err));
        })
    }
}

export const trySendCellsData = (cells, cro) => {
    return dispatch => {
        dispatch(trySendCellsDataStart())
        let url = getApiUrl() + "tabel-cell/set_hour_to_cell/"
        console.log(cro)
        if (cro) url = getApiUrl() + "tabel-cell/set_control_hours/"
        console.log(url)
        api.post(url, cells).then(res => {
            let cells = convertCells(res.data)
            dispatch(trySendCellsDataSuccess(cells))
        }).catch(err => {
            dispatch(trySendCellsDataFail(err))
        })
    }
}

const convertCells = (cells) => {
    let accountList = []
    let accountCells = {}
    cells.forEach(cell => {
        let tmpCell = {}
        Object.assign(tmpCell, cell)
        if (accountCells.username === tmpCell.account?.username) {
            delete tmpCell.account
            accountCells.cells.push(tmpCell)
        } else {
            if (accountCells.username) accountList.push(accountCells)
            accountCells = {}
            accountCells.username = tmpCell.account.username
            accountCells.employee_code = tmpCell.account.employee_code
            accountCells.full_name = tmpCell.account.full_name
            accountCells.post = tmpCell.account.post
            delete tmpCell.account
            accountCells.cells = [tmpCell]
        }
    })
    accountList.push(accountCells)
    return accountList
}