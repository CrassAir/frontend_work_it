import * as actionTypes from "./actionTypes";
import {getApiUrl} from "../../../api/urls";
import api from "../../../api/api";

const getProductsStart = () => {
    return {
        type: actionTypes.GET_PRODUCTS_START
    }
}

const getProductsSuccess = (products) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        products: products
    }
}

const getProductsFail = (error) => {
    return {
        type: actionTypes.GET_PRODUCTS_FAIL,
        error: error
    }
}

const addProductStart = () => {
    return {
        type: actionTypes.ADD_PRODUCT_START,
    }
}

const addProductSuccess = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        product: product
    }
}

const addProductFail = (error) => {
    return {
        type: actionTypes.ADD_PRODUCT_FAIL,
        error: error
    }
}

const editProductStart = () => {
    return {
        type: actionTypes.EDIT_PRODUCT_START,
    }
}

const editProductSuccess = (product) => {
    return {
        type: actionTypes.EDIT_PRODUCT_SUCCESS,
        product: product
    }
}

const editProductFail = (error) => {
    return {
        type: actionTypes.EDIT_PRODUCT_FAIL,
        error: error
    }
}

const deleteProductStart = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_START,
    }
}

const deleteProductSuccess = (productId) => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        productId: productId
    }
}

const deleteProductFail = (error) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAIL,
        error: error
    }
}

export const getProducts = () => {
    return dispatch => {
        dispatch(getProductsStart());
        api.get(getApiUrl() + 'remote/product_catalog/').then(res => {
                dispatch(getProductsSuccess(res.data));
            }
        ).catch(err => {
            dispatch(getProductsFail(err));
        });
    }
}

export const addProduct = (values) => {
    return dispatch => {
        dispatch(addProductStart());
        api.post(getApiUrl() + 'remote/product_catalog/', values).then(res => {
                dispatch(addProductSuccess(res.data));
            }
        ).catch(err => {
            dispatch(addProductFail(err));
        });
    }
}

export const editProduct = (id, values) => {
    return dispatch => {
        dispatch(editProductStart());
        api.patch(getApiUrl() + `remote/product_catalog/${id}/`, values).then(res => {
                dispatch(editProductSuccess(res.data));
            }
        ).catch(err => {
            dispatch(editProductFail(err));
        });
    }
}

export const deleteProduct = (id) => {
    return dispatch => {
        dispatch(deleteProductStart());
        api.delete(getApiUrl() + `remote/product_catalog/${id}/`).then(res => {
                dispatch(deleteProductSuccess(id));
            }
        ).catch(err => {
            dispatch(deleteProductFail(err));
        });
    }
}