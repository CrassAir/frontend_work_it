import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../api/urls";
import api from "../../api/api";

const getTabelsStart = () => {
    return {
        type: actionTypes.GET_TABEL_START
    }
}

const getTabelsSuccess = (tabels) => {
    console.log(tabels)
    return {
        type: actionTypes.GET_TABEL_SUCCESS,
        tabels: tabels
    }
}

const getTabelsFail = (error) => {
    console.log(error)
    return {
        type: actionTypes.GET_TABEL_FAIL,
        error: error
    }
}

const trySendCellsDataSuccess = () => {
    console.log('send cells success')
}

const trySendCellsDataFail = (error) => {
    console.log(error)
}

export const getTabels = (date_time) => {
    return dispatch => {
        dispatch(getTabelsStart());
        let url = getApiUrl() + 'tabel/'
        if (date_time) url += `?date_time=${date_time}`
        api.get(url).then(res => {
                let tabels = []
                res.data.forEach(tabel => {
                    let accountList = []
                    let accountCells = {}
                    let tmpTabel = {}
                    Object.assign(tmpTabel, tabel)
                    tmpTabel.cells.forEach(cell => {
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
                    delete tmpTabel.cell
                    tmpTabel.cells = accountList
                    tabels.push(tmpTabel)
                })
                dispatch(getTabelsSuccess(tabels));
            }
        ).catch(err => {
            dispatch(getTabelsFail(err));
        });
    }
}

export const trySendCellsData = (cells) => {
    return dispatch => {
        api.post(getApiUrl() + "tabel-cell/set_hour_to_cell/", cells).then(res => {
            dispatch(trySendCellsDataSuccess())
        }).catch(err => {
            dispatch(trySendCellsDataFail(err))
        })
    }
}