import axios from 'axios';
import {parseCookies} from 'nookies';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5297';

export const api = axios.create({
  baseURL: `${backendUrl}/api`,
});

api.interceptors.request.use((config) => {
    const{'auth.token': token} = parseCookies();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
