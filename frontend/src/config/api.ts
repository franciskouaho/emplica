import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://backend.localhost/',
    withCredentials: true,
});

export default api;
