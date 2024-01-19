import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/locationmaster';

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
  
export const getAllLocation = () => axios.get(BASE_REST_API_URL)

export const addLocation = (location) => axios.post(BASE_REST_API_URL, location)

export const getLocation = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateLocation = (id, location) => axios.put(BASE_REST_API_URL + '/' + id, location)

export const deleteLocation = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const setIsActive = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/toggle')

