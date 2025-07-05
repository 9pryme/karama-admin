import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  // Add user properties here when available from API response
  email: string;
  // Add other user fields as needed
}

export interface LoginResponse {
  statusCode: number;
  status: string;
  success: boolean;
  error: string;
  data: {
    token: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const url = `${API_URL}/admin/auth/login`;
      console.log('Making request to:', url); // Debug log
      
      const response = await axios.post<LoginResponse>(url, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Store token in cookie
      Cookies.set('token', response.data.data.token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      // Store user data in cookie (using email for now)
      const userData = { email: credentials.email };
      Cookies.set('user', JSON.stringify(userData), {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error); // Debug log
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string; error: string }>;
        console.error('Response data:', axiosError.response?.data); // Debug log
        throw new Error(axiosError.response?.data?.message || axiosError.response?.data?.error || 'Login failed');
      }
      throw new Error('An unexpected error occurred');
    }
  },

  logout() {
    Cookies.remove('token');
    Cookies.remove('user');
  },

  getToken(): string | undefined {
    return Cookies.get('token');
  },

  getUser(): User | null {
    const userStr = Cookies.get('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}; 