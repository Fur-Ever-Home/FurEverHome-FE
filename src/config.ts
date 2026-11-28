// The production build uses the site's origin so auth cookies also work through Vercel.
export const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/+$/, '')
  : '';
