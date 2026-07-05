import { TodoService } from "./todo.service";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

/**
 * React Server Component (Acts as a Controller to prepare the View)
 * It fetches data using the Model/Service and passes it to the View (Client Components).
 */
export default async function TodoMVCPage() {
  // Call the Service Layer to get data instead of directly hitting the DB
  const allTodos = await TodoService.getTodos();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl dark:bg-zinc-900 border dark:border-zinc-800">
      <h1 className="text-3xl font-bold mb-2 text-center text-zinc-800 dark:text-zinc-100">
        Enterprise MVC Todo
      </h1>
      <p className="text-sm text-center text-zinc-500 mb-6">
        Separation of concerns with a dedicated Service layer
      </p>
      
      {/* Views */}
      <TodoForm />
      <div className="mt-6">
        <TodoList todos={allTodos as any} />
      </div>
    </div>
  );
}
