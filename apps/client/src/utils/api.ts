import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

interface ApiRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
    skipAuthRefresh?: boolean
}

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
})

let refreshPromise: Promise<void> | null = null

const refreshAccessToken = (): Promise<void> => {
    refreshPromise ??= api
        .post<void>('/auth/refresh')
        .then(() => undefined)
        .finally(() => {
            refreshPromise = null
        })

    return refreshPromise
}

const normalizeApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.error ?? error.message ?? 'Something went wrong'
    }
    return 'Something went wrong'
}

api.interceptors.request.use((config: ApiRequestConfig) => {
    // Tag the refresh endpoint so the response interceptor can skip it
    if (config.url?.includes('/auth/refresh')) {
        config.skipAuthRefresh = true
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const config = error.config as ApiRequestConfig | undefined

        const is401 = error.response?.status === 401
        const isRetry = config?._retry === true
        const skipRefresh = config?.skipAuthRefresh === true

        const shouldRefresh = !!config && is401 && !isRetry && !skipRefresh

        if (shouldRefresh) {
            config._retry = true

            try {
                await refreshAccessToken()
                return await api(config)
            } catch {
                // Refresh itself failed — session is dead
                return Promise.reject(new Error('Session expired. Please log in again.'))
            }
        }

        return Promise.reject(normalizeApiError(error))
    },
)

export default api