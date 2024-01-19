import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/screenmaster';

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
  
export const getAllScreen = () => axios.get(BASE_REST_API_URL)

export const addScreen = (screen) => axios.post(BASE_REST_API_URL, screen)

export const getScreen = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateScreen = (id, screen) => axios.put(BASE_REST_API_URL + '/' + id, screen)

export const deleteScreen = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const setIsActive = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/toggle')

