import axios from "axios";
import Store from '../store/store'

const BASE_URL = process.env.BASE_URL

const axiosInstance = axios.create({
    baseURL: "http://192.168.1.11:8090/",
    headers: {
        "Content-type": "application/json",
    }
})
axiosInstance.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${Store.state.token}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default axiosInstance;