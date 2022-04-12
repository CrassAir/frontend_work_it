import * as actionTypes from "./actionTypes";
import api from "../../api/api";
import {getApiUrl} from "../../api/urls";

//<editor-fold defaultstate="collapsed" desc="Catalog">
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

const tryCreateCatalogStart = () => {
    return {
        type: actionTypes.CREATE_CATALOG_START
    }
}

const tryCreateCatalogSuccess = () => {
    return {
        type: actionTypes.CREATE_CATALOG_SUCCESS,
    }
}

const tryCreateCatalogFail = (error) => {
    return {
        type: actionTypes.CREATE_CATALOG_FAIL,
        error: error
    }
}

const tryUpdateCatalogStart = () => {
    return {
        type: actionTypes.UPDATE_CATALOG_START
    }
}

const tryUpdateCatalogSuccess = () => {
    return {
        type: actionTypes.UPDATE_CATALOG_SUCCESS,
    }
}

const tryUpdateCatalogFail = (error) => {
    return {
        type: actionTypes.UPDATE_CATALOG_FAIL,
        error: error
    }
}

const tryDeleteCatalogStart = () => {
    return {
        type: actionTypes.DELETE_CATALOG_START
    }
}

const tryDeleteCatalogSuccess = () => {
    return {
        type: actionTypes.DELETE_CATALOG_SUCCESS,
    }
}

const tryDeleteCatalogFail = (error) => {
    return {
        type: actionTypes.DELETE_CATALOG_FAIL,
        error: error
    }
}

//</editor-fold>

const unmountDocument = () => {
    return {
        type: actionTypes.UNMOUNT_DOCUMENT,
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

const tryCreateDocumentStart = () => {
    return {
        type: actionTypes.CREATE_DOCUMENT_START
    }
}

const tryCreateDocumentSuccess = () => {
    return {
        type: actionTypes.CREATE_DOCUMENT_SUCCESS,
    }
}

const tryCreateDocumentFail = (error) => {
    return {
        type: actionTypes.CREATE_DOCUMENT_FAIL,
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

export const tryCreateCatalog = (values) => {
    return dispatch => {
        dispatch(tryCreateCatalogStart());
        api.post(getApiUrl() + `remote/wiki/catalogs/`, values).then(res => {
                dispatch(tryCreateCatalogSuccess());
                dispatch(tryGetCatalogs())
            }
        ).catch(err => {
            dispatch(tryCreateCatalogFail(err));
        });
    }
}

export const tryUpdateCatalog = (id, values) => {
    return dispatch => {
        dispatch(tryUpdateCatalogStart());
        api.patch(getApiUrl() + `remote/wiki/catalogs/${id}/`, values).then(res => {
                dispatch(tryUpdateCatalogSuccess());
                dispatch(tryGetCatalogs())
            }
        ).catch(err => {
            dispatch(tryUpdateCatalogFail(err));
        });
    }
}

export const tryUnmountDocument = () => {
    return dispatch => {
        dispatch(unmountDocument())
    }
}

export const tryDeleteCatalog = (id) => {
    return dispatch => {
        dispatch(tryDeleteCatalogStart());
        api.delete(getApiUrl() + `remote/wiki/catalogs/${id}/`).then(res => {
                dispatch(tryDeleteCatalogSuccess());
                dispatch(tryGetCatalogs())
            }
        ).catch(err => {
            dispatch(tryDeleteCatalogFail(err));
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

export const tryCreateDocument = (values) => {
    return dispatch => {
        dispatch(tryCreateDocumentStart());
        api.post(getApiUrl() + `remote/wiki/documents/`, values).then(res => {
                dispatch(tryCreateDocumentSuccess());
                dispatch(tryGetCatalogs())
            }
        ).catch(err => {
            dispatch(tryCreateDocumentFail(err));
        });
    }
}

export const tryUpdateDocument = (id, values) => {
    return dispatch => {
        dispatch({type: actionTypes.UPDATE_DOCUMENT_START});
        api.patch(getApiUrl() + `remote/wiki/documents/${id}/`, values).then(res => {
                dispatch({type: actionTypes.UPDATE_DOCUMENT_SUCCESS, document: res.data});
            }
        ).catch(err => {
            dispatch({type: actionTypes.UPDATE_DOCUMENT_FAIL, error: err});
        });
    }
}

