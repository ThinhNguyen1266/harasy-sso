import axios from 'axios'

let clerkGetToken: (() => Promise<string | null>) | null = null

/** Called from ClerkAxiosBridge so API calls send Clerk session JWT to the Go backend. */
export function setClerkTokenGetter(fn: (() => Promise<string | null>) | null) {
  clerkGetToken = fn
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15_000,
})

api.interceptors.request.use(async (config) => {
  if (clerkGetToken) {
    try {
      const token = await clerkGetToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      // ignore; request proceeds without Clerk token
    }
  }
  return config
})
