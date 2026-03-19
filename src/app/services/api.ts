import axios from 'axios';
import {parseCookies} from 'nookies';

export const api = axios.create({
  baseURL: 'http://localhost:5297/api',
});

api.interceptors.request.use((config) => {
    const{'auth.token': token} = parseCookies();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});