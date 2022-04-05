import * as actionTypes from "./actionTypes";
import api from "../../api/api";
import {getApiUrl} from "../../api/urls";


const tryGetCatalogsStart = () => {
    return {
        type: actionTypes.GET_CATALOGS_START
    }
}

const tryGetCatalogsSuccess = (catalogs) => {
    return {
        type: actionTypes.GET_CATALOGS_SUCCESS,
        catalogs: catalogs
    }
}

const tryGetCatalogsFail = (error) => {
    return {
        type: actionTypes.GET_CATALOGS_FAIL,
        error: error
    }
}

const tryGetDocumentStart = () => {
    return {
        type: actionTypes.GET_DOCUMENT_START
    }
}

const tryGetDocumentSuccess = (document) => {
    return {
        type: actionTypes.GET_DOCUMENT_SUCCESS,
        document: document
    }
}

const tryGetDocumentFail = (error) => {
    return {
        type: actionTypes.GET_DOCUMENT_FAIL,
        error: error
    }
}

export const tryGetCatalogs = () => {
    return dispatch => {
        dispatch(tryGetCatalogsStart());
        api.get(getApiUrl() + 'remote/wiki/catalogs/').then(res => {
                dispatch(tryGetCatalogsSuccess(res.data));
            }
        ).catch(err => {
            dispatch(tryGetCatalogsFail(err));
        });
    }
}

export const tryGetDocument = (id) => {
    return dispatch => {
        dispatch(tryGetDocumentStart());
        api.get(getApiUrl() + `remote/wiki/documents/${id}/`).then(res => {
                dispatch(tryGetDocumentSuccess(res.data));
            }
        ).catch(err => {
            dispatch(tryGetDocumentFail(err));
        });
    }
}