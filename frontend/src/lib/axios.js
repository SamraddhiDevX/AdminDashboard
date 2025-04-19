import axios from 'axios';

export const axiosIns= axios.create({
    baseURL:import.meta.env.MODE==="development"?"http://localhost:5000/api":"https://admindashboardback-mrkr.onrender.com/api",
    withCredentials:true,
})
