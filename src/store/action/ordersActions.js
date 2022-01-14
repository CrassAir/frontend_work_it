import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../api/urls";
import api from "../../api/api";


const tryGetOrdersStart = () => {
    return {
        type: actionTypes.GET_ORDERS_START
    }
}

const tryGetOrdersSuccess = (orders) => {
    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        orders: orders
    }
}

const tryGetOrdersFail = (error) => {
    return {
        type: actionTypes.GET_ORDERS_FAIL,
        error: error
    }
}

const addOrderStart = () => {
    return {
        type: actionTypes.ADD_ORDER_START
    }
}

const addOrderSuccess = (order) => {
    return {
        type: actionTypes.ADD_ORDER_SUCCESS,
        order: order
    }
}

const addOrderFail = (error) => {
    return {
        type: actionTypes.ADD_ORDER_FAIL,
        error: error
    }
}

const tryGetProductsStart = () => {
    return {
        type: actionTypes.GET_ORDER_PRODUCTS_START
    }
}

const tryGetProductsSuccess = (orderProducts) => {
    return {
        type: actionTypes.GET_ORDER_PRODUCTS_SUCCESS,
        orderProducts: orderProducts
    }
}

const tryGetProductsFail = (error) => {
    return {
        type: actionTypes.GET_ORDER_PRODUCTS_FAIL,
        error: error
    }
}

export const tryGetOrders = () => {
    return dispatch => {
        dispatch(tryGetOrdersStart());
        api.get(getApiUrl() + 'remote/order/').then(res => {
                dispatch(tryGetOrdersSuccess(res.data));
            }
        ).catch(err => {
            dispatch(tryGetOrdersFail(err));
        });
    }
}

export const addOrder = (values) => {
    return dispatch => {
        dispatch(addOrderStart());
        api.post(getApiUrl() + 'remote/order/', values).then(res => {
                dispatch(addOrderSuccess(res.data));
            }
        ).catch(err => {
            dispatch(addOrderFail(err));
        });
    }
}

export const tryGetOrderProducts = (order_id) => {
    return dispatch => {
        dispatch(tryGetProductsStart());
        api.get(getApiUrl() + 'remote/product/?order_id='+order_id).then(res => {
                dispatch(tryGetProductsSuccess(res.data));
            }
        ).catch(err => {
            dispatch(tryGetProductsFail(err));
        });
    }
}

