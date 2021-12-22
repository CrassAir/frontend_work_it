import * as actionTypes from "./action/actionTypes"
import {updateObject} from "./utils";
import * as catalogActionTypes from "./action/catalogActions/actionTypes";

const initialState = {
    token: null,
    error: null,
    loading: false,
    user: null,
    greenhouses: null,
    crops: null,
    hybrids: null,
    tabels: null,
    cells: null,
    operationsCategory: null,
    operationsFrequency: null,
    technologicalPeriods: null,
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

//<editor-fold desc="Catalog">

//Crops
const getCropsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const getCropsSuccess = (state, action) => {
    return updateObject(state, {
        crops: action.crops,
        loading: false,
    })
}

const getCropsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//Hybrids
const getHybridsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const getHybridsSuccess = (state, action) => {
    return updateObject(state, {
        hybrids: action.hybrids,
        loading: false,
    })
}

const getHybridsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//<editor-fold defaultstate="collapsed" desc="OperationsCategory">

const getOperationsCategoryStart = (state, action) => {
    return updateObject(state, {
        operationsCategory: null,
        error: null,
        loading: true,
    })
}

const getOperationsCategorySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        operationsCategory: action.operationsCategory
    })
}

const getOperationsCategoryFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const addOperationCategoryStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const addOperationCategorySuccess = (state, action) => {
    return updateObject(state, {
        operationsCategory: [...state.operationsCategory, action.operationCategory],
        loading: false,
    })
}

const addOperationCategoryFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const editOperationCategoryStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const editOperationCategorySuccess = (state, action) => {
    let newData = []
    state.operationsCategory.forEach((val) => {
        if (val.id === action.operationCategory.id) newData.push(action.operationCategory)
        else newData.push(val)
    })
    return updateObject(state, {
        operationsCategory: [...newData],
        loading: false,
    })
}

const editOperationCategoryFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const deleteOperationCategoryStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const deleteOperationCategorySuccess = (state, action) => {
    let newData = []
    state.operationsCategory.forEach((val) => {
        if (val.id !== action.operationCategoryId) newData.push(val)
    })
    return updateObject(state, {
        operationsCategory: [...newData],
        loading: false,
    })
}

const deleteOperationCategoryFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="OperationsFrequency">

const getOperationsFrequencyStart = (state, action) => {
    return updateObject(state, {
        operationsFrequency: null,
        error: null,
        loading: true,
    })
}

const getOperationsFrequencySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        operationsFrequency: action.operationsFrequency
    })
}

const getOperationsFrequencyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const addOperationFrequencyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const addOperationFrequencySuccess = (state, action) => {
    return updateObject(state, {
        operationsFrequency: [...state.operationsFrequency, action.operationFrequency],
        loading: false,
    })
}

const addOperationFrequencyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const editOperationFrequencyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const editOperationFrequencySuccess = (state, action) => {
    let newData = []
    state.operationsFrequency.forEach((val) => {
        if (val.id === action.operationFrequency.id) newData.push(action.operationFrequency)
        else newData.push(val)
    })
    return updateObject(state, {
        operationsFrequency: [...newData],
        loading: false,
    })
}

const editOperationFrequencyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const deleteOperationFrequencyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const deleteOperationFrequencySuccess = (state, action) => {
    let newData = []
    state.operationsFrequency.forEach((val) => {
        if (val.id !== action.operationFrequencyId) newData.push(val)
    })
    return updateObject(state, {
        operationsFrequency: [...newData],
        loading: false,
    })
}

const deleteOperationFrequencyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="TechnologicalPeriod">

const getTechnologicalPeriodsStart = (state, action) => {
    return updateObject(state, {
        technologicalPeriods: null,
        error: null,
        loading: true,
    })
}

const getTechnologicalPeriodsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        technologicalPeriods: action.technologicalPeriods
    })
}

const getTechnologicalPeriodsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const addTechnologicalPeriodStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const addTechnologicalPeriodSuccess = (state, action) => {
    return updateObject(state, {
        technologicalPeriods: [...state.technologicalPeriods, action.technologicalPeriod],
        loading: false,
    })
}

const addTechnologicalPeriodFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const editTechnologicalPeriodStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const editTechnologicalPeriodSuccess = (state, action) => {
    let newData = []
    state.technologicalPeriods.forEach((val) => {
        if (val.id === action.technologicalPeriod.id) newData.push(action.technologicalPeriod)
        else newData.push(val)
    })
    return updateObject(state, {
        technologicalPeriods: [...newData],
        loading: false,
    })
}

const editTechnologicalPeriodFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const deleteTechnologicalPeriodStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const deleteTechnologicalPeriodSuccess = (state, action) => {
    let newData = []
    state.technologicalPeriods.forEach((val) => {
        if (val.id !== action.technologicalPeriodId) newData.push(val)
    })
    return updateObject(state, {
        technologicalPeriods: [...newData],
        loading: false,
    })
}

const deleteTechnologicalPeriodFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//</editor-fold>

//</editor-fold >

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

