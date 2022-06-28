import axios from "axios";
import { API_KEY, BASE_URL } from "../../config";

export const axiosApi = axios.create({
    baseURL: BASE_URL
});



axiosApi.interceptors.request.use(request => {
    request.params["api_token"] = API_KEY;
    return request;
});
