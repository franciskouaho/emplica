import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://api.emplica.fr:8083/',
    withCredentials: true,
});

export default api;