// <editor-fold desc="Catalog">

        //Crops
        case catalogActionTypes.GET_CROPS_START:
            return getCropsStart(state, action);
        case catalogActionTypes.GET_CROPS_SUCCESS:
            return getCropsSuccess(state, action);
        case catalogActionTypes.GET_CROPS_FAIL:
            return getCropsFail(state, action);

        //Hybrids
        case catalogActionTypes.GET_HYBRIDS_START:
            return getHybridsStart(state, action);
        case catalogActionTypes.GET_HYBRIDS_SUCCESS:
            return getHybridsSuccess(state, action);
        case catalogActionTypes.GET_HYBRIDS_FAIL:
            return getHybridsFail(state, action);

        //<editor-fold defaultstate="collapsed" desc="OperationsCategory">

        case catalogActionTypes.GET_OPERATIONS_CATEGORY_START:
            return getOperationsCategoryStart(state, action);
        case catalogActionTypes.GET_OPERATIONS_CATEGORY_SUCCESS:
            return getOperationsCategorySuccess(state, action);
        case catalogActionTypes.GET_OPERATIONS_CATEGORY_FAIL:
            return getOperationsCategoryFail(state, action);
        case catalogActionTypes.ADD_OPERATION_CATEGORY_START:
            return addOperationCategoryStart(state, action);
        case catalogActionTypes.ADD_OPERATION_CATEGORY_SUCCESS:
            return addOperationCategorySuccess(state, action);
        case catalogActionTypes.ADD_OPERATION_CATEGORY_FAIL:
            return addOperationCategoryFail(state, action);
        case catalogActionTypes.EDIT_OPERATION_CATEGORY_START:
            return editOperationCategoryStart(state, action);
        case catalogActionTypes.EDIT_OPERATION_CATEGORY_SUCCESS:
            return editOperationCategorySuccess(state, action);
        case catalogActionTypes.EDIT_OPERATION_CATEGORY_FAIL:
            return editOperationCategoryFail(state, action);
        case catalogActionTypes.DELETE_OPERATION_CATEGORY_START:
            return deleteOperationCategoryStart(state, action);
        case catalogActionTypes.DELETE_OPERATION_CATEGORY_SUCCESS:
            return deleteOperationCategorySuccess(state, action);
        case catalogActionTypes.DELETE_OPERATION_CATEGORY_FAIL:
            return deleteOperationCategoryFail(state, action);

        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="OperationsFrequency">

        case catalogActionTypes.GET_OPERATIONS_FREQUENCY_START:
            return getOperationsFrequencyStart(state, action);
        case catalogActionTypes.GET_OPERATIONS_FREQUENCY_SUCCESS:
            return getOperationsFrequencySuccess(state, action);
        case catalogActionTypes.GET_OPERATIONS_FREQUENCY_FAIL:
            return getOperationsFrequencyFail(state, action);
        case catalogActionTypes.ADD_OPERATION_FREQUENCY_START:
            return addOperationFrequencyStart(state, action);
        case catalogActionTypes.ADD_OPERATION_FREQUENCY_SUCCESS:
            return addOperationFrequencySuccess(state, action);
        case catalogActionTypes.ADD_OPERATION_FREQUENCY_FAIL:
            return addOperationFrequencyFail(state, action);
        case catalogActionTypes.EDIT_OPERATION_FREQUENCY_START:
            return editOperationFrequencyStart(state, action);
        case catalogActionTypes.EDIT_OPERATION_FREQUENCY_SUCCESS:
            return editOperationFrequencySuccess(state, action);
        case catalogActionTypes.EDIT_OPERATION_FREQUENCY_FAIL:
            return editOperationFrequencyFail(state, action);
        case catalogActionTypes.DELETE_OPERATION_FREQUENCY_START:
            return deleteOperationFrequencyStart(state, action);
        case catalogActionTypes.DELETE_OPERATION_FREQUENCY_SUCCESS:
            return deleteOperationFrequencySuccess(state, action);
        case catalogActionTypes.DELETE_OPERATION_FREQUENCY_FAIL:
            return deleteOperationFrequencyFail(state, action);

        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="TechnologicalPeriod">

        case catalogActionTypes.GET_TECHNOLOGICAL_PERIODS_START:
            return getTechnologicalPeriodsStart(state, action);
        case catalogActionTypes.GET_TECHNOLOGICAL_PERIODS_SUCCESS:
            return getTechnologicalPeriodsSuccess(state, action);
        case catalogActionTypes.GET_TECHNOLOGICAL_PERIODS_FAIL:
            return getTechnologicalPeriodsFail(state, action);
        case catalogActionTypes.ADD_TECHNOLOGICAL_PERIOD_START:
            return addTechnologicalPeriodStart(state, action);
        case catalogActionTypes.ADD_TECHNOLOGICAL_PERIOD_SUCCESS:
            return addTechnologicalPeriodSuccess(state, action);
        case catalogActionTypes.ADD_TECHNOLOGICAL_PERIOD_FAIL:
            return addTechnologicalPeriodFail(state, action);
        case catalogActionTypes.EDIT_TECHNOLOGICAL_PERIOD_START:
            return editTechnologicalPeriodStart(state, action);
        case catalogActionTypes.EDIT_TECHNOLOGICAL_PERIOD_SUCCESS:
            return editTechnologicalPeriodSuccess(state, action);
        case catalogActionTypes.EDIT_TECHNOLOGICAL_PERIOD_FAIL:
            return editTechnologicalPeriodFail(state, action);
        case catalogActionTypes.DELETE_TECHNOLOGICAL_PERIOD_START:
            return deleteTechnologicalPeriodStart(state, action);
        case catalogActionTypes.DELETE_TECHNOLOGICAL_PERIOD_SUCCESS:
            return deleteTechnologicalPeriodSuccess(state, action);
        case catalogActionTypes.DELETE_TECHNOLOGICAL_PERIOD_FAIL:
            return deleteTechnologicalPeriodFail(state, action);

        //</editor-fold>

//</editor-fold>
        default:
            return state;
    }
}

export default reducer;