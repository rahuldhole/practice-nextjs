import TodoApp from "./TodoApp";

export default function TodoApiFirstPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl dark:bg-zinc-900 border dark:border-zinc-800">
      <h1 className="text-3xl font-bold mb-2 text-center text-zinc-800 dark:text-zinc-100">
        API-First Todo
      </h1>
      <p className="text-sm text-center text-zinc-500 mb-6">
        MVC with Next.js API Routes and React Query
      </p>
      
      {/* Client Component handling React Query */}
      <TodoApp />
    </div>
  );
}
