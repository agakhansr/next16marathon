"use client";

import { isAuthenticatedAtom, useAuthInit } from "@/features/auth";
import { useAtom } from "jotai";
import Link from "next/link";

export default function Home() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  useAuthInit();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 dark:text-white">
            Welcome to Next16 Marathon
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Advanced authentication system with Todo management
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
                ✅ You are logged in! Access your account.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition text-center"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/todos"
                  className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition text-center"
                >
                  View Todos
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
                Get started by creating an account or logging in.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/signup"
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition text-center"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition text-center"
                >
                  Log In
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Features:
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>✨ Advanced JWT Authentication</li>
              <li>🔒 Secure Password Hashing</li>
              <li>📝 Todo Management System</li>
              <li>🎨 Dark Mode Support</li>
              <li>⚡ Built with Next.js 16 & React 19</li>
              <li>🗂️ FSD Architecture</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
