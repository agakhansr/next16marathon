"use client";

import { useAtom } from "jotai";
import { TodoList, todoFilterAtom } from "@/features/todos";
import { isAuthenticatedAtom, useAuthInit } from "@/features/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TodosPage() {
  const router = useRouter();
  const [filter, setFilter] = useAtom(todoFilterAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoading: isAuthLoading } = useAuthInit();

  useEffect(() => {
    if (!isAuthLoading) {
      setIsLoading(false);
    }
  }, [isAuthLoading]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/dashboard"
          className="text-blue-500 hover:text-blue-600 mb-6 inline-block"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Todo App
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Manage your tasks efficiently
        </p>

        <div className="flex gap-2 mb-6">
          {(["all", "completed", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded font-medium transition ${
                filter === f
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 dark:bg-gray-900">
          <TodoList />
        </div>
      </div>
    </div>
  );
}
