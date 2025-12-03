"use client";

import { useTodosQuery } from "../api/queries";
import { TodoItem } from "./TodoItem";
import { useAtom } from "jotai";
import { todoFilterAtom } from "../model/todoStore";

export function TodoList() {
  const { data: todos = [], isLoading, error } = useTodosQuery();
  const [filter] = useAtom(todoFilterAtom);

  const filtered = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  if (isLoading)
    return (
      <div className="p-4 text-center text-gray-500">Loading todos...</div>
    );
  if (error)
    return (
      <div className="p-4 text-center text-red-500">Error loading todos</div>
    );

  return (
    <div className="space-y-2">
      {filtered.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
