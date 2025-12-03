"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { authTokenAtom, currentUserAtom } from "../model/authStore";
import type { SignupRequest, LoginRequest, AuthResponse, User } from "./types";

const API_URL = "/api/auth";

export const useSignupMutation = () => {
  const [, setToken] = useAtom(authTokenAtom);
  const [, setUser] = useAtom(currentUserAtom);

  return useMutation({
    mutationFn: async (data: SignupRequest) => {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: AuthResponse = await response.json();
      if (!response.ok) throw new Error(result.message);
      return result;
    },
    onSuccess: (data: AuthResponse) => {
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("authToken", data.token);
      }
      if (data.user) {
        setUser(data.user);
      }
    },
  });
};

export const useLoginMutation = () => {
  const [, setToken] = useAtom(authTokenAtom);
  const [, setUser] = useAtom(currentUserAtom);

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: AuthResponse = await response.json();
      if (!response.ok) throw new Error(result.message);
      return result;
    },
    onSuccess: (data: AuthResponse) => {
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("authToken", data.token);
      }
      if (data.user) {
        setUser(data.user);
      }
    },
  });
};

export const useLogoutMutation = () => {
  const [, setToken] = useAtom(authTokenAtom);
  const [, setUser] = useAtom(currentUserAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      return result;
    },
    onSuccess: () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem("authToken");
      queryClient.clear();
    },
  });
};

export const useMeQuery = (enabled: boolean = true) => {
  const [token] = useAtom(authTokenAtom);
  const [, setUser] = useAtom(currentUserAtom);

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      return result;
    },
    enabled: enabled && !!token,
  });
};

export const useAuthInit = () => {
  const [token, setToken] = useAtom(authTokenAtom);
  const [, setUser] = useAtom(currentUserAtom);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setHasToken(true);
      if (!token) {
        setToken(storedToken);
      }
    }
  }, [token, setToken]);

  return useQuery({
    queryKey: ["auth", "me", token],
    queryFn: async () => {
      const authToken = token || localStorage.getItem("authToken");
      if (!authToken) return null;
      
      try {
        const response = await fetch(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        if (!response.ok) {
          localStorage.removeItem("authToken");
          setToken(null);
          setUser(null);
          return null;
        }
        
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
        return data;
      } catch (error) {
        console.error("Auth init error:", error);
        return null;
      }
    },
    enabled: !!token || hasToken,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
