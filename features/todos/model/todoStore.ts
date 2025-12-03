import { atom } from "jotai";

export const selectedTodoIdAtom = atom<number | null>(null);
export const todoFilterAtom = atom<"all" | "completed" | "pending">("all");
export const completedTodosAtom = atom<Set<number>>(new Set<number>());