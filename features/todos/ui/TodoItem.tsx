import { useAtom } from "jotai";
import { selectedTodoIdAtom, completedTodosAtom } from "../model/todoStore";
import { useToggleTodoMutation } from "../api/queries";
import type { Todo } from "../api/types";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [selectedId, setSelectedId] = useAtom(selectedTodoIdAtom);
  const [completedTodos, setCompletedTodos] = useAtom(completedTodosAtom);
  const { mutate: toggleTodo } = useToggleTodoMutation();

  const isCompleted = completedTodos.has(todo.id) || todo.completed;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newCompleted = new Set(completedTodos);
    if (isCompleted) {
      newCompleted.delete(todo.id);
    } else {
      newCompleted.add(todo.id);
    }
    setCompletedTodos(newCompleted);
    toggleTodo({ id: todo.id, completed: isCompleted });
  };

  return (
    <div
      onClick={() => setSelectedId(todo.id)}
      className={`p-3 border rounded cursor-pointer transition ${
        selectedId === todo.id
          ? "bg-blue-100 border-blue-500 dark:bg-blue-900"
          : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
          className="w-4 h-4 cursor-pointer"
        />
        <span
          className={`flex-1 ${
            isCompleted
              ? "line-through text-gray-400"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {todo.title}
        </span>
      </div>
    </div>
  );
}
