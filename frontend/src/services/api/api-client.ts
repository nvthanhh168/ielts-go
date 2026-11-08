import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for unified response extraction
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const customMessage = error.response?.data?.message || error.message || 'API Request Failed';
    console.error('[API Client Error]:', customMessage);
    return Promise.reject(new Error(customMessage));
  }
);
