import axios from "axios";
import Cookies from "js-cookie";
import { getApiUrl } from "./urls";


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

export default api;