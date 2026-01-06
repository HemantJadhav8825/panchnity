"use client";

import { useState, useEffect } from "react";
import { apiClient, User, AuthResponse, ApiResponse } from "../api";

// Re-export types for convenience
export type { User, AuthResponse, ApiResponse };

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await apiClient.getCurrentUser();
      setUser(response.data?.user || null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.login({ email, password });
      setUser(response.data.user);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.signup(userData);
      setUser(response.data.user);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiClient.logout();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      // Still clear user state even if API call fails
      setUser(null);
    }
  };

  const updateProfile = async (userData: {
    name?: string;
    email?: string;
  }): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.updateCurrentUser(userData);
      setUser(response.data?.user || null);
      return response.data!.user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Update failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (passwordData: {
    passwordCurrent: string;
    password: string;
  }): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.updatePassword(passwordData);
      setUser(response.data?.user || null);
      return response.data!.user;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Password update failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.deleteCurrentUser();
      setUser(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Account deletion failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    updatePassword,
    deleteAccount,
    checkAuthStatus,
  };
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getAllUsers();
      setUsers(response.data?.users || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch users";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.createUser(userData);
      const newUser = response.data!.user;
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create user";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    id: string,
    userData: Partial<User>
  ): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.updateUser(id, userData);
      const updatedUser = response.data!.user;
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user))
      );
      return updatedUser;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update user";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete user";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
