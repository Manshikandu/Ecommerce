import { create } from "zustand";
import axios from "../lib/axios"
import { toast } from "react-hot-toast"
//import { response } from "express";

 export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

signup: async ({name,email,password,confirmPassword}) => {
      set({ loading : true})
      if( password !== confirmPassword){
        set ({ loading : false});
        return  toast.error("password do not match");
      }
    
    try {
        const res = await axios.post("/auth/signup",{name,email,password});
        set ({ user : res.data.user,loading:false})

    } catch (error) {
        set ({ loading: false});
        toast.error(error.response.data.message || "An error occured")
    }
},

login: async (email, password) => {
    set({ loading: true });

    try {
        const res = await axios.post("/auth/login", { email, password });

        set({ user: res.data, loading: false });
    } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.message || "An error occurred");
    }
},

logout: async () => {
    try {
        await axios.post("/auth/logout");
        set({ user: null });
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred during logout");
    }
},
checkAuth: async () => {
    set({ checkingAuth: true });
    try {
        const response = await axios.get("/auth/profile");
        set({ user: response.data, checkingAuth: false });
    } catch (error) {
        console.log(error.message);
        set({ checkingAuth: false, user: null });
    }
},
refreshToken: async () => {
    //prevent multiple siultaneous refresh attempts
    if(get().checkingAuth) return;
    set({ checkingAuth: true})
    try{
        const response =await axios.post("/auth/refresh-token");
        set({ checkingAuth : false});
        return response.data;

    }
    catch(error){
        set({ user: null, checkingAuth: false});
        throw error;
    }

 }


 }));


 //todo implement the axios interceptors for refreshing access token
let refreshPromise = null;

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
        try{
      //If a refresh is a already in progress ,wait for it to comllete
      if(refreshPromise){
        await refreshPromise;
        return axios(originalRequest);
        
        }
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios (originalRequest);
    }
        catch (refreshError) {
        //If refresh fails ,redirect to login or handle as needed
        useUserStore.getState().logout();
        return Promise.reject(refreshError);    

           }
        }
        return Promise.reject(error);
    }
)