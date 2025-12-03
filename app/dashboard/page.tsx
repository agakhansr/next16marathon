"use client";

import { useAtom } from "jotai";
import { currentUserAtom, isAuthenticatedAtom, useLogoutMutation, useAuthInit } from "@/features/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user] = useAtom(currentUserAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useState(true);
  const { mutate: logout } = useLogoutMutation();
  const { isLoading: isAuthLoading } = useAuthInit();

  useEffect(() => {
    // Give auth init time to complete
    if (!isAuthLoading) {
      setIsLoading(false);
    }
  }, [isAuthLoading]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome, {user.name}! 👋
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>User ID:</strong> {user.id}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              You are successfully authenticated! This is your dashboard.
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
            >
              Back to Home
            </Link>
            <Link
              href="/todos"
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition"
            >
              View Todos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
