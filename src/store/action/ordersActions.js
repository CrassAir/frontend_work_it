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