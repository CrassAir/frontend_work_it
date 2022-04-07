import axios from "axios";
import Cookies from "js-cookie";
import {getApiUrl} from "./urls";


const api = axios.create({
    baseURL: getApiUrl(),
    responseType: "json",
});
api.interceptors.request.use((config) => {
    config.headers["X-CSRFToken"] = Cookies.get("csrftoken");
    // console.log("api.interceptors.request: ", config.headers);
    return config;
});

export const authInterceptor = (config, token) => {
    config.headers['authorization'] = token;
    return config;
}

export const tryPrintTabel = (tabel_id) => {
    api.get(`${getApiUrl()}tabel/${tabel_id}/get_excel/`, {responseType: 'blob'})
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'tabel.xlsx');
            document.body.appendChild(link);
            link.click();
        }).catch(err => console.log(err))
}

export const tryPrintOrder = (order_id) => {
    api.get(`${getApiUrl()}remote/order/order/${order_id}/get_excel/`, {responseType: 'blob'})
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'order.xlsx');
            document.body.appendChild(link);
            link.click();
        }).catch(err => console.log(err))
}

export default api;

export const uploadPriceFile = (price) => {
    const header = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }
    api.post(getApiUrl() + 'technological-operations/upload_file/', price.file, header).then(res => {
        console.log(res.data)
    }).catch(err => console.log(err))
}