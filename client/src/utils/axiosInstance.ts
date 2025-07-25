

import { store } from "@/redux/store";
import axios from "axios";

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const apiUrl = (import.meta as unknown as ImportMeta).env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl+"/api",
  headers: {
    "Content-Type": "application/json",
  },
});





axiosInstance.interceptors.request.use(
    config=>{
        
        
        const token= store.getState().auth.accessToken;
        
        
        if(!config.headers.Authorization){
            if(token){
                config.headers.Authorization=`Bearer ${token}`
            }
        }
        return config
    },
    error=>{
        return Promise.reject(error)
    }
)


axiosInstance.interceptors.response.use(
    response=>response,
    async error=>{
        const originalRequest=error.config

        if(!error.response){
            return Promise.reject(error)
        }


        if( error.response.status===401 && error.response.data.code==='TOKEN_EXPIRED'&&!originalRequest._retry){
            originalRequest._retry=true
            try {
                const response=await axios.post(apiUrl+'api/auth/refresh-token',null,{withCredentials:true})
                const newToken=response.data.accessToken
                originalRequest.headers.Authorization=`Bearer ${newToken}`
                store.dispatch({type:'auth/updateToken',payload:newToken})
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                console.log('Error refreshing token:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)


export default axiosInstance;