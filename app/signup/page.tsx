"use client";

import { SignupForm } from "@/features/auth";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <SignupForm />
    </div>
  );
}
