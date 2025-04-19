import axios from 'axios';

export const axiosIns= axios.create({
     baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
    withCredentials:true,
})
