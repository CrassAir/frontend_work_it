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

const editOrderStart = () => {
    return {
        type: actionTypes.EDIT_ORDER_START
    }
}

const editOrderSuccess = (order) => {
    return {
        type: actionTypes.EDIT_ORDER_SUCCESS,
        order: order
    }
}

const editOrderFail = (error) => {
    return {
        type: actionTypes.EDIT_ORDER_FAIL,
        error: error
    }
}

const deleteOrderStart = () => {
    return {
        type: actionTypes.DELETE_ORDER_START
    }
}

const deleteOrderSuccess = (orderId) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        orderId: orderId
    }
}

const deleteOrderFail = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAIL,
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

const editOrderProductStart = () => {
    return {
        type: actionTypes.EDIT_ORDER_PRODUCT_START
    }
}

const editOrderProductSuccess = (orderProduct) => {
    return {
        type: actionTypes.EDIT_ORDER_PRODUCT_SUCCESS,
        orderProduct: orderProduct
    }
}

const editOrderProductFail = (error) => {
    return {
        type: actionTypes.EDIT_ORDER_PRODUCT_FAIL,
        error: error
    }
}

const deleteOrderProductStart = () => {
    return {
        type: actionTypes.DELETE_ORDER_PRODUCT_START
    }
}

const deleteOrderProductSuccess = (orderProductId) => {
    return {
        type: actionTypes.DELETE_ORDER_PRODUCT_SUCCESS,
        orderProductId: orderProductId
    }
}

const deleteOrderProductFail = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_PRODUCT_FAIL,
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

export const editOrder = (order_id, values) => {
    return dispatch => {
        dispatch(editOrderStart());
        api.patch(getApiUrl() + `remote/order/${order_id}/`, values).then(res => {
                dispatch(editOrderSuccess(res.data));
            }
        ).catch(err => {
            dispatch(editOrderFail(err));
        });
    }
}

export const deleteOrder = (order_id) => {
    return dispatch => {
        dispatch(deleteOrderStart());
        api.delete(getApiUrl() + `remote/order/${order_id}/`).then(res => {
                if (typeof res.data === 'object') {
                    dispatch(editOrderSuccess(res.data))
                    return
                }
                dispatch(deleteOrderSuccess(res.data))
            }
        ).catch(err => {
            dispatch(deleteOrderFail(err));
        });
    }
}

export const tryGetOrderProducts = (order_id) => {
    return dispatch => {
        dispatch(tryGetProductsStart());
        api.get(getApiUrl() + 'remote/product/?order_id=' + order_id).then(res => {
                dispatch(tryGetProductsSuccess(res.data));
            }
        ).catch(err => {
            dispatch(tryGetProductsFail(err));
        });
    }
}

export const editOrderProduct = (prod_id, values) => {
    return dispatch => {
        dispatch(editOrderProductStart());
        api.patch(getApiUrl() + `remote/product/${prod_id}/`, values).then(res => {
                dispatch(editOrderProductSuccess(res.data));
            }
        ).catch(err => {
            dispatch(editOrderProductFail(err));
        });
    }
}

export const deleteOrderProduct = (id) => {
    return dispatch => {
        dispatch(deleteOrderProductStart());
        api.delete(getApiUrl() + `remote/product/${id}/`).then(res => {
                dispatch(deleteOrderProductSuccess(id));
            }
        ).catch(err => {
            dispatch(deleteOrderProductFail(err));
        });
    }
}

