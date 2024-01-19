import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/servicemaster';

// export function getAllTodos(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
export const getAllService = () => axios.get(BASE_REST_API_URL)

export const addService = (service) => axios.post(BASE_REST_API_URL, service)

export const getService = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateService = (id, service) => axios.put(BASE_REST_API_URL + '/' + id, service)

export const deleteService = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const setIsActive = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/toggle')

