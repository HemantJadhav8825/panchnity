// API client for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

export interface ApiResponse<T = any> {
  status: string
  data?: T
  message?: string
  results?: number
}

export interface User {
  id: string
  name: string
  email: string
  role?: string
  isActive?: boolean
  createdAt?: string
}

export interface AuthResponse {
  status: string
  token: string
  data: {
    user: User
  }
}

export interface AuthApiResponse extends ApiResponse<{ user: User }> {
  token: string
}

// API client class
class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add authorization header if token exists
    const token = this.getToken()
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt')
    }
    return null
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', token)
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt')
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health')
  }

  // Authentication methods
  async signup(userData: { name: string; email: string; password: string; passwordConfirm: string }): Promise<AuthResponse> {
    const response = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }) as AuthApiResponse
    if (response.token) {
      this.setToken(response.token)
    }
    return { status: response.status, token: response.token, data: { user: response.data?.user! } }
  }

  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }) as AuthApiResponse
    if (response.token) {
      this.setToken(response.token)
    }
    return { status: response.status, token: response.token, data: { user: response.data?.user! } }
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.request('/auth/logout', {
      method: 'GET',
    })
    this.removeToken()
    return response
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.request('/auth/forgotPassword', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(token: string, password: string): Promise<AuthResponse> {
    const response = await this.request(`/auth/resetPassword/${token}`, {
      method: 'PATCH',
      body: JSON.stringify({ password }),
    }) as AuthApiResponse
    if (response.token) {
      this.setToken(response.token)
    }
    return { status: response.status, token: response.token, data: { user: response.data?.user! } }
  }

  // User methods
  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return this.request('/users/me')
  }

  async updateCurrentUser(userData: { name?: string; email?: string }): Promise<ApiResponse<{ user: User }>> {
    return this.request('/users/updateMe', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    })
  }

  async updatePassword(passwordData: { passwordCurrent: string; password: string }): Promise<AuthResponse> {
    const response = await this.request('/users/updatePassword', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
    }) as AuthApiResponse
    if (response.token) {
      this.setToken(response.token)
    }
    return { status: response.status, token: response.token, data: { user: response.data?.user! } }
  }

  async deleteCurrentUser(): Promise<ApiResponse> {
    return this.request('/users/deleteMe', {
      method: 'DELETE',
    })
  }

  // Admin methods
  async getAllUsers(): Promise<ApiResponse<{ users: User[] }>> {
    return this.request('/users')
  }

  async getUser(id: string): Promise<ApiResponse<{ user: User }>> {
    return this.request(`/users/${id}`)
  }

  async createUser(userData: { name: string; email: string; password: string; role?: string }): Promise<ApiResponse<{ user: User }>> {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<{ user: User }>> {
    return this.request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id: string): Promise<ApiResponse> {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL)

// Export types
export default ApiClient
