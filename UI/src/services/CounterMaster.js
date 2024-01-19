import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/countermaster';

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
  
export const getAllCounter = () => axios.get(BASE_REST_API_URL)

export const addCounter = (counter) => axios.post(BASE_REST_API_URL, counter)

export const getCounter = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateCounter = (id, counter) => axios.put(BASE_REST_API_URL + '/' + id, counter)

export const deleteCounter = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const setIsActive = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/toggle')

