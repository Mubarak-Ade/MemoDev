import axios from "axios"

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true
            try {
              await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, {withCredentials: true})
              return api(original)
            } catch (refreshError) {
              if (window.location.pathname !== "/login") {
                window.location.href = "/login"
              }
              return Promise.reject(refreshError)
            }
        }
        const message = error.response?.data?.error || error.message || "Something went wrong"
        console.error('API Error', message)
        return Promise.reject(message)
    }
)

export default api
