import { useQuery, useMutation } from "@tanstack/react-query";
import type { Todo } from "./types";

export const useTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async (): Promise<Todo[]> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      return response.json();
    },
  });
};

export const useToggleTodoMutation = () => {
  return useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !completed }),
        }
      );
      return response.json();
    },
  });
};
