"use client";

import { TodoList, todoFilterAtom } from "@/features/todos";
import { useAtom } from "jotai";

export default function Home() {
  const [filter, setFilter] = useAtom(todoFilterAtom);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Todo App</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Built with Next.js, Jotai & React Query
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
