import * as actionTypes from "./action/actionTypes"
import {deleteListById, updateListById, updateObject} from "./utils";
import * as catalogActionTypes from "./action/catalogActions/actionTypes";

const initialState = {
    token: null,
    error: null,
    loading: false,
    user: null,
    users: null,
    greenhouses: null,
    crops: null,
    hybrids: null,
    tabels: null,
    cells: null,
    upendCells: null,
    operationsCategory: null,
    operationsFrequency: null,
    technologicalPeriods: null,
    operationalStandards: null,
    technologicalOperations: null,
    products: null,
    orders: null,
    orderProducts: null,
}

//<editor-fold defaultstate="collapsed" desc="Account">

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

const getUsersStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const getUsersSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users,
        error: null,
        loading: false,
    })
}

const getUsersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//</editor-fold >

//<editor-fold defaultstate="collapsed" desc="Greenhouse">

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

//</editor-fold >

//<editor-fold defaultstate="collapsed" desc="Tabel">

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

const openCellsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const openCellsSuccess = (state, action) => {
    return updateObject(state, {
        cells: action.cells,
        loading: false,
    })
}

const openCellsFail = (state, action) => {
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

const addUserInTabelStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const addUserInTabelSuccess = (state, action) => {
    return updateObject(state, {
        cells: action.cells,
        loading: false,
    })
}

const addUserInTabelFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const deleteUserInTabelStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const deleteUserInTabelSuccess = (state, action) => {
    return updateObject(state, {
        cells: action.cells,
        loading: false,
    })
}

const deleteUserInTabelFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//</editor-fold >

//<editor-fold defaultstate="collapsed" desc="Crops">
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
//</editor-fold >

//<editor-fold defaultstate="collapsed" desc="Hybrids">
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
//</editor-fold >

//<editor-fold defaultstate="collapsed" desc="VegetationPhases">
const getVegetationPhasesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const getVegetationPhasesSuccess = (state, action) => {
    return updateObject(state, {
        vegetationPhases: action.vegetationPhases,
        loading: false,
    })
}

const getVegetationPhasesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}
//</editor-fold >

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
    return updateObject(state, {
        operationsCategory: updateListById(state.operationsCategory, action.operationCategory),
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
    return updateObject(state, {
        operationsCategory: deleteListById(state.operationsCategory, action.operationCategoryId),
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
    return updateObject(state, {
        operationsFrequency: updateListById(state.operationsFrequency, action.operationFrequency),
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
    return updateObject(state, {
        operationsFrequency: deleteListById(state.operationsFrequency, action.operationFrequencyId),
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
    return updateObject(state, {
        technologicalPeriods: updateListById(state.technologicalPeriods, action.technologicalPeriod),
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
    return updateObject(state, {
        technologicalPeriods: deleteListById(state.technologicalPeriods, action.technologicalPeriodId),
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

//<editor-fold defaultstate="collapsed" desc="OperationalStandard">

const getOperationalStandardsStart = (state, action) => {
    return updateObject(state, {
        operationalStandards: null,
        error: null,
        loading: true,
    })
}

const getOperationalStandardsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        operationalStandards: action.operationalStandards
    })
}

const getOperationalStandardsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const addOperationalStandardStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const addOperationalStandardSuccess = (state, action) => {
    return updateObject(state, {
        operationalStandards: [...state.operationalStandards, action.operationalStandard],
        loading: false,
    })
}

const addOperationalStandardFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const editOperationalStandardStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const editOperationalStandardSuccess = (state, action) => {
    return updateObject(state, {
        operationalStandards: updateListById(state.operationalStandards, action.operationalStandard),
        loading: false,
    })
}

const editOperationalStandardFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const deleteOperationalStandardStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const deleteOperationalStandardSuccess = (state, action) => {
    return updateObject(state, {
        operationalStandards: deleteListById(state.operationalStandards, action.operationalStandardId),
        loading: false,
    })
}

const deleteOperationalStandardFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="TechnologicalOperation">

const getTechnologicalOperationsStart = (state, action) => {
    return updateObject(state, {
        technologicalOperations: null,
        error: null,
        loading: true,
    })
}

const getTechnologicalOperationsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        technologicalOperations: action.technologicalOperations
    })
}

const getTechnologicalOperationsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const addTechnologicalOperationStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const addTechnologicalOperationSuccess = (state, action) => {
    return updateObject(state, {
        technologicalOperations: [...state.technologicalOperations, action.technologicalOperation],
        loading: false,
    })
}

const addTechnologicalOperationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const editTechnologicalOperationStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const editTechnologicalOperationSuccess = (state, action) => {
    return updateObject(state, {
        technologicalOperations: updateListById(state.technologicalOperations, action.technologicalOperation),
        loading: false,
    })
}

const editTechnologicalOperationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const deleteTechnologicalOperationStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const deleteTechnologicalOperationSuccess = (state, action) => {
    return updateObject(state, {
        technologicalOperations: deleteListById(state.technologicalOperations, action.technologicalOperationId),
        loading: false,
    })
}

const deleteTechnologicalOperationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Product">

const getProductsStart = (state, action) => {
    return updateObject(state, {
        products: null,
        error: null,
        loading: true,
    })
}

const getProductsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        products: action.products
    })
}

const getProductsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const addProductStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const addProductSuccess = (state, action) => {
    return updateObject(state, {
        products: [...state.products, action.product],
        loading: false,
    })
}

const addProductFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const editProductStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const editProductSuccess = (state, action) => {
    return updateObject(state, {
        products: updateListById(state.products, action.product),
        loading: false,
    })
}

const editProductFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const deleteProductStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const deleteProductSuccess = (state, action) => {
    return updateObject(state, {
        products: deleteListById(state.products, action.productId),
        loading: false,
    })
}

const deleteProductFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Order">

const getOrdersStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const getOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
    })
}

const getOrdersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const addOrderStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const addOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: [action.order, ...state.orders],
        loading: false,
    })
}

const addOrderFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const editOrderStart = (state, action) => {
    return updateObject(state, {
        orderProducts: null,
        error: null,
        loading: true,
    })
}

const editOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: updateListById(state.orders, action.order),
        loading: false,
    })
}

const editOrderFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const deleteOrderStart = (state, action) => {
    return updateObject(state, {
        orderProducts: null,
        error: null,
        loading: true,
    })
}

const deleteOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: deleteListById(state.orders, action.orderId),
        loading: false,
    })
}

const deleteOrderFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const getOrderProductsStart = (state, action) => {
    return updateObject(state, {
        orderProducts: null,
        error: null,
        loading: true,
    })
}

const getOrderProductsSuccess = (state, action) => {
    return updateObject(state, {
        orderProducts: action.orderProducts,
        loading: false,
    })
}

const getOrderProductsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const editOrderProductsStart = (state, action) => {
    return updateObject(state, {
        // orderProducts: null,
        error: null,
        loading: true,
    })
}

const editOrderProductsSuccess = (state, action) => {
    return updateObject(state, {
        orderProducts: updateListById(state.orderProducts, action.orderProduct),
        loading: false,
    })
}

const editOrderProductsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const deleteOrderProductsStart = (state, action) => {
    return updateObject(state, {
        // orderProducts: null,
        error: null,
        loading: true,
    })
}

const deleteOrderProductsSuccess = (state, action) => {
    return updateObject(state, {
        orderProducts: deleteListById(state.orderProducts, action.orderProductId),
        loading: false,
    })
}

const deleteOrderProductsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const getOrderLocationsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const getOrderLocationsSuccess = (state, action) => {
    return updateObject(state, {
        orderLocations: action.orderLocations,
        loading: false,
    })
}

const getOrderLocationsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

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

        case actionTypes.GET_USERS_START:
            return getUsersStart(state, action);
        case actionTypes.GET_USERS_SUCCESS:
            return getUsersSuccess(state, action);
        case actionTypes.GET_USERS_FAIL:
            return getUsersFail(state, action);

        case actionTypes.GET_GREENHOUSES_START:
            return getGreenhousesStart(state, action);
        case actionTypes.GET_GREENHOUSES_SUCCESS:
            return getGreenhousesSuccess(state, action);
        case actionTypes.GET_GREENHOUSES_FAIL:
            return getGreenhousesFail(state, action);

        //<editor-fold defaultstate="collapsed" desc="Order">

        case actionTypes.GET_ORDERS_START:
            return getOrdersStart(state, action);
        case actionTypes.GET_ORDERS_SUCCESS:
            return getOrdersSuccess(state, action);
        case actionTypes.GET_ORDERS_FAIL:
            return getOrdersFail(state, action);

        case actionTypes.ADD_ORDER_START:
            return addOrderStart(state, action);
        case actionTypes.ADD_ORDER_SUCCESS:
            return addOrderSuccess(state, action);
        case actionTypes.ADD_ORDER_FAIL:
            return addOrderFail(state, action);

        case actionTypes.EDIT_ORDER_START:
            return editOrderStart(state, action);
        case actionTypes.EDIT_ORDER_SUCCESS:
            return editOrderSuccess(state, action);
        case actionTypes.EDIT_ORDER_FAIL:
            return editOrderFail(state, action);

        case actionTypes.DELETE_ORDER_START:
            return deleteOrderStart(state, action);
        case actionTypes.DELETE_ORDER_SUCCESS:
            return deleteOrderSuccess(state, action);
        case actionTypes.DELETE_ORDER_FAIL:
            return deleteOrderFail(state, action);

        case actionTypes.GET_ORDER_PRODUCTS_START:
            return getOrderProductsStart(state, action);
        case actionTypes.GET_ORDER_PRODUCTS_SUCCESS:
            return getOrderProductsSuccess(state, action);
        case actionTypes.GET_ORDER_PRODUCTS_FAIL:
            return getOrderProductsFail(state, action);

        case actionTypes.EDIT_ORDER_PRODUCT_START:
            return editOrderProductsStart(state, action);
        case actionTypes.EDIT_ORDER_PRODUCT_SUCCESS:
            return editOrderProductsSuccess(state, action);
        case actionTypes.EDIT_ORDER_PRODUCT_FAIL:
            return editOrderProductsFail(state, action);

        case actionTypes.DELETE_ORDER_PRODUCT_START:
            return deleteOrderProductsStart(state, action);
        case actionTypes.DELETE_ORDER_PRODUCT_SUCCESS:
            return deleteOrderProductsSuccess(state, action);
        case actionTypes.DELETE_ORDER_PRODUCT_FAIL:
            return deleteOrderProductsFail(state, action);

        case actionTypes.GET_ORDER_LOCATIONS_START:
            return getOrderLocationsStart(state, action);
        case actionTypes.GET_ORDER_LOCATIONS_SUCCESS:
            return getOrderLocationsSuccess(state, action);
        case actionTypes.GET_ORDER_LOCATIONS_FAIL:
            return getOrderLocationsFail(state, action);

        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="Tabel">

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
        case actionTypes.OPEN_CELLS_START:
            return openCellsStart(state, action);
        case actionTypes.OPEN_CELLS_SUCCESS:
            return openCellsSuccess(state, action);
        case actionTypes.OPEN_CELLS_FAIL:
            return openCellsFail(state, action);
        case actionTypes.TRY_SEND_CELLS_START:
            return trySendCellsStart(state, action);
        case actionTypes.TRY_SEND_CELLS_SUCCESS:
            return trySendCellsSuccess(state, action);
        case actionTypes.TRY_SEND_CELLS_FAIL:
            return trySendCellsFail(state, action);
        case actionTypes.ADD_USER_IN_TABEL_START:
            return addUserInTabelStart(state, action);
        case actionTypes.ADD_USER_IN_TABEL_SUCCESS:
            return addUserInTabelSuccess(state, action);
        case actionTypes.ADD_USER_IN_TABEL_FAIL:
            return addUserInTabelFail(state, action);
        case actionTypes.DELETE_USER_IN_TABEL_START:
            return deleteUserInTabelStart(state, action);
        case actionTypes.DELETE_USER_IN_TABEL_SUCCESS:
            return deleteUserInTabelSuccess(state, action);
        case actionTypes.DELETE_USER_IN_TABEL_FAIL:
            return deleteUserInTabelFail(state, action);

        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="Crops">

        case catalogActionTypes.GET_CROPS_START:
            return getCropsStart(state, action);
        case catalogActionTypes.GET_CROPS_SUCCESS:
            return getCropsSuccess(state, action);
        case catalogActionTypes.GET_CROPS_FAIL:
            return getCropsFail(state, action);

        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="Hybrids">

        case catalogActionTypes.GET_HYBRIDS_START:
            return getHybridsStart(state, action);
        case catalogActionTypes.GET_HYBRIDS_SUCCESS:
            return getHybridsSuccess(state, action);
        case catalogActionTypes.GET_HYBRIDS_FAIL:
            return getHybridsFail(state, action);

        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="VegetationPhases">

        case catalogActionTypes.GET_VEGETATION_PHASES_START:
            return getVegetationPhasesStart(state, action);
        case catalogActionTypes.GET_VEGETATION_PHASES_SUCCESS:
            return getVegetationPhasesSuccess(state, action);
        case catalogActionTypes.GET_VEGETATION_PHASES_FAIL:
            return getVegetationPhasesFail(state, action);

        //</editor-fold>

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

        //<editor-fold defaultstate="collapsed" desc="OperationalStandard">

        case catalogActionTypes.GET_OPERATION_STANDARDS_START:
            return getOperationalStandardsStart(state, action);
        case catalogActionTypes.GET_OPERATION_STANDARDS_SUCCESS:
            return getOperationalStandardsSuccess(state, action);
        case catalogActionTypes.GET_OPERATION_STANDARDS_FAIL:
            return getOperationalStandardsFail(state, action);
        case catalogActionTypes.ADD_OPERATION_STANDARD_START:
            return addOperationalStandardStart(state, action);
        case catalogActionTypes.ADD_OPERATION_STANDARD_SUCCESS:
            return addOperationalStandardSuccess(state, action);
        case catalogActionTypes.ADD_OPERATION_STANDARD_FAIL:
            return addOperationalStandardFail(state, action);
        case catalogActionTypes.EDIT_OPERATION_STANDARD_START:
            return editOperationalStandardStart(state, action);
        case catalogActionTypes.EDIT_OPERATION_STANDARD_SUCCESS:
            return editOperationalStandardSuccess(state, action);
        case catalogActionTypes.EDIT_OPERATION_STANDARD_FAIL:
            return editOperationalStandardFail(state, action);
        case catalogActionTypes.DELETE_OPERATION_STANDARD_START:
            return deleteOperationalStandardStart(state, action);
        case catalogActionTypes.DELETE_OPERATION_STANDARD_SUCCESS:
            return deleteOperationalStandardSuccess(state, action);
        case catalogActionTypes.DELETE_OPERATION_STANDARD_FAIL:
            return deleteOperationalStandardFail(state, action);

        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="TechnologicalOperation">

        case catalogActionTypes.GET_TECHNOLOGICAL_OPERATIONS_START:
            return getTechnologicalOperationsStart(state, action);
        case catalogActionTypes.GET_TECHNOLOGICAL_OPERATIONS_SUCCESS:
            return getTechnologicalOperationsSuccess(state, action);
        case catalogActionTypes.GET_TECHNOLOGICAL_OPERATIONS_FAIL:
            return getTechnologicalOperationsFail(state, action);
        case catalogActionTypes.ADD_TECHNOLOGICAL_OPERATION_START:
            return addTechnologicalOperationStart(state, action);
        case catalogActionTypes.ADD_TECHNOLOGICAL_OPERATION_SUCCESS:
            return addTechnologicalOperationSuccess(state, action);
        case catalogActionTypes.ADD_TECHNOLOGICAL_OPERATION_FAIL:
            return addTechnologicalOperationFail(state, action);
        case catalogActionTypes.EDIT_TECHNOLOGICAL_OPERATION_START:
            return editTechnologicalOperationStart(state, action);
        case catalogActionTypes.EDIT_TECHNOLOGICAL_OPERATION_SUCCESS:
            return editTechnologicalOperationSuccess(state, action);
        case catalogActionTypes.EDIT_TECHNOLOGICAL_OPERATION_FAIL:
            return editTechnologicalOperationFail(state, action);
        case catalogActionTypes.DELETE_TECHNOLOGICAL_OPERATION_START:
            return deleteTechnologicalOperationStart(state, action);
        case catalogActionTypes.DELETE_TECHNOLOGICAL_OPERATION_SUCCESS:
            return deleteTechnologicalOperationSuccess(state, action);
        case catalogActionTypes.DELETE_TECHNOLOGICAL_OPERATION_FAIL:
            return deleteTechnologicalOperationFail(state, action);

        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="Product">

        case catalogActionTypes.GET_PRODUCTS_START:
            return getProductsStart(state, action);
        case catalogActionTypes.GET_PRODUCTS_SUCCESS:
            return getProductsSuccess(state, action);
        case catalogActionTypes.GET_PRODUCTS_FAIL:
            return getProductsFail(state, action);
        case catalogActionTypes.ADD_PRODUCT_START:
            return addProductStart(state, action);
        case catalogActionTypes.ADD_PRODUCT_SUCCESS:
            return addProductSuccess(state, action);
        case catalogActionTypes.ADD_PRODUCT_FAIL:
            return addProductFail(state, action);
        case catalogActionTypes.EDIT_PRODUCT_START:
            return editProductStart(state, action);
        case catalogActionTypes.EDIT_PRODUCT_SUCCESS:
            return editProductSuccess(state, action);
        case catalogActionTypes.EDIT_PRODUCT_FAIL:
            return editProductFail(state, action);
        case catalogActionTypes.DELETE_PRODUCT_START:
            return deleteProductStart(state, action);
        case catalogActionTypes.DELETE_PRODUCT_SUCCESS:
            return deleteProductSuccess(state, action);
        case catalogActionTypes.DELETE_PRODUCT_FAIL:
            return deleteProductFail(state, action);

        //</editor-fold>

        default:
            return state;
    }
}

export default reducer;